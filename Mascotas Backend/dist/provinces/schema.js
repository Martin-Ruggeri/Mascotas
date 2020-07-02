"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ProvinceSchema = new mongoose.Schema({
    name: {
        type: String,
        default: "",
        trim: true,
        required: "Nombre no puede estar vacío."
    },
    enabled: {
        type: Boolean,
        default: true
    }
}, { collection: "provinces" });
exports.Province = mongoose.model("Province", exports.ProvinceSchema);
//# sourceMappingURL=schema.js.map