
const { Router } = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/dbvalidators');
const { validarCampos }= require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet );

router.post('/', [
    check('nombre', 'El nombre no es válido').not().isEmpty(),
    check('password', 'El password no es válido').isLength( {min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    // check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom( (rol) => esRolValido(rol) ), MODO COMPLETO
    check('rol').custom( esRolValido ),
    check('correo').custom( emailExiste ),
    validarCampos

], usuariosPost );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut );

router.patch('/', usuariosPatch );
router.delete('/', usuariosDelete );
    check('correo', 'El correo no es válido').isEmail(),

module.exports = router;