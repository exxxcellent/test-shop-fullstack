import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from '@shared/filters';
import { TransformInterceptor } from '@shared/interceptors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        cors: {
            origin: `http://localhost:${process.env.CLIENT_PORT}`,
        },
    });
    app.useGlobalInterceptors(
        new ClassSerializerInterceptor(app.get(Reflector)),
    );
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(process.env.API_PORT ?? 3000);
}
bootstrap();
