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
const Joi = require("joi");
const joi_validate_helper_1 = require("../../helpers/joi-validate.helper");
class GameValidator {
    updateScore(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                score: Joi.number().required(),
                gameName: Joi.string().required(),
                balance_before_game: Joi.number().required(),
                total_played: Joi.number().required(),
                total_win: Joi.any().required(),
                recording_notes: Joi.string().required()
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
    coinUpdate(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = Joi.object().keys({
                coin: Joi.number().required(),
                type: Joi.string().required(),
            });
            const isValid = yield (0, joi_validate_helper_1.validate)(req.body, res, schema);
            if (isValid) {
                next();
            }
        });
    }
}
exports.default = new GameValidator();
