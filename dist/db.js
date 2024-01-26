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
const mongoose = require("mongoose");
const auth_service_1 = require("./services/admin/auth.service");
class Db {
    connectDb(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.DB = yield mongoose.connect(url);
                console.log('Database connected');
                yield auth_service_1.default.createAdmin();
            }
            catch (error) {
                console.log('Error to connecting database');
            }
        });
    }
}
exports.default = new Db();
