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
function findByCurrentUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield schema_1.Pet.find({
                user: mongoose.Types.ObjectId(userId),
                enabled: true
            }).exec();
            return Promise.resolve(result);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.findByCurrentUser = findByCurrentUser;
function findById(userId, petId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield schema_1.Pet.findOne({
                user: mongoose.Types.ObjectId(userId),
                _id: petId,
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
        if (body.name && body.name.length > 256) {
            result.messages.push({ path: "name", message: "Hasta 256 caracteres solamente." });
        }
        if (body.description && body.description.length > 1024) {
            result.messages.push({ path: "description", message: "Hasta 2014 caracteres solamente." });
        }
        if (result.messages.length > 0) {
            return Promise.reject(result);
        }
        return Promise.resolve(body);
    });
}
function update(petId, userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let current;
            if (petId) {
                current = yield schema_1.Pet.findById(petId);
                if (!current) {
                    throw error.ERROR_NOT_FOUND;
                }
            }
            else {
                current = new schema_1.Pet();
                current.user = mongoose.Types.ObjectId.createFromHexString(userId);
            }
            const validBody = yield validateUpdate(body);
            if (validBody.name) {
                current.name = validBody.name;
            }
            if (validBody.description) {
                current.description = validBody.description;
            }
            if (validBody.birthDate) {
                current.birthDate = validBody.birthDate;
            }
            current.lostPetId = validBody.lostPetId;
            yield current.save();
            return Promise.resolve(current);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.update = update;
function remove(userId, petId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pet = yield schema_1.Pet.findOne({
                user: mongoose.Types.ObjectId(userId),
                _id: petId,
                enabled: true
            }).exec();
            if (!pet) {
                throw error.ERROR_NOT_FOUND;
            }
            pet.enabled = false;
            yield pet.save();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.remove = remove;
//# sourceMappingURL=service.js.map