"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarUsuario = exports.actualizarUsuario = exports.registerUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const getUsuarios = (req, res) => {
    res.json({
        msg: 'get Usuarios'
    });
};
exports.getUsuarios = getUsuarios;
const getUsuario = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'get Usuario'
    });
};
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