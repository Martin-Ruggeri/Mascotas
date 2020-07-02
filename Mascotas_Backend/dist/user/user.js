"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const mongoose_1 = require("mongoose");
const env = require("../server/environment");
const conf = env.getConfig(process.env);
/**
 * Esquema de un usuario del sistema
 */
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        trim: true,
        default: "",
        required: "El nombre de usuario es requerido"
    },
    login: {
        type: String,
        unique: "El login ya existe",
        required: "El login es requerido",
        trim: true
    },
    password: {
        type: String,
        default: "",
        required: "La contraseña es requerida"
    },
    permissions: {
        type: [
            {
                type: String,
            }
        ],
        default: ["user"]
    },
    updated: {
        type: Date,
        default: Date.now()
    },
    created: {
        type: Date,
        default: Date.now()
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, { collection: "users" });
UserSchema.path("password").validate(function (password) {
    return password && password.length > 6;
}, "La contraseña debe ser mayor a 6 caracteres");
/**
 * Crea un hash del password
 */
UserSchema.methods.hashPassword = function (password) {
    return crypto_1.pbkdf2Sync(password, conf.passwordSalt, 10000, 64, "SHA1").toString("base64");
};
/**
 * Le asigna permisos nuevos a un usuario
 */
UserSchema.methods.grant = function (permissions) {
    permissions.forEach(p => {
        if ((typeof p === "string") && this.permissions.indexOf(p) < 0) {
            this.permissions.push(p);
        }
    });
};
/**
 * Le asigna permisos nuevos a un usuario
 */
UserSchema.methods.revoke = function (permissions) {
    permissions.forEach(p => {
        if (typeof p === "string") {
            const idx = this.permissions.indexOf(p);
            if (idx) {
                this.permissions.splice(idx, 1);
            }
        }
    });
};
UserSchema.methods.hasPermission = function (permission) {
    return this.permissions.indexOf(permission) >= 0;
};
/**
 * Autentifica un usuario
 */
UserSchema.methods.authenticate = function (password) {
    return this.password && this.password === this.hashPassword(password);
};
/**
 * Permite cambiar la contraseña de usuario
 */
UserSchema.methods.setStringPassword = function (password) {
    this.password = this.hashPassword(password);
    this.updated = Date.now();
};
exports.User = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user.js.map