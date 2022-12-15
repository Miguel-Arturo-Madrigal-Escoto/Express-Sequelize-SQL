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
exports.validateRegistroUsuario = void 0;
const express_validator_1 = require("express-validator");
const usuario_1 = __importDefault(require("../models/usuario"));
exports.validateRegistroUsuario = [
    (0, express_validator_1.body)('nombre', 'El nombre es requerido').notEmpty(),
    (0, express_validator_1.body)('email', 'Email invalido').isEmail()
        .custom((email) => __awaiter(void 0, void 0, void 0, function* () {
        const usuario = yield usuario_1.default.findOne({ where: { email } });
        if (usuario)
            throw new Error('Ya existe un usuario con ese email');
        return true;
    })),
    (0, express_validator_1.body)('password', 'Contraseña requerida').not().isEmpty()
];
//# sourceMappingURL=validators.js.map