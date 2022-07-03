import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ReadingListModule } from './modules/operate/reading-list/reading-list.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, ReadingListModule);
  app.enableCors();
  await app.listen(8040);
}
bootstrap();
