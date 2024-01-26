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
exports.generateSlug = void 0;
const slug = require("slug");
const db_1 = require("../db");
/**
 *
 * @param slugStr name of slug creation document
 * @param collection database collection name
 * @returns
 */
const generateSlug = (slugStr, collection, count = 0) => __awaiter(void 0, void 0, void 0, function* () {
    let s = slugStr;
    if (!count) {
        s = slug(slugStr, { locale: 'en' });
    }
    const exist = yield db_1.default.DB.model(collection).findOne({ slug: s });
    if (exist) {
        count++;
        const sArr = s.split('-');
        if (typeof sArr[sArr.length - 1] === 'number') {
            sArr.push(count.toString());
            s = sArr.join('-');
        }
        else {
            s = `${s}-${count}`;
        }
        s = yield (0, exports.generateSlug)(s, collection, count);
    }
    return s;
});
exports.generateSlug = generateSlug;
