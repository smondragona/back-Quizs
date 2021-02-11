const {Schema,model} = require('mongoose');
//const uniqueValidator = require('mongoose-unique-validator'); 

//let Schema = mongoose.Schema;

/* let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
}  */


const usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario' ]
    },
    correo: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'] 
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.methods.toJSON = function (){

    const { __v, password, ...usuario } = this.toObject();
    return usuario

}

 /*  //Quitear el paswword de la respuesta 
  usuarioSchema.method.toJSON = function (){
    let user = this;
    let userObjetc = user.toObject();
    delete userObjetc.password;

    return userObjetc;
}

//para validadores unicos
usuarioSchema.plugin( uniqueValidator, {message: '{PATH} debe de ser unico'}) */
module.exports = model( 'Usuario', usuarioSchema);
//module.exports = mongoose.model( 'Usuario', usuarioSchema);