const { response, request } = require('express');


const usuariosGet = (req = request, res = response) => {

    const {a, b} = req.query;

    res.json({
        msg:'metodo get funcionando desde el controlador',
        a,
        b
    })
}

const usuariosPost = (req, res = response) => {

    const {nombre, edad }= req.body;

    res.json({
        msg:'metodo post funcionando desde el controlador',
        nombre,
        edad
    })
}
const usuariosPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        msg:'metodo put funcionando desde el controlador',
        id
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