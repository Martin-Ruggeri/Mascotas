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
const error = require("../server/error");
const schema_1 = require("./schema");
const mongoose = require("mongoose");
function findAll() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield schema_1.LostPet.find({
                enabled: true
            }).exec();
            return Promise.resolve(result);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.findAll = findAll;
function findById(lostPetId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield schema_1.LostPet.findOne({
                _id: lostPetId,
                enabled: true
            }).exec();
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
exports.findById = findById;
function validateUpdate(body) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            messages: []
        };
        const MAX_NUMBER = Math.pow(2, 31) - 2;
        if (body.name && body.name.length > 256) {
            result.messages.push({ path: "name", message: "Hasta 256 caracteres solamente." });
        }
        if (body.description && body.description.length > 1024) {
            result.messages.push({ path: "description", message: "Hasta 1024 caracteres solamente." });
        }
        if (body.direction && body.direction.length > 1024) {
            result.messages.push({ path: "direction", message: "Hasta 1024 caracteres solamente." });
        }
        if (body.reward && body.reward > MAX_NUMBER) {
            result.messages.push({ path: "reward", message: "Hasta " + MAX_NUMBER + " soportado solamente." });
        }
        if (body.phone && body.phone.length > 13) {
            result.messages.push({ path: "phone", message: "Hasta 13 caracteres solamente." });
        }
        if (result.messages.length > 0) {
            return Promise.reject(result);
        }
        return Promise.resolve(body);
    });
}
function update(lostPetId, petId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let current;
            if (lostPetId) {
                current = yield schema_1.LostPet.findById(lostPetId);
                if (!current) {
                    throw error.ERROR_NOT_FOUND;
                }
            }
            else {
                current = new schema_1.LostPet();
                current.pet = mongoose.Types.ObjectId.createFromHexString(petId);
            }
            const validBody = yield validateUpdate(body);
            if (validBody.name) {
                current.name = validBody.name;
            }
            if (validBody.picture) {
                current.picture = validBody.picture;
            }
            else {
                current.picture = "";
            }
            if (validBody.description) {
                current.description = validBody.description;
            }
            if (validBody.direction) {
                current.direction = validBody.direction;
            }
            else {
                current.direction = "";
            }
            if (validBody.reward) {
                current.reward = validBody.reward;
            }
            else {
                current.reward = 0;
            }
            if (validBody.phone) {
                current.phone = validBody.phone;
            }
            yield current.save();
            return Promise.resolve(current);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.update = update;
function remove(lostPetId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield schema_1.LostPet.findOne({
                _id: lostPetId,
                enabled: true
            }).exec();
            if (!result) {
                throw error.ERROR_NOT_FOUND;
            }
            result.enabled = false;
            yield result.save();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.remove = remove;
//# sourceMappingURL=service.js.map