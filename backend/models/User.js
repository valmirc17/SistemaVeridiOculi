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
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    telefone:{
        type: Number,
        required: true
    },
    dt_nasc:{
        type: Date,
        required: true
    },
    dt_val_licenca:{
        type: Date,
        required: true
    },
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}