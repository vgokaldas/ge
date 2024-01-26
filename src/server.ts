import * as dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import { env } from './environments/env';
import Routes from './routes/routes';
import { I18n } from 'i18n';
import { ReqInterface, ResInterface } from './interfaces/req.interface';
import db from './db';
import ErrorHandler from './helpers/error.helper';
import { logger } from './helpers/logger.helper';
export class Server {
  public app: express.Application = express();

  constructor() {
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
    const i18n = new I18n();
    i18n.configure({
      locales: ['en', 'fr'],
      directory: localePath
    })
    this.app.use(i18n.init);
  }

  setMongodb() {
    db.connectDb(env().dbUrl);
  }

  async createAdmin() {
    // await AuthService.createAdmin();
  }

  enableCors() {
    this.app.use(
      cors({
        origin: true,
        credentials: true
      })
    );
  }

  configBodyParser() {
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));
    this.app.use(express.json({ limit: '10mb' }));
  }

  setRoutes() {
    this.app.use('/api-doc', express.static(path.resolve(process.cwd() + '/assets/apidoc')))
    // this.app.use(express.static(path.join(__dirname, 'public')));
    this.app.use((req: ReqInterface, res: ResInterface, next: express.NextFunction) => {
      req.startTime = new Date().getTime();
      req.deviceType = req.headers.devicetype as string;
      console.log(`Api ==> ${req.url}  ${req.method}`);
      console.log('request-body', req.body);
      next();
    });
    this.app.use('/logs', express.static(path.resolve(process.cwd() + '/logs/combined.log')))
    this.app.use(logger);
    this.app.use('/api', Routes);
  }

  error404Handler() {
    this.app.use((req: ReqInterface, res: ResInterface) => {
      res.status(404).json({
        message: 'Route not found',
        status: 404,
      });
    })
  }
                
  handleErrors() {
    this.app.use((error: any, req: ReqInterface, res: ResInterface, next: express.NextFunction) => {
      ErrorHandler.globalErrorHandler(error, req, res, next);
    });
  }
}