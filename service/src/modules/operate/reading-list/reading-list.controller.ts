import { Body, Query, Controller, Get, Post, Headers, Req } from '@nestjs/common';
import { ReadingListService } from './reading-list.service';
import { IsNotEmpty } from 'class-validator';

class Data {
  // @IsNotEmpty()
  a: string
  parameter: string
  pageCond: {
    page: number
  }
}

@Controller('/operate/reading-list')
export class ReadingListController {
  constructor(private readonly readingListService: ReadingListService) {}

  @Post('query')
  query(@Body() data: Data, @Headers() headers: any, @Req() request: any): any { // todo any 改为 PagingQuery
    return this.readingListService.query(data);
  }

  @Post('save')
  save(@Body() data): any {
    return this.readingListService.save(data);
  }

  @Get('delete')
  delete(@Query() { id }) {
    return this.readingListService.delete(id)
  }

  @Post('edit')
  edit(@Body() data) {
    return this.readingListService.edit(data)
  }
}
