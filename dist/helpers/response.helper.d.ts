declare class ResponseHelper {
    responseHandler(res: any, statusCode: number, statusText: string, message: string, data: any): Promise<void>;
    ok(res: any, message: any, data: any): Promise<void>;
    badRequest(res: any, message: any, data?: any): Promise<void>;
    conflict(res: any, message: any, data?: any): Promise<void>;
    unAuthenticated(res: any, message?: any, data?: any, statusText?: string): Promise<void>;
    expired(res: any, message?: any, data?: any): Promise<void>;
    unAuthorize(res: any, message?: any, data?: any): Promise<void>;
    serverError(res: any, message?: any, data?: any): Promise<void>;
    created(res: any, message?: any, data?: any): Promise<void>;
    forbidden(res: any, message?: any, data?: any): Promise<void>;
    private execTime;
}
declare const _default: ResponseHelper;
export default _default;
