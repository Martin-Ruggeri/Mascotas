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
const passport_1 = require("../token/passport");
const service = require("./service");
/**
 * Modulo de perfiles de usuario
 */
function initModule(app) {
    app
        .route("/v1/profile")
        .get(passport_1.onlyLoggedIn, current)
        .post(passport_1.onlyLoggedIn, updateBasicInfo);
}
exports.initModule = initModule;
/**
 * @apiDefine IProfileResponse
 *
 * @apiSuccessExample {json} Perfil
 *    {
 *      "name": "Nombre y Apellido",
 *      "phone": "Teléfono",
 *      "email": "Email",
 *      "address": "Dirección",
 *      "picture": "Id de imagen",
 *      "province": "Id de provincia",
 *    }
 */
/**
 * @api {get} /v1/profile Obtener Perfil
 * @apiName Obtener Perfil
 * @apiGroup Perfil
 *
 * @apiUse IProfileResponse
 *
 * @apiUse AuthHeader
 * @apiUse OtherErrors
 */
function current(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.read(req.user.user_id);
        res.json({
            name: result.name,
            phone: result.phone,
            email: result.email,
            address: result.address,
            province: result.province,
            picture: result.picture
        });
    });
}
/**
 * @apiDefine IProfileResponse
 *
 * @apiSuccessExample {json} Perfil
 *    {
 *      "name": "Nombre y Apellido",
 *      "phone": "Teléfono",
 *      "email": "Email",
 *      "address": "Dirección",
 *      "picture": "Id de imagen",
 *      "province": "Id de provincia",
 *    }
 */
/**
 * @api {post} /v1/profile Actualizar Perfil
 * @apiName Actualizar Perfil
 * @apiGroup Perfil
 *
 * @apiDescription Actualiza los datos del perfil de usuario.
 *
 * @apiExample {json} Perfil
 *    {
 *      "name": "Nombre y Apellido",
 *      "phone": "Teléfono",
 *      "email": "Email",
 *      "address": "Dirección",
 *      "province": "Id de provincia",
 *    }
 *
 * @apiUse IProfileResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function updateBasicInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.updateBasicInfo(req.user.user_id, req.body);
        res.json({
            name: result.name,
            phone: result.phone,
            email: result.email,
            address: result.address,
            province: result.province,
        });
    });
}
//# sourceMappingURL=routes.js.map