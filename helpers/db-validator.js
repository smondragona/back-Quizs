const role = require('../models/role');
const Usuario = require('../models/usuario');


const esRolValido = async (rol = '') =>{
    const rolExiste = await role.findOne({rol});
    if(!rolExiste){
        throw new Error(`El rol ${rol} no está registradop en la BD.`)
    }
}

const existeEmail = async (correo = '') => {
    //Verificar si el correo existente
    const verificaCorreo = await Usuario.findOne({correo});
    if(verificaCorreo){
        throw new Error(`El correo ${correo} ya existe.`)
    }
}

const existeUsuarioPorID = async (id) => {
    //Verificar si el ID usuario existente
    const verificaExisteUsuario = await Usuario.findById(id);
    if(!verificaExisteUsuario){
        throw new Error(`El ID no existe ${id} .`)
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorID
}