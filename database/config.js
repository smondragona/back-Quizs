const mongoose =  require('mongoose');


const dbConnection = async() => {

    try {
        
    await mongoose.connect( process.env.MONGODB_CNN,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

    console.log('Base de DAtos ONLINE');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD')
    }
}


module.exports = {
    dbConnection
}