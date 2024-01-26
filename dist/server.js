"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const dotenv = require("dotenv");
dotenv.config({ path: './.env' });
const express = require("express");
const path = require("path");
const cors = require("cors");
const env_1 = require("./environments/env");
const routes_1 = require("./routes/routes");
const i18n_1 = require("i18n");
const db_1 = require("./db");
const error_helper_1 = require("./helpers/error.helper");
const logger_helper_1 = require("./helpers/logger.helper");
class Server {
    constructor() {
        this.app = express();
        console.log('environment', process.env.NODE_ENV);
        this.setConfigurations();
        this.setRoutes();
        this.error404Handler();
        this.handleErrors();
    }
    setConfigurations() {
        this.setMongodb();
        this.enableCors();
        this.configBodyParser();
        this.setLanguage();
    }
    setLanguage() {
        const localePath = path.resolve(process.cwd() + '/assets/locales');
        const i18n = new i18n_1.I18n();
        i18n.configure({
            locales: ['en', 'fr'],
            directory: localePath
        });
        this.app.use(i18n.init);
    }
    setMongodb() {
        db_1.default.connectDb((0, env_1.env)().dbUrl);
    }
    createAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            // await AuthService.createAdmin();
        });
    }
    enableCors() {
        this.app.use(cors({
            origin: true,
            credentials: true
        }));
    }
    configBodyParser() {
        this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
        this.app.use(express.json({ limit: '10mb' }));
    }
    setRoutes() {
        this.app.use('/api-doc', express.static(path.resolve(process.cwd() + '/assets/apidoc')));
        // this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use((req, res, next) => {
            req.startTime = new Date().getTime();
            req.deviceType = req.headers.devicetype;
            console.log(`Api ==> ${req.url}  ${req.method}`);
            console.log('request-body', req.body);
            next();
        });
        this.app.use('/logs', express.static(path.resolve(process.cwd() + '/logs/combined.log')));
        this.app.use(logger_helper_1.logger);
        this.app.use('/api', routes_1.default);
    }
    error404Handler() {
        this.app.use((req, res) => {
            res.status(404).json({
                message: 'Route not found',
                status: 404,
            });
        });
    }
    handleErrors() {
        this.app.use((error, req, res, next) => {
            error_helper_1.default.globalErrorHandler(error, req, res, next);
        });
    }
}
exports.Server = Server;
