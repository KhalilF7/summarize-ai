import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
import { GetAiModelSummary } from './model/get-ai-model-summary';
import { Summary } from './schemas/summary.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

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

        console.log('Organization:', configuration.organization);
        console.log('API Key:', configuration.apiKey);

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
}
