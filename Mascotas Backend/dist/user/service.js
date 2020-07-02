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
const env = require("../server/environment");
const error = require("../server/error");
const user_1 = require("./user");
const conf = env.getConfig(process.env);
function register(signUpRequest) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield validateRegister(signUpRequest);
            const user = new user_1.User();
            user.name = body.name;
            user.login = body.login;
            user.permissions = ["user"];
            user.setStringPassword(body.password);
            // Then save the user
            yield user.save();
            return Promise.resolve(user._id.toHexString());
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.register = register;
function validateRegister(body) {
    const result = {
        messages: []
    };
    if (!body.name || body.name.length <= 0) {
        result.messages.push({ path: "name", message: "No puede quedar vacío." });
    }
    else if (body.name.length > 1024) {
        result.messages.push({ path: "name", message: "Hasta 1024 caracteres solamente." });
    }
    if (!body.password) {
        result.messages.push({ path: "password", message: "No puede quedar vacío." });
    }
    else if (body.password.length <= 4) {
        result.messages.push({ path: "password", message: "Mas de 4 caracteres." });
    }
    else if (body.password.length > 256) {
        result.messages.push({ path: "password", message: "Hasta 256 caracteres solamente." });
    }
    if (!body.login || body.login.length <= 0) {
        result.messages.push({ path: "login", message: "No puede quedar vacío." });
    }
    else if (body.login.length > 256) {
        result.messages.push({ path: "login", message: "Hasta 256 caracteres solamente." });
    }
    if (result.messages.length > 0) {
        return Promise.reject(result);
    }
    return Promise.resolve(body);
}
function login(body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            body = yield validateLogin(body);
            const user = yield user_1.User.findOne({ login: body.login, enabled: true }).exec();
            if (!user) {
                throw error.newArgumentError("login", "Usuario no encontrado.");
            }
            if (!user.authenticate(body.password)) {
                throw error.newArgumentError("password", "Password incorrecto.");
            }
            return Promise.resolve(user._id.toHexString());
        }
        catch (error) {
            return Promise.reject(error);
        }
    });
}
exports.login = login;
function validateLogin(body) {
    const result = {
        messages: []
    };
    if (!body.password) {
        result.messages.push({ path: "password", message: "No puede quedar vacío." });
    }
    if (!body.login || body.login.length <= 0) {
        result.messages.push({ path: "login", message: "No puede quedar vacío." });
    }
    if (result.messages.length > 0) {
        return Promise.reject(result);
    }
    return Promise.resolve(body);
}
function findById(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findOne({ _id: userId }).exec();
            if (!user) {
                throw error.ERROR_NOT_FOUND;
            }
            return Promise.resolve(user);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.findById = findById;
function findAll() {
    return new Promise((resolve, reject) => {
        user_1.User.find({}, function (err, user) {
            if (err)
                return reject(err);
            resolve(user);
        });
    });
}
exports.findAll = findAll;
function changePassword(userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield validateChangePassword(userId, body);
            user.setStringPassword(body.newPassword);
            user = yield user.save();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.changePassword = changePassword;
// esta función es especifica de changePassword , busca y valida un usuario para cambiarle el pass
function validateChangePassword(userId, body) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = {
                messages: []
            };
            if (!body.currentPassword) {
                result.messages.push({ path: "currentPassword", message: "No puede quedar vacío." });
            }
            else if (body.currentPassword.length <= 4) {
                result.messages.push({ path: "currentPassword", message: "Mas de 4 caracteres." });
            }
            else if (body.currentPassword.length > 256) {
                result.messages.push({ path: "currentPassword", message: "Hasta 256 caracteres solamente." });
            }
            if (!body.newPassword) {
                result.messages.push({ path: "newPassword", message: "No puede quedar vacío." });
            }
            else if (body.newPassword.length <= 4) {
                result.messages.push({ path: "newPassword", message: "Mas de 4 caracteres." });
            }
            else if (body.newPassword.length > 256) {
                result.messages.push({ path: "newPassword", message: "Hasta 256 caracteres solamente." });
            }
            if (result.messages.length > 0) {
                throw result;
            }
            const user = yield user_1.User.findOne({ _id: userId, enabled: true }).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra.");
            }
            if (!user.authenticate(body.currentPassword)) {
                throw error.newArgumentError("currentPassword", "El password actual es incorrecto.");
            }
            return Promise.resolve(user);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
function hasPermission(userId, permission) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findOne({ _id: userId, enabled: true }).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra.");
            }
            if (!user.hasPermission(permission)) {
                throw error.newError(error.ERROR_INVALID_CREDENTIALS, "Accesos insuficientes");
            }
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.hasPermission = hasPermission;
function grant(userId, permissions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!permissions || !(permissions instanceof Array)) {
                throw error.newArgumentError("permissions", "Invalid value");
            }
            let user = yield user_1.User.findOne({ _id: userId }).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            user.grant(permissions);
            user = yield user.save();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.grant = grant;
function revoke(userId, permissions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!permissions || !(permissions instanceof Array)) {
                throw error.newArgumentError("permissions", "Invalid value");
            }
            let user = yield user_1.User.findOne({ _id: userId }).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            user.revoke(permissions);
            user = yield user.save();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.revoke = revoke;
function enable(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield user_1.User.findOne({ _id: userId }).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            user.enabled = true;
            user = yield user.save();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.enable = enable;
function disable(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield user_1.User.findOne({ _id: userId }).exec();
            if (!user) {
                throw error.newError(error.ERROR_NOT_FOUND, "El usuario no se encuentra");
            }
            user.enabled = false;
            user = yield user.save();
            return Promise.resolve();
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.disable = disable;
//# sourceMappingURL=service.js.map