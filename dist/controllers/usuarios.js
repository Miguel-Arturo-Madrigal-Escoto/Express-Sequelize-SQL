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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logIn = exports.eliminarUsuario = exports.actualizarUsuario = exports.registerUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcryptjs_1 = require("bcryptjs");
const getUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll({ attributes: { exclude: ['password', 'estado', 'createdAt', 'updatedAt'] }, where: {
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
    const usuario = yield usuario_1.default.findByPk(id, { attributes: ['id', 'nombre', 'email'] });
    /*const usuario = await db.query('SELECT id, nombre, email FROM usuarios WHERE id = :id',{
        //replacements: [id] -> ?,
        replacements: {
            id -> :id
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
const registerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const usuario = usuario_1.default.build(body);
        //usuario.password = 'xd'
        const { nombre, id, email } = yield usuario.save();
        // same as
        // const usuario = await Usuario.create(body);
        res.json({
            ok: true,
            usuario: {
                id, nombre, email
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.registerUsuario = registerUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    const { id: _id } = body, _body = __rest(body, ["id"]);
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (body.password) {
            if (!(0, bcryptjs_1.compareSync)(body.password, usuario.password)) {
                return res.status(404).json({
                    ok: false,
                    msg: 'Contraseña incorrecta'
                });
            }
            //const user = await Usuario!.update(_body, { where: { id } });
            const { id, email, nombre } = yield usuario.update(_body);
            return res.status(201).json({
                ok: true,
                msg: 'Registro actualizado',
                usuario: { id, email, nombre }
            });
        }
        else {
            //const user = await Usuario!.update(_body, { where: { id } });
            const { id, email, nombre } = yield usuario.update(_body);
            return res.status(201).json({
                ok: true,
                msg: 'Registro actualizado',
                usuario: { id, email, nombre }
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const eliminarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        // borrado físico
        //await usuario!.destroy();
        const { id: _id, email, nombre, estado } = yield usuario.update({ estado: false });
        return res.status(200).json({
            ok: true,
            msg: 'Registro eliminado',
            usuario: {
                id: _id, email, nombre, estado
            }
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.eliminarUsuario = eliminarUsuario;
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const usuario = yield usuario_1.default.findOne({ where: { email } });
        if ((0, bcryptjs_1.compareSync)(password, usuario.password)) {
            res.status(200).json({
                ok: true,
                usuario: {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email
                }
            });
        }
        else {
            res.status(404).json({
                ok: false,
                msg: 'Email y/o password invalidos'
            });
        }
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
});
exports.logIn = logIn;
//# sourceMappingURL=usuarios.js.map