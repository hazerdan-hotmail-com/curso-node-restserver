const { response, request } = require('express');


const esAdminRole = (req = request, res = response, next) => {

    if( !req.usuario ){
        return res.status(500).json({
            msg:'Se quiere validar el rol sin validar token primero'
        });


    }
    // console.log(req.usuario)

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No tiene permisos suficientes`
        });

    }


    next();
}

    const tieneRole = (...roles) =>{
        return (req = request, res = response, next) => {
            console.log(roles,req.usuario.rol)
            if( !req.usuario ){
                return res.status(500).json({
                    msg:'Se quiere validar el rol sin validar token primero'
                });
            }

            if (!roles.includes( req.usuario.rol ) ) {
                return res.status(401).json({
                    msg:`Se requiere uno de los siguientes roles ${roles}`
                });
                
            }
            next();
        }


    }


module.exports = {
    esAdminRole,
    tieneRole
}