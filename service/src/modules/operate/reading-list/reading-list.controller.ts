import { Controller, Get } from '@nestjs/common';
import { ReadingListService } from './reading-list.service';

@Controller()
export class ReadingListController {
  constructor(private readonly readingListService: ReadingListService) {}

  @Get()
  save(): string {
    return this.readingListService.save();
  }
}
