/*
    rutas de usuario / Auth
    host + /api/auth
*/
const {Router} = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');

router.post(
    '/new',
    [//midelwares
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe contener 6 caracteres').isLength({min:6}),
        validarCampos
    ],
    crearUsuario 
);

router.post(
    '/',
    [//midelwares
        check('email','El email es obligatorio').isEmail(),
        check('password','El password debe contener 6 caracteres').isLength({min:6}),
        validarCampos
    ],
     loginUsuario 
);

router.get(
    '/renew', 
    [
        validarToken
    ],
    revalidarToken 
);

module.exports = router;