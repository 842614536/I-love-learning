import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReadingListModule } from './modules/operate/reading-list/reading-list.module'

@Module({
  imports: [
    ReadingListModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
