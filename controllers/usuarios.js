const { response, request } = require('express');


const bcryptsjs=require('bcryptjs');
const Usuario = require('../models/usuario');
const usuario = require('../models/usuario');


const usuariosGet = async (req = request, res = response) => {

    // const {a, b} = req.query;
    const { limite = 5, desde = 0 } = req.query;

    const query = { estado: true };
    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(number(lijmite));

    // const total = await Usuario.count(query)

    const [ total, usuarios ] = await Promise.all([
        Usuario.count( query ),
        Usuario.find( query )
            .skip( Number(desde ))
            .limit(Number(limite))        
    ]);

    res.json({
        total,
        usuarios
    });
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

    res.json(usuario)
}
const usuariosPatch = (req, res = response) => {
    res.json({
        msg:'metodo patch funcionando desde el controlador'
    })
}
const usuariosDelete = async (req, res = response) => {

    const{ id } = req.params;

    // Borrado físico
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Borrado lógico
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false});
    const usuarioAutenticado = req.usuario;
    // console.log(usuarioAutenticado)

    res.json({usuario,usuarioAutenticado});
}


module.exports = {
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
    usuariosGet

}