"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const image = require("../image/routes");
const pet = require("../pet/routes");
const profile = require("../profile/routes");
const profilePicture = require("../profileImage/routes");
const provinces = require("../provinces/routes");
const user = require("../user/routes");
const lostPet = require("../lostPet/routes");
const lostPetPicture = require("../lostPetImage/routes");
/**
 * Desacoplamos las rutas, los devs pueden tocar este archivo
 * libremente, pero no el archivo express.ts
 */
function initModules(app) {
    user.initModule(app);
    provinces.initModule(app);
    profile.initModule(app);
    profilePicture.initModule(app);
    image.initModule(app);
    pet.initModule(app);
    lostPet.initModule(app);
    lostPetPicture.initModule(app);
}
exports.initModules = initModules;
//# sourceMappingURL=routes.js.map