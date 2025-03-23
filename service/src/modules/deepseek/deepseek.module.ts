import { Module } from '@nestjs/common';
import { DeepSeekController } from './deepseek.controller';
import { DeepSeekService } from './deepseek.service';

@Module({
  imports: [],
  controllers: [DeepSeekController],
  providers: [DeepSeekService],
})
export class DeepSeekModule {}
