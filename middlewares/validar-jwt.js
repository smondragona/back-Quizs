const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = async (req = request , res = response, next) => {

    const token = req.header('x-token');

    if(!token){
        return res.status(400).json({
            msg:'No hay token en le petición'
        });
    }

    try {
        
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        
        req.uid = uid;
        // Usuario que corresponde al uid
        const usuario = await Usuario.findById(uid);

        //Verificar si el existe en la BD
        if(!usuario){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en la BD'
            });
        }

        //Verificar si el uid tiene estado true
        if (!usuario.estado){
            return res.status(401).json({
                msg: 'Token no válido - Usuario estado:false'
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }

    console.log(token);

    

}

module.exports = {
    validarJWT
}