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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.registerUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({ attributes: { exclude: ['password'] }, where: {
            estado: true
        } });
    /*const usuarios = await db.query('SELECT * FROM usuarios', {
        type: QueryTypes.SELECT
    });*/
    res.json({
        usuarios
    });
});
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id, {
        attributes: ['id', 'nombre', 'email']
    });
    /*const usuario = await db.query('SELECT id, nombre, email FROM usuarios WHERE id = :id',{
        //replacements: [id],
        replacements: {
            id
        },
        type: QueryTypes.SELECT,
    })*/
    if (!usuario) {
        return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }
    res.json({
        usuario
    });
});
exports.getUsuario = getUsuario;
const registerUsuario = (req, res) => {
    const { body } = req;
    res.json({
        msg: 'register Usuario',
        body
    });
};
exports.registerUsuario = registerUsuario;
const actualizarUsuario = (req, res) => {
    const { id } = req.params;
    const { body } = req;
    res.json({
        msg: 'actualizar Usuario',
        id,
        body
    });
};
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'borrar Usuario',
        id,
    });
};
exports.eliminarUsuario = eliminarUsuario;
//# sourceMappingURL=usuarios.js.map