import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./key.pem'),
    cert: fs.readFileSync('./cert.pem'),
  };
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  const config = new DocumentBuilder()
    .setTitle('ScoreKeep')
    .setDescription('')
    .setVersion('1.0')
    .addTag('scorekeep')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
