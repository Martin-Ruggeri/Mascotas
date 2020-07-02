"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const env = require("./server/environment");
const express = require("./server/express");
// Variables de entorno
const conf = env.getConfig(process.env);
// Establecemos conexión con MongoDD
mongoose.set("useUnifiedTopology", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(conf.mongoDb, {}, function (err) {
    if (err) {
        console.error("No se pudo conectar a MongoDB!");
        console.error(err.message);
        process.exit();
    }
    else {
        console.log("MongoDB conectado.");
    }
});
// Se configura e inicia express
const app = express.init(conf);
app.listen(conf.port, () => {
    console.log(`Mascotas escuchando en puerto ${conf.port}`);
});
module.exports = app;
//# sourceMappingURL=server.js.map