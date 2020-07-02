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
const user = require("../user/service");
const service = require("./service");
/**
 * Modulo de perfiles de usuario
 */
function initModule(app) {
    // Rutas del controlador
    app.route("/v1/province")
        .get(list)
        .post(passport_1.onlyLoggedIn, create);
    app.route("/v1/province/:provinceId")
        .get(read)
        .delete(passport_1.onlyLoggedIn, remove);
}
exports.initModule = initModule;
/**
 * @api {get} /v1/province Listar Provincias
 * @apiName Listar Provincias
 * @apiGroup Provincias
 *
 * @apiDescription Lista todas las provincias.
 *
 * @apiSuccessExample {json} Provincia
 *   [ {
 *      "name": "Nombre Provincia",
 *      "id": ""
 *     }, ...
 *   ]
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function list(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.list();
        res.json(result.map(u => {
            return {
                id: u.id,
                name: u.name
            };
        }));
    });
}
/**
 * @api {post} /v1/province Crear Provincia
 * @apiName Crear Provincia
 * @apiGroup Provincias
 *
 * @apiDescription Crea o actualiza una provincia.
 *
 * @apiExample {json} Provincia
 *    {
 *      "name": "Nombre Provincia",
 *      "enabled": [true|false]
 *    }
 *
 * @apiSuccessExample {json} Provincia
 *    {
 *      "name": "Nombre Provincia",
 *      "enabled": [true|false]
 *    }
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.hasPermission(req.user.user_id, "admin");
        const result = yield service.create(req.body);
        res.json({ id: result });
    });
}
/**
 * @api {post} /v1/province/:provinceId Buscar Provincia
 * @apiName Buscar Provincia
 * @apiGroup Provincias
 *
 * @apiDescription Buscar una provincia.
 *
 * @apiSuccessExample {json} Provincia
 *    {
 *      "name": "Nombre Provincia",
 *      "id": ""
 *    }
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function read(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.read(req.params.provinceId);
        return res.json({
            id: result.id,
            name: result.name
        });
    });
}
/**
 * @api {delete} /v1/province/:provinceId Eliminar Provincia
 * @apiName Eliminar Provincia
 * @apiGroup Provincias
 *
 * @apiDescription Elimina una provincia.
 *
 * @apiUse 200OK
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.hasPermission(req.user.user_id, "admin");
        yield service.invalidate(req.params.provinceId);
        res.send();
    });
}
//# sourceMappingURL=routes.js.map