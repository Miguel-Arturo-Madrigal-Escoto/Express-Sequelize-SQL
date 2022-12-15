import { ValidationChain, body } from "express-validator";
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