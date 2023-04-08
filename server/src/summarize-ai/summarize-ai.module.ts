import { Module } from '@nestjs/common';
import { SummarizeAiController } from './summarize-ai.controller';
import { SummarizeAiService } from './summarize-ai.service';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SummarySchema } from './schemas/summary.schema';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Summary', schema: SummarySchema }])
  ],
  controllers: [SummarizeAiController],
  providers: [SummarizeAiService]
})
export class SummarizeAiModule {}
