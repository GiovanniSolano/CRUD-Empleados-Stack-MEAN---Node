/*
    Ruta: /api/empleados
*/

const { Router } = require('express');
const router = Router();
const { getEmpleadoByID, getEmpleados, addEmpleado, deleteEmpleado, updateEmpleado } = require('../controllers/empleados');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');


router.get('/', getEmpleados);
router.get('/:id', [
    check('id', 'El id del empleado no es válido').isMongoId(),
    validarCampos
], getEmpleadoByID);

router.post('/', [
    check('nombreCompleto', 'El nombre es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('fechaIngreso', 'La fecha de ingreso es obligatoria').not().isEmpty(),
    check('estadoCivil', 'El estado civil es obligatorio').not().isEmpty(),
    check('sexo', 'El sexo es obligatorio').not().isEmpty(),
    validarCampos
], addEmpleado);

router.put('/:id', [
    check('nombreCompleto', 'El nombre es obligatorio').not().isEmpty(),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    check('fechaIngreso', 'La fecha de ingreso es obligatoria').not().isEmpty(),
    check('estadoCivil', 'El estado civil es obligatorio').not().isEmpty(),
    check('sexo', 'El sexo es obligatorio').not().isEmpty(),
    check('id', 'El id del empleado no es válido').isMongoId(),
    validarCampos
], updateEmpleado);

router.delete('/:id', [
    check('id', 'El id del empleado no es válido').isMongoId(),
    validarCampos
], deleteEmpleado);


module.exports = router;