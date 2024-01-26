export declare class AppError extends Error {
    statusCode: any;
    status: any;
    isOperational: boolean;
    statusText: string;
    constructor(message: string, statusCode: number, statusText: string);
}
