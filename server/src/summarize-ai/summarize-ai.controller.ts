import { Body, Controller, Post, Get, UsePipes, ValidationPipe, UseGuards, Req, Res } from '@nestjs/common';
import { SummarizeAiService } from './summarize-ai.service';
import { GetAiModelSummary } from './model/get-ai-model-summary';
import { SetSelectedModel } from './model/set-selected-model';
import { AuthGuard } from '@nestjs/passport';
import { Summary } from './schemas/summary.schema';
import * as PDFDocument from 'pdfkit';
import { Response } from 'express';


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

    @Get("/summaries")
    async listSummaries(@Req() req): Promise<Summary[]> {
        const userId = req.user._id;
        return this.service.listSummaries(userId);
    }

    @Get('/export-pdf')
    async exportPDF(@Req() req, @Res() res: Response) {
      const userId = req.user._id;
      const summaries = await this.service.listSummaries(userId);
      
      const pdfBuffer = await this.service.exportPDF(summaries);
    
      // Set response headers
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=summaries.pdf');
    
      // Send the response with the PDF file
      res.send(pdfBuffer);
    }

    @Get('export-csv')
    async exportCSV(@Req() req, @Res() res: Response) {
        const userId = req.user._id;
        const summaries = await this.service.listSummaries(userId);
        const csv = await this.service.exportCSV(summaries);
        res.set('Content-Type', 'text/csv');
        res.attachment('summaries.csv');
        res.send(csv);
    }

}
