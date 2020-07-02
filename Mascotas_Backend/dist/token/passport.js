"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const nodeCache = require("node-cache");
const passport = require("passport");
const passport_jwt_1 = require("passport-jwt");
const appConfig = require("../server/environment");
const token_1 = require("./token");
// Este cache de sesiones en memoria va a evitar que tenga que ir a la base de datos
// para verificar que la sesión sea valida. 1 hora de cache en memoria. Luego se vuelve a leer de la db
const sessionCache = new nodeCache({ stdTTL: 3600, checkperiod: 60 });
const conf = appConfig.getConfig(process.env);
/**
 * @apiDefine AuthHeader
 *
 * @apiExample {String} Header Autorización
 *    Authorization=bearer {token}
 *
 * @apiErrorExample 401 Unauthorized
 *    HTTP/1.1 401 Unauthorized
 */
function init() {
    const params = {
        secretOrKey: conf.jwtSecret,
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    /*
    Este método se utiliza para validar que el usuario se haya logueado.
    passport.authenticate("jwt", { session: false })
    termina llamando a este método.
    El resultado de este método es puesto en el request, o sea el payload se pone en el request

    A esta altura el token fue desencriptado correctamente, pero hay que validar el contenido.
    */
    passport.use(new passport_jwt_1.Strategy(params, function (payload, done) {
        /*
        La estrategia es tener un listado de Token validos en la db y validar contra eso.
        Podemos invalidar un token desde la db, usando Token.valid.

        Pero para no esta leyendo permanentemente en la db, usamos un cacheLocal que nos
        mantiene 1 hora los tokens en memoria, luego de esa hora se vuelven a leer desde la db.
        */
        const cachedSession = sessionCache.get(payload.token_id);
        if (cachedSession) {
            return done(undefined, payload);
        }
        else {
            token_1.Token.findOne({
                _id: payload.token_id,
                valid: true
            }, function (err, token) {
                if (err || !token) {
                    return done(undefined, false, { message: "Invalid Token" });
                }
                sessionCache.set(token.id, token.user);
                return done(undefined, payload);
            });
        }
    }));
}
exports.init = init;
/**
 * Invalida la sesión en passport. Básicamente limpia el cache
 */
function invalidateSessionToken(token_id) {
    sessionCache.del(token_id);
}
exports.invalidateSessionToken = invalidateSessionToken;
/**
 * Crea un token lo pone en el cache, lo encripta y lo devuelve.
 */
function createSessionToken(sessionToken) {
    const payload = { user_id: sessionToken.user.toHexString(), token_id: sessionToken.id };
    const token = jwt.sign(payload, conf.jwtSecret);
    sessionCache.set(sessionToken.id, sessionToken.user.toHexString());
    return token;
}
exports.createSessionToken = createSessionToken;
function getTokenFromCache(token_id) {
    return sessionCache.get(token_id);
}
exports.getTokenFromCache = getTokenFromCache;
/**
 * Este filtro de express es para validar que el usuario esté logueado
 * si no esta logueado sale con error 401
 */
exports.onlyLoggedIn = passport.authenticate("jwt", { session: false });
//# sourceMappingURL=passport.js.map