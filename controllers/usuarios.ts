import { Response, Request } from 'express';
import { QueryTypes, where } from 'sequelize';
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
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;
    const { body } = req;
    const { id: _id, ..._body } = body;

    try {

        const usuario = await Usuario.findByPk(id);
        
        if (body.password){
            if (!compareSync(body.password, usuario!.password)){
                return res.status(404).json({
                    ok: false,
                    msg: 'Contraseña incorrecta'
                });
            }
            
            //const user = await Usuario!.update(_body, { where: { id } });
            const { id, email, nombre } = await usuario!.update(_body);

            return res.status(201).json({
                ok: true,
                msg: 'Registro actualizado',
                usuario: { id, email, nombre }
            });
        }
        else {
            //const user = await Usuario!.update(_body, { where: { id } });
            const { id, email, nombre } = await usuario!.update(_body);
            return res.status(201).json({
                ok: true,
                msg: 'Registro actualizado',
                usuario: { id, email, nombre }
            });
        }

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const eliminarUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {

        const usuario = await Usuario.findByPk(id);

        // borrado físico
        //await usuario!.destroy();
        const { id: _id, email, nombre, estado } = await usuario!.update({ estado: false });

        return res.status(200).json({
            ok: true,
            msg: 'Registro eliminado',
            usuario: {
                id: _id, email, nombre, estado
            }
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const logIn = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({ where: { email } });


        if (compareSync(password, usuario!.password)){
            res.status(200).json({
                ok: true,
                usuario: {
                    id: usuario!.id,
                    nombre: usuario!.nombre,
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