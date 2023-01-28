import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import { Environment } from '@common/types';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('bootstrap');

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const config = app.get<ConfigService<Environment>>(ConfigService);
  const appPort = config.get('APP_PORT', { infer: true })!;
  const appName = config.get('APP_NAME', { infer: true })!;
  const corsOrigin = config.get('CORS_ORIGIN', { infer: true })!;
  const appEnvironment = config.get('APP_ENV', { infer: true })!;

  // Security
  app.use(helmet());
  app.enableCors({ origin: corsOrigin, credentials: true });
  app.enable('trust proxy');

  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.enableVersioning({ type: VersioningType.URI });

  app.use(json({ limit: '5mb' }));
  app.use(urlencoded({ limit: '5mb', parameterLimit: 5000, extended: true }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      forbidNonWhitelisted: true,
    })
  );

  // Setup Swagger
  const swaggerConfig = new DocumentBuilder()
    .setTitle(appName)
    .setDescription(`${appName} With Full Modules Needed.`)
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(appPort);

  process.env.APP_URL = await app.getUrl();

  logger.log(
    `🚀 Application Running in ${appEnvironment} Mode on ${process.env.APP_URL}`
  );
}

// eslint-disable-next-line unicorn/prefer-top-level-await
bootstrap().catch((error) => Logger.error(error));
