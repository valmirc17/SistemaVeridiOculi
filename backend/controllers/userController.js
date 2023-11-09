const {User: UserModel} = require("../models/User")

const userController ={
    create: async(req, res) => {
        try{
            const user ={
                nm_usuario: req.body.nm_usuario,
                login: req.body.login,
                senha: req.body.senha,
                cpf: req.body.cpf,
                email: req.body.email,
                telefone: req.body.telefone,
                dt_nasc: req.body.dt_nasc,
                dt_val_licenca: req.body.dt_val_licenca,
            }
            const response = await UserModel.create(user);

            res.status(201).json({response, msg: "Usuário criado com sucesso!"})

        }catch(error){
            console.log(error)
        }
    }
}

module.exports = userController;