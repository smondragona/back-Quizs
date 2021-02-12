const { response } = require("express");



const esAdminRol = ( req, res= response, next ) => {

    if ( !req.usuario) {
        return res.status(500).json({
           msg: "Se requiere válidar el rol SIN validar primero el token promero" 
        });
    }

    const { role, nombre } = req.usuario;

    if (role!== 'ADMIN_ROLE') {
        return res.status(401).json({ 
            msg: `${nombre} no es administrador -No puede hacer esto`
        });
    }

    next();
}


const tieneRol = ( ...roles ) => {

    return ( req, res= response, next ) =>{

        if ( !req.usuario) {
            return res.status(500).json({
               msg: "Se requiere válidar el rol SIN validar primero el token promero" 
            });
        }

        console.log(req.usuario.role)
        if ( !roles.includes( req.usuario.role ) ){
            return res.status(401).json({
                msg: ` El Servicio requiere uno de estos roles ${roles}`
            });
        }

        next();
    }
}


module.exports = {
    esAdminRol,
    tieneRol
}