const { response, request } = require('express');


const bcryptsjs=require('bcryptjs');
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');


const usuariosGet = (req = request, res = response) => {

    const {a, b} = req.query;

    res.json({
        msg:' El nuevo metodo get funcionando desde el controlador nuevo',
        a,
        b,
        // variable
    })
}

const usuariosPost = async (req, res = response) => {

    //  En el caso de que solo quiera desestructurar google
    // const {google,...resto} = req.body;

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario ({nombre,correo,password,rol}) ;
    
    // Encriptar la contraseña.
    const salt = bcryptsjs.genSaltSync();
    usuario.password = bcryptsjs.hashSync( password, salt);

    // Guardar en BD.
    await usuario.save();

    res.json({
        msg:'metodo post funcionando desde el controlador',
        usuario
    })
}
const usuariosPut = async (req, res = response) => {

    const { id } = req.params;
    const { password, google,correo, ...resto} = req.body;

    if (password) {
        const salt = bcryptsjs.genSaltSync();
        resto.password = bcryptsjs.hashSync( password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate( id, resto);

    res.json({
        msg:'metodo put funcionando desde el controlador',
        id,
        resto
    })
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'metodo patch funcionando desde el controlador'
    })
}
const usuariosDelete = (req, res = response) => {
    res.json({
        msg:'metodo delete funcionando desde el controlador'
    })
}


module.exports = {
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosGet

}