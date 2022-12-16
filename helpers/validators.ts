import { ValidationChain, body, param } from "express-validator";
import Usuario from "../models/usuario";


export const validateRegistroUsuario: ValidationChain[] = [
    body('nombre', 'El nombre es requerido').notEmpty(),
    body('email', 'Email invalido').isEmail()
    .custom(async (email: string) => {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario) throw new Error('Ya existe un usuario con ese email');
        return true;
    }),
    body('password', 'Contraseña requerida').not().isEmpty()
]

export const validateLogInUsuario: ValidationChain[] = [
    body('email', 'Email invalido').isEmail()
    .custom(async (email: string) => {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) throw new Error('Email y/o password invalidos');
        return true;
    }),
    body('password', 'Contraseña requerida').not().isEmpty()
]

export const validateUpdateUsuario: ValidationChain[] = [
    param('id', 'Id invalido/no proporcionado').notEmpty(),
    param('id', 'Id invalido/no proporcionado').isNumeric()
    .custom(async (id: number) => {
        const usuario = await Usuario.findByPk(Number(id));
        if (!usuario) throw new Error('Usuario inexistente');
        return true;    
    }),
    body('email', 'Email invalido').isEmail()
    .custom(async (email: string) => {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario) throw new Error('Correo en uso');
        return true;
    }),
]

export const validateDeleteUsuario: ValidationChain[] = [
    param('id', 'Id invalido/no proporcionado').notEmpty(),
    param('id', 'Id invalido/no proporcionado').isNumeric()
    .custom(async (id: number) => {
        const usuario = await Usuario.findByPk(Number(id));
        if (!usuario) throw new Error('Usuario inexistente');
        return true;    
    }),
]