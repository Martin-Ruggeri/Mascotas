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
 * Modulo de mascotas de usuario
 */
function initModule(app) {
    // Rutas de acceso a mascotas
    app
        .route("/v1/pet")
        .get(passport_1.onlyLoggedIn, findByCurrentUser)
        .post(passport_1.onlyLoggedIn, create);
    app
        .route("/v1/pet/:petId")
        .get(passport_1.onlyLoggedIn, readById)
        .post(passport_1.onlyLoggedIn, updateById)
        .delete(passport_1.onlyLoggedIn, removeById);
}
exports.initModule = initModule;
/**
 * @api {get} /v1/pet Listar Mascota
 * @apiName Listar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Obtiene un listado de las mascotas del usuario actual.
 *
 * @apiSuccessExample {json} Mascota
 *  [
 *    {
 *      "id": "Id de mascota"
 *      "name": "Nombre de la mascota",
 *      "description": "Descripción de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }, ...
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
function findByCurrentUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.findByCurrentUser(req.user.user_id);
        res.json(result.map(u => {
            return {
                id: u.id,
                name: u.name,
                description: u.description,
                birthDate: u.birthDate,
                lostPetId: u.lostPetId
            };
        }));
    });
}
/**
 * @apiDefine IMascotaResponse
 *
 * @apiSuccessExample {json} Mascota
 *    {
 *      "id": "Id de mascota",
 *      "name": "Nombre de la mascota",
 *      "description": "Descripción de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }
 */
/**
 * @api {post} /v1/pet Crear Mascota
 * @apiName Crear Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Crea una mascota.
 *
 * @apiExample {json} Mascota
 *    {
 *      "id": "Id mascota"
 *    }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.update(undefined, req.user.user_id, req.body);
        res.json({
            id: result.id
        });
    });
}
/**
 * @api {get} /v1/pet/:petId Buscar Mascota
 * @apiName Buscar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Busca una mascota por id.
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function readById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.findById(req.user.user_id, req.params.petId);
        res.json({
            id: result.id,
            name: result.name,
            description: result.description,
            birthDate: result.birthDate,
            lostPetId: result.lostPetId
        });
    });
}
/**
 * @api {post} /v1/pet/:petId Actualizar Mascota
 * @apiName Actualizar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Actualiza los datos de una mascota.
 *
 * @apiExample {json} Mascota
 *    {
 *      "id": "Id de mascota",
 *      "name": "Nombre de la mascota",
 *      "description": "Description de la mascota",
 *      "birthDate": date (DD/MM/YYYY),
 *    }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function updateById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.update(req.params.petId, req.user.user_id, req.body);
        res.json({
            id: result.id,
            name: result.name,
            description: result.description,
            birthDate: result.birthDate,
            lostPetId: result.lostPetId
        });
    });
}
/**
 * @api {delete} /v1/pet/:petId Eliminar Mascota
 * @apiName Eliminar Mascota
 * @apiGroup Mascotas
 *
 * @apiDescription Eliminar una mascota.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
function removeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield service.remove(req.user.user_id, req.params.petId);
        res.send();
    });
}
//# sourceMappingURL=routes.js.map