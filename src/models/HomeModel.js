const mongoose = require('mongoose');

//CRIA ESQUEMA
const HomeSchema = new mongoose.Schema({

});

//DEFINE O MODELO
const HomeModel = mongoose.model('Home', HomeSchema);
module.exports = HomeModel;