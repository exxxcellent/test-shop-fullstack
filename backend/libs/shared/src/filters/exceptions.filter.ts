import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;

        if (exception instanceof Array) {
            const validationErrors = (exception.getResponse() as any).message;
            return response
                .status(status ?? HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                    success: false,
                    statusCode: status,
                    errors: validationErrors,
                });
        }

        const message = exception.message ?? '';

        response.status(status ?? HttpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            statusCode: status,
            message: message,
        });
    }
}
