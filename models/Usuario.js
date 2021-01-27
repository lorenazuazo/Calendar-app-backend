const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type: String,
        rquiere: true
    },
    email:{
        type: String,
        rquiere: true,
        unique: true
    },
    password:{
        type: String,
        rquiere: true
    }
});

module.exports = model('Usuario', UsuarioSchema);