"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
/**
 * Esquema del Perfil
 */
exports.ProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        trim: true
    },
    phone: {
        type: String,
        default: "",
        trim: true
    },
    email: {
        type: String,
        default: "",
        trim: true
    },
    address: {
        type: String,
        default: "",
        trim: true
    },
    picture: {
        type: String,
        ref: "Image"
    },
    valid: {
        type: Boolean,
        default: true
    },
    province: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Province"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: "Usuario es requerido"
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
}, { collection: "profiles" });
/**
 * Antes de guardar
 */
exports.ProfileSchema.pre("save", function (next) {
    this.updated = Date.now();
    next();
});
exports.Profile = mongoose.model("Profile", exports.ProfileSchema);
//# sourceMappingURL=schema.js.map