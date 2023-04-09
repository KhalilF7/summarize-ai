import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import { GetAiModelSummary } from './model/get-ai-model-summary';
import { Summary } from './schemas/summary.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as pdf from 'pdfkit';

const DEFAULT_MODEL_ID = "text-davinci-003";
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

    setModelId(modelId: string) {
        this.selectedModelId = modelId;
    }

    cleanModelId(modelId: string) {
        if(modelId.includes(":")) {
            return modelId.replace(":", "-");
        }
        return modelId;
    }

    async listModels() {
        const models = await this.openAiApi.listModels();
        return models.data;
    }

    generateSummary(text: string) {
        return `Summarize this ${text}. and break them into seperate lines`;
    }

    async getModelSummary(input: GetAiModelSummary, userId: string) {
        try {
            const { text, temperature, modelId, maxToken } = input;
            let model = DEFAULT_MODEL_ID;

            if(modelId) {
                model = modelId;
            } else if(this.selectedModelId) {
                model = this.selectedModelId;
            }
            const params: CreateCompletionRequest = {
                prompt: this.generateSummary(input.text),
                model: this.cleanModelId(model),
                temperature: temperature != undefined ? temperature : DEFAULT_TEMPERATURE,
                max_tokens: maxToken ? maxToken : DEFAULT_MAX_TOKEN
            }

            const response = await this.openAiApi.createCompletion(params);

            const { data } = response;
            if(data.choices.length) {
                const summary = new this.summaryModel({
                    text: input.text,
                    summary: data.choices[0].text,
                    user: userId
                });
                await summary.save();
                return data.choices[0].text;
            }
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }

    async listSummaries(userId: string): Promise<Summary[]> {
        return this.summaryModel.find({ user: userId }).exec();
    }

    async exportPDF(summaries: { text: string, summary: string }[]) {
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
        
        return new Promise<Buffer>((resolve, reject) => {
          const buffers: any[] = [];
          doc.on('data', buffers.push.bind(buffers));
          doc.on('end', () => {
            const pdfBuffer = Buffer.concat(buffers);
            resolve(pdfBuffer);
          });
          doc.on('error', reject);
        });
      }

    async exportCSV(summaries: { text: string, summary: string }[]): Promise<string> {
        const header = 'Highlighted Text,Ai Summary';
        const rows = summaries.map(({ text, summary }) => `"${text}","${summary}"`).join('\n');
        return `${header}\n${rows}`;
    }

}
