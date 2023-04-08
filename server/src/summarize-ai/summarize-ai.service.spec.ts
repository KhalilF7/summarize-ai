import { Test, TestingModule } from '@nestjs/testing';
import { SummarizeAiService } from './summarize-ai.service';

describe('SummarizeAiService', () => {
  let service: SummarizeAiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SummarizeAiService],
    }).compile();

    service = module.get<SummarizeAiService>(SummarizeAiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
