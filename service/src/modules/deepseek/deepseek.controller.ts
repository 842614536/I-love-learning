import { Body, Res, Controller, Post, Get, Headers, Req, Header, Sse } from '@nestjs/common'
import { DeepSeekService } from './deepseek.service'
import { Response } from 'express'
import OpenAI from 'openai'
import { Observable } from 'rxjs';

const OPENAI = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: 'sk-e89e18253d6b4c05becbc9cadaffcdd8'
}) 

interface Data {
  content: string
}

@Controller('/ai')
export class DeepSeekController {
  constructor(private readonly deepseekService: DeepSeekService) {}
  @Post('create')
  @Sse()
  async create(@Res() res: Response, @Body() data, @Headers() headers: any, @Req() request: any):Promise<any> {
    data = JSON.parse(data)
    return this.deepseekService.create(data)
    // return this.deepseekService.mock(data)
  }
}
