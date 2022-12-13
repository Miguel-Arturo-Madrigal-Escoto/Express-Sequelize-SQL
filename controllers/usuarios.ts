import { Response, Request } from 'express';
import bcrypt from 'bcryptjs';
import { QueryTypes } from 'sequelize';
import Usuario from '../models/usuario';
import db from '../database/connection';


const getUsuarios = async (req: Request, res: Response) => {
    
    const usuarios = await Usuario.findAll({ attributes: { exclude: ['password'] }, where: {
        estado: true
    } });
    /*const usuarios = await db.query('SELECT * FROM usuarios', {
        type: QueryTypes.SELECT
    });*/

    
    res.json({
        usuarios
    });
}

const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {
        attributes: ['id','nombre','email']
    });
    /*const usuario = await db.query('SELECT id, nombre, email FROM usuarios WHERE id = :id',{
        //replacements: [id],
        replacements: {
            id
        },
        type: QueryTypes.SELECT,
    })*/


    if (!usuario){
        return res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }

    res.json({
        usuario
    });
}


const registerUsuario = (req: Request, res: Response) => {

    const { body } = req;

    res.json({
        msg: 'register Usuario',
        body
    })
}

const actualizarUsuario = (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;

    res.json({
        msg: 'actualizar Usuario',
        id,
        body
    })
}

const eliminarUsuario = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'borrar Usuario',
        id,
    })
}


export {
    getUsuarios,
    getUsuario,
    registerUsuario,
    actualizarUsuario,
    eliminarUsuario
}