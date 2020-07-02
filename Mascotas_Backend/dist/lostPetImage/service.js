"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
function validateUpdatePicture(imageId) {
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
}
exports.validateUpdatePicture = validateUpdatePicture;
//# sourceMappingURL=service.js.map