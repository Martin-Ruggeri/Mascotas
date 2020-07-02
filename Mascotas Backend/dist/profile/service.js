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
const mongoose = require("mongoose");
const provinces = require("../provinces/service");
function findForUser(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield schema_1.Profile.findOne({
            user: mongoose.Types.ObjectId(escape(userId)),
            enabled: true
        });
    });
}
function read(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const profile = yield findForUser(userId);
            if (!profile) {
                return Promise.resolve(new schema_1.Profile());
            }
            return Promise.resolve(profile);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.read = read;
function validateProfile(body, isNew) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            messages: []
        };
        if (isNew && (!body.email || body.email.length <= 0)) {
            result.messages.push({ path: "email", message: "No puede quedar vacío." });
        }
        if (body.email && body.email.length > 256) {
            result.messages.push({ path: "email", message: "Hasta 256 caracteres solamente." });
        }
        if (isNew && (!body.name || body.name.length <= 0)) {
            result.messages.push({ path: "name", message: "No puede quedar vacío." });
        }
        if (body.name && body.name.length > 1024) {
            result.messages.push({ path: "name", message: "Hasta 1024 caracteres solamente." });
        }
        if (body.address && body.address.length > 1024) {
            result.messages.push({ path: "address", message: "Hasta 1024 caracteres solamente." });
        }
        if (body.phone && body.phone.length > 32) {
            result.messages.push({ path: "phone", message: "Hasta 32 caracteres solamente." });
        }
        if (body.province) {
            const province = yield provinces.read(body.province);
            if (!province) {
                result.messages.push({ path: "province", message: "No se encuentra." });
            }
        }
        if (result.messages.length > 0) {
            return Promise.reject(result);
        }
        return Promise.resolve(body);
    });
}
function updateBasicInfo(userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let profile = yield findForUser(userId);
            const validatedBody = yield validateProfile(body, !!profile);
            if (!profile) {
                profile = new schema_1.Profile();
                profile.id = mongoose.Types.ObjectId.createFromHexString(userId);
                profile.user = mongoose.Types.ObjectId.createFromHexString(userId);
            }
            if (validatedBody.email) {
                profile.email = validatedBody.email;
            }
            if (validatedBody.name) {
                profile.name = validatedBody.name;
            }
            if (validatedBody.address) {
                profile.address = validatedBody.address;
            }
            if (validatedBody.phone) {
                profile.phone = validatedBody.phone;
            }
            if (validatedBody.province) {
                profile.province = (yield provinces.read(body.province))._id;
            }
            else {
                profile.province = undefined;
            }
            yield profile.save();
            return Promise.resolve(profile);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.updateBasicInfo = updateBasicInfo;
function validateUpdateProfilePicture(imageId) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = {
            messages: []
        };
        if (!imageId || imageId.length <= 0) {
            result.messages.push({ path: "image", message: "Imagen inválida." });
        }
        if (result.messages.length > 0) {
            return Promise.reject(result);
        }
        return Promise.resolve();
    });
}
function updateProfilePicture(userId, imageId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let profile = yield findForUser(userId);
            yield validateUpdateProfilePicture(imageId);
            if (!profile) {
                profile = new schema_1.Profile();
                profile.id = mongoose.Types.ObjectId.createFromHexString(userId);
                profile.user = mongoose.Types.ObjectId.createFromHexString(userId);
            }
            profile.picture = imageId;
            yield profile.save();
            return Promise.resolve(profile);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.updateProfilePicture = updateProfilePicture;
//# sourceMappingURL=service.js.map