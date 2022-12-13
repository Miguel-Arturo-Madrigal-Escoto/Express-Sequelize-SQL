import { Router } from 'express';
import { actualizarUsuario, eliminarUsuario, getUsuario, getUsuarios, registerUsuario } from '../controllers/usuarios';

const router = Router();


router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', registerUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);



export default router;