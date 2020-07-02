"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
/**
 * Esquema de Mascotas
 */
exports.PetSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        trim: true,
        required: "Nombre es requerido"
    },
    birthDate: {
        type: Date,
        default: "",
        trim: true
    },
    description: {
        type: String,
        default: "",
        trim: true
    },
    lostPetId: {
        type: String,
        default: "",
        trim: true
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
}, { collection: "pets" });
/**
 * Antes de guardar
 */
exports.PetSchema.pre("save", function (next) {
    this.updated = Date.now();
    next();
});
exports.Pet = mongoose.model("Pet", exports.PetSchema);
//# sourceMappingURL=schema.js.map