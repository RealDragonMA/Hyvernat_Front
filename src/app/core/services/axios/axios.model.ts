export interface IParams {
    [key: string]: any;
}

export interface IErrorResponse {
    status: string;
    message: string;
}

export enum EHttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}
