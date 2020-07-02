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
const escape = require("escape-html");
const redis = require("ioredis");
const uuid_1 = require("uuid");
const appConfig = require("../server/environment");
const error = require("../server/error");
const conf = appConfig.getConfig(process.env);
const redisClient = new redis(conf.redisPort, conf.redisHost);
redisClient.on("connect", function () {
    console.log("Redis connected");
});
function findByID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const reply = yield redisClient.get(escape(id));
            if (!reply) {
                throw error.ERROR_NOT_FOUND;
            }
            return Promise.resolve({
                id: escape(id),
                image: reply
            });
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.findByID = findByID;
function validateCreate(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            messages: []
        };
        if (!body.image || body.image.length < 1) {
            result.messages.push({ path: "image", message: "Debe especificar la imagen." });
        }
        else if (body.image.indexOf("data:image/") < 0) {
            result.messages.push({ path: "image", message: "Imagen invalida." });
        }
        if (result.messages.length > 0) {
            return Promise.reject(result);
        }
        return Promise.resolve(body);
    });
}
function create(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const validBody = yield validateCreate(body);
            const image = {
                id: uuid_1.v1(),
                image: validBody.image
            };
            yield redisClient.set(image.id, image.image);
            return Promise.resolve(image);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.create = create;
//# sourceMappingURL=service.js.map