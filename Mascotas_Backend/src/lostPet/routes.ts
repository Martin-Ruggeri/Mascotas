"use strict";

import * as express from "express";
import * as error from "../server/error";
import { onlyLoggedIn } from "../token/passport";
import { ISessionRequest } from "../user/service";
import * as service from "./service";

/**
 * Modulo de mascotas de usuario
 */
export function initModule(app: express.Express) {
    // Rutas de acceso a mascotas
    app
        .route("/v1/lostpet")
        .get(onlyLoggedIn, findAll)
        .post(onlyLoggedIn, create);

    app
        .route("/v1/lostpet/:lostPetId")
        .get(onlyLoggedIn, readById)
        .put(onlyLoggedIn, updateById)
        .delete(onlyLoggedIn, removeById);
}


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
async function findAll(req: ISessionRequest, res: express.Response) {
    const result = await service.findAll();
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
async function create(req: ISessionRequest, res: express.Response) {
    const result = await service.update(undefined, req.body.pet, req.body);
    res.json({
        id: result.id
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
async function readById(req: ISessionRequest, res: express.Response) {
    const result = await service.findById(req.params.lostPetId);
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
async function updateById(req: ISessionRequest, res: express.Response) {
    const result = await service.update(req.params.lostPetId, undefined, req.body);
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

async function removeById(req: ISessionRequest, res: express.Response) {
    await service.remove(req.params.lostPetId);
    res.send();
}