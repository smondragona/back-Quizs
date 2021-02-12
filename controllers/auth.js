const {response} = require('express');
const Usuario = require('../models/usuario');
const sbcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar.jwt');

const login = async (req, res) => {

    const {correo, password} = req.body;

    try {

        const usuario = await Usuario.findOne({correo});

        //Verificar si email existente    
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos -correo'
            });
        }

        //Si el usuario esta activo
        if(!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado:false'
            });
        }

        //Verificar la contraseña
        const validaPassword = sbcryptjs.compareSync(password, usuario.password)
        if(!validaPassword) {
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - password'
            });
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);


        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}



module.exports = {
    login
}