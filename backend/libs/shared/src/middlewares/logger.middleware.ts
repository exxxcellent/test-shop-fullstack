import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        switch (req.method) {
            case 'GET': {
                const log = {
                    method: req.method,
                    url: req.baseUrl,
                    ip: req.ip,
                };
                console.log(JSON.stringify(log, null, 2));
                break;
            }
            case 'POST':
            case 'PUT':
            case 'PUTCH':
            case 'DELETE': {
                const log = {
                    method: req.method,
                    url: req.baseUrl,
                    queryParams: req.query,
                    body: req.body,
                    ip: req.ip,
                };
                console.log(JSON.stringify(log, null, 2));
            }
        }
        next();
    }
}
