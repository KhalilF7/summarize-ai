import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import { GetAiModelSummary } from './model/get-ai-model-summary';
import { Summary } from './schemas/summary.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as pdf from 'pdfkit';

const DEFAULT_MODEL_ID = 'text-davinci-003';
const DEFAULT_TEMPERATURE = 0.9;
const DEFAULT_MAX_TOKEN = 2048;

@Injectable()
export class SummarizeAiService {
  private readonly openAiApi: OpenAIApi;
  private selectedModelId: string | undefined;

  constructor(
    @InjectModel(Summary.name)
    private summaryModel: Model<Summary>,
  ) {
    const configuration = new Configuration({
      organization: process.env.ORGANIZATION_ID,
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openAiApi = new OpenAIApi(configuration);
  }

  /**
   * Set the selected model ID
   * @param modelId - the ID of the selected model
   */
  setModelId(modelId: string) {
    this.selectedModelId = modelId;
  }

  /**
   * Clean the model ID if it includes a colon
   * @param modelId - the ID of the model to clean
   * @returns the cleaned model ID
   */
  cleanModelId(modelId: string) {
    if (modelId.includes(':')) {
      return modelId.replace(':', '-');
    }
    return modelId;
  }

  /**
   * List available models
   * @returns a list of available models
   */
  async listModels() {
    const models = await this.openAiApi.listModels();
    return models.data;
  }

  /**
   * Generate a summary for the given text
   * @param text - the text to summarize
   * @returns the generated summary
   */
  generateSummary(text: string) {
    return `Summarize this ${text}. and break them into separate lines`;
  }

  /**
   * Get a summary for the given input
   * @param input - the input to summarize
   * @param userId - the ID of the user requesting the summary
   * @returns the generated summary
   */
  async getModelSummary(input: GetAiModelSummary, userId: string) {
    try {
      const { text, temperature, modelId, maxToken } = input;
      let model = DEFAULT_MODEL_ID;

      if (modelId) {
        model = modelId;
      } else if (this.selectedModelId) {
        model = this.selectedModelId;
      }

      const params: CreateCompletionRequest = {
        prompt: this.generateSummary(input.text),
        model: this.cleanModelId(model),
        temperature: temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
        max_tokens: maxToken ? maxToken : DEFAULT_MAX_TOKEN,
      };

      const response = await this.openAiApi.createCompletion(params);

      const { data } = response;
      if (data.choices.length) {
        const summary = new this.summaryModel({
          text: input.text,
          summary: data.choices[0].text,
          user: userId,
        });
        await summary.save();
        return data.choices[0].text;
      }
      return response.data;
      } catch (error) {
        console.log(error);
      }
  }

    /**
     * Retrieves a list of summaries for a given user.
     * @param {string} userId - The ID of the user.
     * @returns {Promise<Summary[]>} - A Promise that resolves to an array of Summary objects.
     */
    async listSummaries(userId) {
        return this.summaryModel.find({ user: userId }).exec();
    }
  
  /**
   * Exports a list of summaries to a PDF document.
   * @param {{ text: string, summary: string }[]} summaries - An array of objects representing summaries.
   * @returns {Promise<Buffer>} - A Promise that resolves to a Buffer containing the PDF document.
   */
  async exportPDF(summaries) {
    const PDFDocument = require('pdfkit');
    const doc = new PDFDocument();
    
    doc.fontSize(16).text('List of Summaries');
    
    doc.moveDown();
    
    // Create table header
    doc.fontSize(12).text('Text', { width: 250, continued: true }).text('Summary', { width: 250 });
    
    // Create table rows
    summaries.forEach(summary => {
      doc.moveDown();
      doc.fontSize(10).text(summary.text, { width: 250, continued: true }).text(summary.summary, { width: 250 });
    });
    
    doc.end();
    
    return new Promise((resolve, reject) => {
      const buffers = [];
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfBuffer = Buffer.concat(buffers);
        resolve(pdfBuffer);
      });
      doc.on('error', reject);
    });
  }
  
  /**
   * Exports a list of summaries to a CSV file.
   * @param {{ text: string, summary: string }[]} summaries - An array of objects representing summaries.
   * @returns {Promise<string>} - A Promise that resolves to a string containing the CSV data.
   */
  async exportCSV(summaries) {
    const header = 'Highlighted Text,Ai Summary';
    const rows = summaries.map(({ text, summary }) => `"${text}","${summary}"`).join('\n');
    return `${header}\n${rows}`;
  }
  
}
