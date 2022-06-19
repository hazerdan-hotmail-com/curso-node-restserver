const { response } = require("express");
// const { require } = require("express");
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async ( req, res = response)  => {

    const { correo, password } = req.body;

    try {

        // Verificar si el usuario exste.
        const usuario = await Usuario.findOne({correo});
        if (!usuario ) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            });
        }
        // Verificar si el usuario está activo

        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - status'
            });

        }

        // Verificar la contraseña.
        const validPasword = bcryptjs.compareSync( password, usuario.password);
        if (!validPasword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }
        console.log(usuario.id)
        // Generar el JWT
        const token = await generarJWT( usuario._id);
        res.json({
            usuario,
            token
        })

    } catch (error){
        console.log(error)
        res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }


}


module.exports = {
    login
}
