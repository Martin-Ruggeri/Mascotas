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
const token = require("../token/service");
const user = require("./service");
/**
 * Modulo de seguridad, login/logout, cambio de contraseñas, etc
 */
function initModule(app) {
    app.route("/v1/user/password").post(passport_1.onlyLoggedIn, changePassword);
    app.route("/v1/user").post(signUp);
    app.route("/v1/user/signin").post(login);
    app.route("/v1/user/signout").get(passport_1.onlyLoggedIn, logout);
    app.route("/v1/users/:userID/grant").post(passport_1.onlyLoggedIn, grantPermissions);
    app.route("/v1/users/:userID/revoke").post(passport_1.onlyLoggedIn, revokePermissions);
    app.route("/v1/users/:userID/enable").post(passport_1.onlyLoggedIn, enableUser);
    app.route("/v1/users/:userID/disable").post(passport_1.onlyLoggedIn, disableUser);
    app.route("/v1/users").get(passport_1.onlyLoggedIn, getAll);
    app.route("/v1/users/current").get(passport_1.onlyLoggedIn, current);
}
exports.initModule = initModule;
/**
 * @api {post} /v1/user/password Cambiar Password
 * @apiName Cambiar Password
 * @apiGroup Seguridad
 *
 * @apiDescription Cambia la contraseña del usuario actual.
 *
 * @apiExample {json} Body
 *    {
 *      "currentPassword" : "{Contraseña actual}",
 *      "newPassword" : "{Nueva Contraseña}",
 *    }
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function changePassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.changePassword(req.user.user_id, req.body);
        res.send();
    });
}
/**
 * @apiDefine TokenResponse
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *     {
 *       "token": "{Token de autorización}"
 *     }
 */
/**
 * @api {post} /v1/users Registrar Usuario
 * @apiName Registrar Usuario
 * @apiGroup Seguridad
 *
 * @apiDescription Registra un nuevo usuario en el sistema.
 *
 * @apiExample {json} Body
 *    {
 *      "name": "{Nombre de Usuario}",
 *      "login": "{Login de usuario}",
 *      "password": "{Contraseña}"
 *    }
 *
 * @apiUse TokenResponse
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield user.register(req.body);
        const tokenString = yield token.create(userId);
        res.json({ token: tokenString });
    });
}
/**
 * @api {post} /v1/users/signin Login
 * @apiName Log in
 * @apiGroup Seguridad
 *
 * @apiDescription Loguea un usuario en el sistema.
 *
 * @apiExample {json} Body
 *    {
 *      "login": "{Login de usuario}",
 *      "password": "{Contraseña}"
 *    }
 *
 * @apiUse TokenResponse
 *
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = yield user.login(req.body);
        const tokenString = yield token.create(userId);
        res.json({ token: tokenString });
    });
}
/**
 * @api {get} /v1/users/signout Logout
 * @apiName Logout
 * @apiGroup Seguridad
 *
 * @apiDescription Desloguea un usuario en el sistema, invalida el token.
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse OtherErrors
 */
function logout(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield token.invalidate(req.user);
        res.send();
    });
}
/**
 * @api {post} /v1/users/:userId/grant Otorga Permisos
 * @apiName Otorga Permisos
 * @apiGroup Seguridad
 *
 * @apiDescription Otorga permisos al usuario indicado, el usuario logueado tiene que tener permiso "admin".
 *
 * @apiExample {json} Body
 *    {
 *      "permissions" : ["{permiso}", ...],
 *    }
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function grantPermissions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.hasPermission(req.user.user_id, "admin");
        yield user.grant(req.params.userID, req.body.permissions);
        res.send();
    });
}
/**
 * @api {post} /v1/users/:userId/revoke Revoca Permisos
 * @apiName Revoca Permisos
 * @apiGroup Seguridad
 *
 * @apiDescription Quita permisos al usuario indicado, el usuario logueado tiene que tener permiso "admin".
 *
 * @apiExample {json} Body
 *    {
 *      "permissions" : ["{permiso}", ...],
 *    }
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function revokePermissions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.hasPermission(req.user.user_id, "admin");
        yield user.revoke(req.params.userID, req.body.permissions);
        res.send();
    });
}
/**
 * @api {post} /v1/users/:userId/enable Habilitar Usuario
 * @apiName Habilitar Usuario
 * @apiGroup Seguridad
 *
 * @apiDescription Habilita un usuario en el sistema. El usuario logueado debe tener permisos "admin".
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function enableUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.hasPermission(req.user.user_id, "admin");
        yield user.enable(req.params.userID);
        res.send();
    });
}
/**
 * @api {post} /v1/users/:userId/disable Deshabilitar Usuario
 * @apiName Deshabilitar Usuario
 * @apiGroup Seguridad
 *
 * @apiDescription Deshabilita un usuario en el sistema.   El usuario logueado debe tener permisos "admin".
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function disableUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.hasPermission(req.user.user_id, "admin");
        yield user.disable(req.params.userID);
        res.send();
    });
}
/**
 * @api {post} /v1/users Lista de Usuarios
 * @apiName Lista de Usuarios
 * @apiGroup Seguridad
 *
 * @apiDescription Devuelve una lista de usuarios. El usuario logueado debe tener permisos "admin".
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *     [{
 *        "id": "{Id usuario}",
 *        "name": "{Nombre del usuario}",
 *        "login": "{Login de usuario}",
 *        "permissions": [
 *            "{Permission}"
 *        ],
 *        "enabled": true|false
 *       }, ...
 *     ]
 *
 * @apiUse AuthHeader
 * @apiUse ParamValidationErrors
 * @apiUse OtherErrors
 */
function getAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield user.hasPermission(req.user.user_id, "admin");
        const users = yield user.findAll();
        res.json(users.map(u => {
            return {
                id: u.id,
                name: u.name,
                login: u.login,
                permissions: u.permissions,
                enabled: u.enabled
            };
        }));
    });
}
/**
 * @api {get} /v1/users/current Usuario Actual
 * @apiName Usuario Actual
 * @apiGroup Seguridad
 *
 * @apiDescription Obtiene información del usuario actual.
 *
 * @apiSuccessExample {json} Respuesta
 *     HTTP/1.1 200 OK
 *     {
 *        "id": "{Id usuario}",
 *        "name": "{Nombre del usuario}",
 *        "login": "{Login de usuario}",
 *        "permissions": [
 *            "{Permission}"
 *        ]
 *     }
 *
 * @apiUse AuthHeader
 * @apiUse OtherErrors
 */
function current(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield user.findById(req.user.user_id);
        return res.json({
            id: response.id,
            name: response.name,
            login: response.login,
            permissions: response.permissions
        });
    });
}
//# sourceMappingURL=routes.js.map