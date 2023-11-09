const mongoose = require("mongoose")

const {Schema} = mongoose;

const userSchema = new Schema({
    nm_usuario: {
        type: String,
        required: true
    },
    login:{
        type: String,
        required: true
    },
    senha:{
        type: String,
        required: true
    },
    cpf:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    telefone:{
        type: String,
        required: true
    },
    dt_nasc:{
        type: String,
        required: true
    },
    dt_val_licenca:{
        type: String,
        required: true
    },
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}