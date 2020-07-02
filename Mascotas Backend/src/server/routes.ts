"use strict";

import * as express from "express";
import * as image from "../image/routes";
import * as pet from "../pet/routes";
import * as profile from "../profile/routes";
import * as profilePicture from "../profileImage/routes";
import * as provinces from "../provinces/routes";
import * as user from "../user/routes";
import * as lostPet from "../lostPet/routes";
import * as lostPetPicture from "../lostPetImage/routes";

/**
 * Desacoplamos las rutas, los devs pueden tocar este archivo
 * libremente, pero no el archivo express.ts
 */
export function initModules(app: express.Express) {
    user.initModule(app);
    provinces.initModule(app);
    profile.initModule(app);
    profilePicture.initModule(app);
    image.initModule(app);
    pet.initModule(app);
    lostPet.initModule(app);
    lostPetPicture.initModule(app);

}

