import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

// module
import { AppModule } from './app.module';
import { seedRoles } from './seeds';

async function bootstrap() {
  await seedRoles();
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE, OPTIONS, PATCH'
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Resumator-API')
    .setDescription('Here will be description')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
