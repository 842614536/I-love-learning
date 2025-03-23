import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  // 读取 SSL 证书
  const httpsOptions = {
    key: fs.readFileSync('./localhost-privkey.pem'),
    cert: fs.readFileSync('./localhost-cert.pem'),
  };

  // 创建 NestJS 应用，使用 Fastify 作为底层框架
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ 
      http2: true, 
      https: httpsOptions, 
    }),
  );

  // 启用 CORS
  app.enableCors({
    origin: 'http://12.0.215.59:3885',
  })

  // 监听端口
  await app.listen(8040, '0.0.0.0', () => {
    console.log('HTTP/2 server is running on https://localhost:8040');
  });
}

bootstrap();