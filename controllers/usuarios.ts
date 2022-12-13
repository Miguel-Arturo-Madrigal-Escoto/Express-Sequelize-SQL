import { Response, Request } from "express"

const getUsuarios = (req: Request, res: Response) => {
    res.json({
        msg: 'get Usuarios'
    })
}

const getUsuario = (req: Request, res: Response) => {

    const { id } = req.params;

    res.json({
        msg: 'get Usuario'
    })
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