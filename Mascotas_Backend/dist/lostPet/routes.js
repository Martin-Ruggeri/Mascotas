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
        .route("/v1/lostpet")
        .get(passport_1.onlyLoggedIn, findAll)
        .post(passport_1.onlyLoggedIn, create);
    app
        .route("/v1/lostpet/:lostPetId")
        .get(passport_1.onlyLoggedIn, readById)
        .post(passport_1.onlyLoggedIn, updateById)
        .delete(passport_1.onlyLoggedIn, removeById);
}
exports.initModule = initModule;
/**
 * @api {get} /v1/lostpet Listar Mascota Perdidas
 * @apiName Listar Mascota Perdidas
 * @apiGroup Mascotas Perdidas
 *
 * @apiDescription Obtiene un listado de las mascotas perdidas
 *
 * @apiSuccessExample {json} Mascota Perdidas
 *  [
 *    {
 *  name: "Nombre de la mascota perdida";
 *  description: "Descripcion de la mascota perdida";
 *  direction: "Direccion donde se vio por ultima vez la mascota perdida";
 *  reward: "Recompensa por la mascota perdida";
 *  phone: "Celular para comunicarse en caso de encontrar la mascota perdida";
 *  pet: "Relacion entre la mascota y la mascota perdida";
 *  }
 *  ]
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
function findAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.findAll();
        res.json(result.map(u => {
            return {
                id: u.id,
                name: u.name,
                description: u.description,
                direction: u.direction,
                reward: u.reward,
                phone: u.phone,
                pet: u.pet,
                picture: u.picture
            };
        }));
    });
}
/**
 * @api {post} /v1/lostpet Crear Mascota
 * @apiName Crear Mascota perdida
 * @apiGroup Mascotas perdida
 *
 * @apiDescription Crea una mascota perdida.
 *
 * @apiExample {json} Mascota Perdida
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
        const result = yield service.update(undefined, req.body.pet, req.body);
        res.json({
            id: result.id
        });
    });
}
/**
 * @api {get} /v1/lostpet/:lostPetId Buscar Mascota Perdida
 * @apiName Buscar Mascota Perdida
 * @apiGroup Mascotas Perdida
 *
 * @apiDescription Busca una mascota perdida por id.
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function readById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.findById(req.params.lostPetId);
        res.json({
            id: result.id,
            name: result.name,
            description: result.description,
            direction: result.direction,
            reward: result.reward,
            phone: result.phone,
            pet: result.pet,
            picture: result.picture
        });
    });
}
/**
 * @api {post} /v1/lostpet/:lostpetId Actualizar Mascota Perdida
 * @apiName Actualizar Mascota Perdida
 * @apiGroup Mascotas Perdida
 *
 * @apiDescription Actualiza los datos de una mascota perdida.
 *
 * @apiSuccessExample {json} Mascota Perdidas
 *  {
 *    name: "Nombre de la mascota perdida";
 *    description: "Descripcion de la mascota perdida";
 *    direction: "Direccion donde se vio por ultima vez la mascota perdida";
 *    reward: "Recompensa por la mascota perdida";
 *    phone: "Celular para comunicarse en caso de encontrar la mascota perdida";
 *  }
 *
 * @apiUse IMascotaResponse
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function updateById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.update(req.params.lostPetId, undefined, req.body);
        res.json({
            id: result.id,
            name: result.name,
            description: result.description,
            direction: result.direction,
            reward: result.reward,
            phone: result.phone,
            pet: result.pet,
            picture: result.picture
        });
    });
}
/**
 * @api {delete} /v1/lostpet/:lostPetId" Eliminar Mascota Perdida
 * @apiName Eliminar Mascota Perdida
 * @apiGroup Mascotas Perdida
 *
 * @apiDescription Eliminar una mascota perdida.
 *
 * @apiUse AuthHeader
 * @apiUse 200OK
 * @apiUse OtherErrors
 */
function removeById(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield service.remove(req.params.lostPetId);
        res.send();
    });
}
//# sourceMappingURL=routes.js.map