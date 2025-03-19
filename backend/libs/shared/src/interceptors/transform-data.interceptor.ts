import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, map } from 'rxjs';

export class TransformedData<T> {
    success: boolean;
    data: T;
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<TransformedData<any>> {
        const statusCode = context
            .switchToHttp()
            .getResponse<Response>().statusCode;
        return next.handle().pipe(
            map((data) => ({
                success: true,
                statusCode: statusCode,
                data: data,
            })),
        );
    }
}
