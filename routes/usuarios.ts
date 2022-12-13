import { Router } from 'express';
import { actualizarUsuario, eliminarUsuario, getUsuario, getUsuarios, logIn, registerUsuario } from '../controllers/usuarios';

const router = Router();


router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', registerUsuario);
router.post('/login', logIn);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);



export default router;