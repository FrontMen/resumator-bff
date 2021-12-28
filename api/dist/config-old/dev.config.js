"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devConfig = void 0;
const dotenv = require("dotenv");
dotenv.config();
exports.devConfig = {
    database: {
        mongo: {
            username: process.env.MONGO_USER,
            password: process.env.MONGO_PASSWORD,
            uri: process.env.MONGO_URL,
            database: process.env.MONGO_DB,
        },
    },
    app: {
        port: process.env.PORT,
        host: process.env.HOST,
    },
};
//# sourceMappingURL=dev.config.js.map