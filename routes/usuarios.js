
const { Router } = require('express');
const { check } = require('express-validator');

// const { validarCampos }= require('../middlewares/validar-campos');
// const { validarJWT }= require('../middlewares/validar-jwt');
// const { esAdminRole,
//         tieneRole } = require('../middlewares/validar-roles');

const {validarCampos,
        validarJWT,
        esAdminRole,
        tieneRole
    } = require( '../middlewares');
const router = Router();

const { esRolValido, 
    emailExiste, 
    existeUsuarioPorId } = require('../helpers/dbvalidators');

const { usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosPatch, 
    usuariosDelete } = require('../controllers/usuarios');




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

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROL','VENTAS_ROL'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos    
], usuariosDelete );
    

module.exports = router;