/*
    rutas events
    host + /api/events
*/

const {Router} = require('express');
const { check } = require('express-validator');

const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarToken } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();
router.use(validarToken);


//todas as rutas validadas
//obtener eventos
router.get('/', getEventos);

//crear un nuevo evento
router.post(
    '/', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha inicio es obligatoria').custom(isDate),
        check('end','Fecha fin es obligatoria').custom(isDate),
        validarCampos
    ],
    crearEvento
);

//actualizar un nuevo evento
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','La fecha inicio es obligatoria').custom(isDate),
        check('end','Fecha fin es obligatoria').custom(isDate),
        validarCampos
    ]
, actualizarEvento);

//borrar un nuevo evento
router.delete('/:id',validarCampos, eliminarEvento);

module.exports = router;
