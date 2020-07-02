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
const error = require("../server/error");
const passport = require("./passport");
const token_1 = require("./token");
/**
 * Crea un token de sesión, lo guarda en la base de Tokens, luego inicializa passport
 * con el token, para que se ingrese en el cache y devuelve el token string
 */
function create(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = new token_1.Token();
            token.user = mongoose.Types.ObjectId.createFromHexString(userId);
            token.valid = true;
            const t = yield token.save();
            return Promise.resolve(passport.createSessionToken(token));
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.create = create;
function invalidate(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            passport.invalidateSessionToken(payload.token_id);
            let token = yield token_1.Token.findById(payload.token_id).exec();
            if (!token) {
                throw error.newError(error.ERROR_NOT_FOUND, "Token invalido.");
            }
            token.valid = false;
            token = yield token.save();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.invalidate = invalidate;
//# sourceMappingURL=service.js.map