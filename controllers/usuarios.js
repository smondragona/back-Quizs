const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');


const usuariosGet = async (req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    /* const usuarios = await Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite));
    
    const total = await Usuario.countDocuments(query);
 */
    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async (req, res = response) => {


    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    /* //Verificar si el correo existente
    const verificaCorreo = await Usuario.findOne({correo});
    if(verificaCorreo){
        return res.status(400).json({
            msg: 'Ese correo ya existe'
        });
    } */

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // número de vueltas de encriptación, por defectos este método de 10 vueltas
    usuario.password = bcryptjs.hashSync(password,salt);

    // guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
 
    const { id } = req.params;
    const {_id, password,google, correo, ...resto } = req.body;

    //Validar contra la BD,
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // número de vueltas de encriptación, por defectos este método de 10 vueltas
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        msg: 'put api - Controlador',
        usuario
    });
}

const usuariosDelete = async (req, res = response) => {
    const { id } = req.params;

    //Borrado Fisico
    //const usuario = await Usuario.findByIdAndDelete(id);

    //Eliminación Logica
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});
    //const usuarioAutentificado = req.usuario;

    res.json(usuario);
}

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch api - Controlador'
    });
}



module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch

}