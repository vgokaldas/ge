import * as express from 'express';
export declare class Server {
    app: express.Application;
    constructor();
    setConfigurations(): void;
    setLanguage(): void;
    setMongodb(): void;
    createAdmin(): Promise<void>;
    enableCors(): void;
    configBodyParser(): void;
    setRoutes(): void;
    error404Handler(): void;
    handleErrors(): void;
}
