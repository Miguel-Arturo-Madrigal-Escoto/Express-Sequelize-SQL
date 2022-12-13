import { Response, Request } from 'express';
import { QueryTypes } from 'sequelize';
import Usuario from '../models/usuario';
import { compareSync } from 'bcryptjs';


const getUsuarios = async (req: Request, res: Response) => {
    
    const usuarios = await Usuario.findAll({ attributes: { exclude: ['password','estado','createdAt', 'updatedAt'] }, where: {
        estado: true
    }});
    /*const usuarios = await db.query('SELECT * FROM usuarios', {
        type: QueryTypes.SELECT
    });*/
   
    res.json({
        usuarios
    });
}

const getUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const usuario = await Usuario.findByPk(id, {  attributes: ['id', 'nombre', 'email'] })
    /*const usuario = await db.query('SELECT id, nombre, email FROM usuarios WHERE id = :id',{
        //replacements: [id] -> ?,
        replacements: {
            id -> :id
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


const registerUsuario = async (req: Request, res: Response) => {

    const { body } = req;
    

    try {
        
        const usuario = Usuario.build(body)
        //usuario.password = 'xd'
        const { nombre, id, email } = await usuario.save()
        
        // same as
        // const usuario = await Usuario.create(body);
        res.json({
            ok: true,
            usuario: {
                id, nombre, email
            }
        });
        

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
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

const logIn = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ where: { email } });

        if (!usuario){
            res.status(404).json({
                ok: false,
                msg: 'Email y/o password invalidos'
            })
        }
        else {
            if (compareSync(password, usuario.password)){
                res.status(200).json({
                    ok: true,
                    usuario: {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        email
                    }
                })
            }
            else {
                res.status(404).json({
                    ok: false,
                    msg: 'Email y/o password invalidos'
                })
            }
        }

             
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


export {
    getUsuarios,
    getUsuario,
    registerUsuario,
    actualizarUsuario,
    eliminarUsuario,
    logIn
}