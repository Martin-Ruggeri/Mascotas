"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
/**
 * Esquema de Mascotas Perdidas
 */
exports.LostPetSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        trim: true,
        required: "Nombre es requerido"
    },
    description: {
        type: String,
        default: "",
        trim: true,
        required: "descripción es requerido"
    },
    direction: {
        type: String,
        default: "",
        trim: true,
    },
    reward: {
        type: Number,
        default: 0,
        trim: true,
    },
    phone: {
        type: String,
        default: "",
        trim: true,
        required: "Telefono es requerido"
    },
    pet: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: "Mascota es requerido"
    },
    picture: {
        type: String,
        ref: "Image"
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
}, { collection: "lostPet" });
/**
 * Antes de guardar
 */
exports.LostPetSchema.pre("save", function (next) {
    this.updated = Date.now();
    next();
});
exports.LostPet = mongoose.model("LostPet", exports.LostPetSchema);
//# sourceMappingURL=schema.js.map