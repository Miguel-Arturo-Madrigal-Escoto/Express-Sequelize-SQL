"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db = new sequelize_1.Sequelize('node-ts', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: true
});
exports.default = db;
//# sourceMappingURL=connection.js.map