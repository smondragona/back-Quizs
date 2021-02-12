const { Router } = require('express');
const { check } = require('express-validator');

const { esRolValido, existeEmail, existeUsuarioPorID } = require('../helpers/db-validator');


/* const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { esAdminRol, tieneRol } = require('../middlewares/validar-roles'); */
const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol

} = require('../middlewares');


const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');





const router = Router();

router.get('/', usuariosGet );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener más de 6 letras').isLength({min:6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(existeEmail ),
   // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
   check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost );

router.put('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut  );

router.delete('/:id',[
    validarJWT,
    //esAdminRol,
    tieneRol('TEMP_ROLE','USER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos
],  usuariosDelete );

router.patch('/', usuariosPatch );



module.exports = router;