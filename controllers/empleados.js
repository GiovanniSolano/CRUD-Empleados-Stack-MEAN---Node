const { response } = require('express');
// const bcryptjs = require('bcryptjs');
const Empleado = require('../models/empleado');

const getEmpleados = async(req, res = response) => {
    try {
        const empleados = await Empleado.find();

        res.json({
            ok: true,
            empleados
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}


const getEmpleadoByID = async(req, res = response) => {

    const uid = req.params.id;


    try {
        const empleado = await Empleado.findById(uid);


        if (!empleado) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un empleado con ese id'
            });
        }

        res.json({
            ok: true,
            empleado
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }
}

const addEmpleado = async(req, res = response) => {


    const { correo, telefono } = req.body;

    try {

        const existeCorreo = await Empleado.findOne({ correo });
        const existeTelefono = await Empleado.findOne({ telefono });




        if (existeCorreo) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un empleado con ese correo'
            });
        }
        if (existeTelefono) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un empleado con ese teléfono'
            });
        }

        const empleado = new Empleado(req.body);

        await empleado.save();


        res.json({
            ok: true,
            empleado
        });



    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear usuario, revisar logs'
        });
    }

}

const updateEmpleado = async(req, res = response) => {

    const id = req.params.id;
    const { correo, telefono } = req.body;


    try {

        const empleadoBD = await Empleado.findById(id);

        if (!empleadoBD) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un empleado con ese id'
            });
        }

        // Actualización
        if (empleadoBD.correo !== correo) {
            const existeCorreo = await Empleado.findOne({ correo });
            if (existeCorreo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un empleado con ese correo'
                });
            }
        }



        if (empleadoBD.telefono !== telefono) {
            const existeTelefono = await Empleado.findOne({ telefono });
            if (existeTelefono) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un empleado con ese teléfono'
                });
            }
        }

        const empleadoActualizado = await Empleado.findByIdAndUpdate(id, req.body, { new: true });


        res.json({
            ok: true,
            empleado: empleadoActualizado
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar empleado'
        });

    }



}

const deleteEmpleado = async(req, res = response) => {


    const id = req.params.id;

    try {
        const empleadoBD = await Empleado.findById(id);

        if (!empleadoBD) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un empleado con ese id'
            });
        }

        await Empleado.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Empleado eliminado'
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar usuario'
        });

    }




}


module.exports = {
    getEmpleados,
    addEmpleado,
    deleteEmpleado,
    updateEmpleado,
    getEmpleadoByID
}