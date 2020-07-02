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
function updateLostPetPicture(lostPetId, imageId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let current = yield findById(lostPetId);
            yield validateUpdateProfilePicture(imageId);
            if (!current) {
                current = new LostPet();
                current.pet = mongoose.Types.ObjectId.createFromHexString(lostPetId);
            }
            current.picture = imageId;
            yield current.save();
            return Promise.resolve(current);
        }
        catch (err) {
            return Promise.reject(err);
        }
    });
}
exports.updateLostPetPicture = updateLostPetPicture;
//# sourceMappingURL=services.js.map