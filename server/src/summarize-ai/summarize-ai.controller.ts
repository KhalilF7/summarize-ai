import { Body, Controller, Post, Get, UsePipes, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { SummarizeAiService } from './summarize-ai.service';
import { GetAiModelSummary } from './model/get-ai-model-summary';
import { SetSelectedModel } from './model/set-selected-model';
import { AuthGuard } from '@nestjs/passport';

@Controller('summarize-ai')
@UseGuards(AuthGuard())
export class SummarizeAiController {

    constructor(private readonly service: SummarizeAiService) {}

    @Post("/message")
    @UsePipes(ValidationPipe)
    async getModelSummary(@Body() data: GetAiModelSummary, @Req() req) {
        const userId = req.user._id;
        return this.service.getModelSummary(data, userId);
    }

    @Get("/model")
    listModels() {
        return this.service.listModels();
    }

    @Post("/model")
    @UsePipes(ValidationPipe)
    setModel(@Body() data: SetSelectedModel) {
        this.service.setModelId(data.modelId)
    }
}
