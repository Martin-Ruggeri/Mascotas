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
const schema_1 = require("./schema");
const error = require("../server/error");
function list() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield schema_1.Province.find({ enabled: true }).exec();
            return Promise.resolve(result);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.list = list;
function validateCreate(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            messages: []
        };
        if (!body.name || body.name.length <= 0) {
            result.messages.push({ path: "name", message: "No puede quedar vacío." });
        }
        else if (body.name.length > 256) {
            result.messages.push({ path: "name", message: "Hasta 256 caracteres solamente." });
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
            const validated = yield validateCreate(body);
            const province = new schema_1.Province();
            province.name = validated.name;
            const saved = yield province.save();
            return Promise.resolve(saved._id.toHexString());
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.create = create;
function read(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield schema_1.Province.findOne({
                _id: escape(id),
                enabled: true
            });
            if (!result) {
                throw error.ERROR_NOT_FOUND;
            }
            return Promise.resolve(result);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.read = read;
function invalidate(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const province = yield schema_1.Province.findOne({
                _id: escape(id),
                enabled: true
            });
            if (!province) {
                throw error.ERROR_NOT_FOUND;
            }
            province.enabled = false;
            yield province.save();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.invalidate = invalidate;
//# sourceMappingURL=service.js.map