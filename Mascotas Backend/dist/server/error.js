"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ERROR_UNAUTHORIZED = 401;
exports.ERROR_INVALID_CREDENTIALS = 403;
exports.ERROR_NOT_FOUND = 404;
exports.ERROR_BAD_REQUEST = 400;
exports.ERROR_INTERNAL_ERROR = 500;
class ValidationErrorItem {
}
exports.ValidationErrorItem = ValidationErrorItem;
class ValidationErrorMessage {
}
exports.ValidationErrorMessage = ValidationErrorMessage;
function newArgumentError(argument, err) {
    const result = new ValidationErrorMessage();
    result.messages = [{
            path: argument,
            message: err
        }];
    return result;
}
exports.newArgumentError = newArgumentError;
function newError(code, err) {
    const result = new ValidationErrorMessage();
    result.code = code;
    result.error = err;
    return result;
}
exports.newError = newError;
/**
 * @apiDefine 200OK
 *
 * @apiSuccessExample {json} Response
 *     HTTP/1.1 200 OK
 */
/**
 * @apiDefine ParamValidationErrors
 *
 * @apiErrorExample 400 Bad Request
 *     HTTP/1.1 400 Bad Request
 *     {
 *        "messages" : [
 *          {
 *            "path" : "{Nombre de la propiedad}",
 *            "message" : "{Motivo del error}"
 *          },
 *          ...
 *       ]
 *     }
 */
/**
 * @apiDefine OtherErrors
 *
 * @apiErrorExample 500 Server Error
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *        "error" : "Not Found"
 *     }
 *
 */
function handle(err, req, res, next) {
    if (err instanceof ValidationErrorMessage
        || err.code || err.messages) {
        // ValidationErrorMessage
        if (err.code) {
            res.status(err.code);
        }
        else {
            res.status(400);
        }
        const send = {};
        if (err.error) {
            send.error = err.error;
        }
        if (err.messages) {
            send.messages = err.messages;
        }
        return res.send(send);
    }
    else if (err instanceof mongoose.Error.ValidationError) {
        // Error de Mongo
        return res.send(sendMongooseValidationError(res, err));
    }
    else if (err.code) {
        // Error de Mongo
        return res.send(sendMongoose(res, err));
    }
    else {
        console.log(err);
        return res.send(sendUnknown(res, err));
    }
}
exports.handle = handle;
function handle404(req, res) {
    res.status(exports.ERROR_NOT_FOUND);
    res.send({
        url: req.originalUrl,
        error: "Not Found"
    });
}
exports.handle404 = handle404;
// Error desconocido
function sendUnknown(res, err) {
    res.status(exports.ERROR_INTERNAL_ERROR);
    return { error: err };
}
// Obtiene un error adecuando cuando hay errores de db
function sendMongooseValidationError(res, err) {
    res.status(exports.ERROR_BAD_REQUEST);
    const result = new ValidationErrorMessage();
    result.messages = [];
    Object.keys(err.errors).forEach(property => {
        const element = err.errors[property];
        if (element.path && element.message) {
            result.messages.push({
                path: element.path,
                message: element.message,
            });
        }
    });
    if (result.messages.length == 0 && err.message) {
        result.error = err.message;
    }
    return result;
}
// Obtiene un error adecuando cuando hay errores de db
function sendMongoose(res, err) {
    res.status(exports.ERROR_BAD_REQUEST);
    try {
        switch (err.code) {
            case 11000:
            case 11001:
                const fieldName = err.errmsg.substring(err.errmsg.lastIndexOf("index:") + 7, err.errmsg.lastIndexOf("_1"));
                return {
                    messages: [{
                            path: fieldName,
                            message: "Este registro ya existe."
                        }]
                };
            default:
                res.status(exports.ERROR_BAD_REQUEST);
                return { error: err };
        }
    }
    catch (ex) {
        res.status(exports.ERROR_INTERNAL_ERROR);
        return { error: err };
    }
}
//# sourceMappingURL=error.js.map