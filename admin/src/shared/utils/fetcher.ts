import api from '@config/axios';
import { REQUEST_METHOD } from '@shared/types';
import type { AxiosResponse } from 'axios';

export const fetcher = async <Res, Body = any>(
    url: string,
    method: REQUEST_METHOD = REQUEST_METHOD.GET,
    body?: Body,
    headers?: Record<string, any>,
): Promise<AxiosResponse<Res>> => {
    switch (method) {
        case REQUEST_METHOD.GET:
            return await api.get<Res>(url, {
                headers,
            });
        case REQUEST_METHOD.POST:
            return await api.post<Res>(url, body, {
                headers,
            });
        case REQUEST_METHOD.PUT:
            return await api.put<Res>(url, body, {
                headers,
            });
        case REQUEST_METHOD.DELETE:
            return await api.delete<Res>(url, {
                headers,
            });
        default:
            throw new Error(`Unsupported request method: ${method}`);
    }
};
