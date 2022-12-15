"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarios_1 = require("../controllers/usuarios");
const validators_1 = require("../helpers/validators");
const validateData_1 = require("../middlewares/validateData");
const router = (0, express_1.Router)();
router.get('/', usuarios_1.getUsuarios);
router.get('/:id', usuarios_1.getUsuario);
router.post('/', validators_1.validateRegistroUsuario, validateData_1.validateData, usuarios_1.registerUsuario);
router.post('/login', usuarios_1.logIn);
router.put('/:id', usuarios_1.actualizarUsuario);
router.delete('/:id', usuarios_1.eliminarUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map