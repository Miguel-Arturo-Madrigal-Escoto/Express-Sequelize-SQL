import { Router } from 'express';
import { actualizarUsuario, eliminarUsuario, getUsuario, getUsuarios, logIn, registerUsuario } from '../controllers/usuarios';
import { validateRegistroUsuario } from '../helpers/validators';
import { validateData } from '../middlewares/validateData';

const router = Router();


router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', validateRegistroUsuario,validateData ,registerUsuario);
router.post('/login', logIn);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);



export default router;