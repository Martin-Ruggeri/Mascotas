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
 * Modulo de imágenes
 */
function initModule(app) {
    // Rutas del controlador
    app
        .route("/v1/image")
        .post(passport_1.onlyLoggedIn, create);
    app
        .route("/v1/image/:imageId")
        .get(read);
}
exports.initModule = initModule;
/**
 * @api {post} /v1/image Guardar Imagen
 * @apiName Guardar Imagen
 * @apiGroup Imagen
 *
 * @apiDescription Guarda una imagen en la db
 *
 * @apiExample {json} Body
 *    {
 *      "image" : "Base 64 Image Text"
 *    }
 *
 * @apiSuccessExample {json} Response
 *    {
 *      "id": "id de imagen"
 *    }
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.create(req.body);
        res.json({
            id: result.id
        });
    });
}
/**
 * @api {get} /v1/image/:id Obtener Imagen
 * @apiName Obtener Imagen
 * @apiGroup Imagen
 *
 * @apiDescription Obtiene una imagen
 *
 * @apiSuccess {text} Base64 image response
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function read(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield service.findByID(req.params.imageId);
        const data = result.image.substring(result.image.indexOf(",") + 1);
        const buff = new Buffer(data, "base64");
        res.type("image/jpeg");
        res.send(buff);
    });
}
//# sourceMappingURL=routes.js.map