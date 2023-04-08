import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeAiController } from './summarize-ai.controller';

describe('SummarizeAiController', () => {
  let controller: SummarizeAiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SummarizeAiController],
    }).compile();

    controller = module.get<SummarizeAiController>(SummarizeAiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
