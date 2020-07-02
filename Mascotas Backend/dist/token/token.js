"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    valid: {
        type: Boolean,
        default: true,
        required: "Valid es requerido"
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: "Usuario es requerido"
    }
}, { collection: "tokens" });
exports.Token = mongoose_1.model("Token", TokenSchema);
//# sourceMappingURL=token.js.map