"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const bcryptjs_1 = require("bcryptjs");
const connection_1 = __importDefault(require("../database/connection"));
class Usuario extends sequelize_1.Model {
}
Usuario.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        set(psw) {
            this.setDataValue('password', (0, bcryptjs_1.hashSync)(psw, (0, bcryptjs_1.genSaltSync)()));
        },
    },
    estado: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    }
}, {
    modelName: 'usuario',
    sequelize: connection_1.default // conexion
});
exports.default = Usuario;
//# sourceMappingURL=usuario.js.map