const bcrypt = require('bcryptjs');
const {User: UserModel} = require("../models/User")

const userController ={
    create: async (req, res) => {
        try {
            const {
                nm_usuario,
                login,
                senha,
                cpf,
                email,
                telefone,
                dt_nasc,
                dt_val_licenca,
            } = req.body;

            const hashedPassword = await bcrypt.hash(senha, 10);

            const user = {
                nm_usuario,
                login,
                senha: hashedPassword,
                cpf,
                email,
                telefone,
                dt_nasc,
                dt_val_licenca,
            };

            const response = await UserModel.create(user);

            res.status(201).json({ response, msg: 'Usuário criado com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Erro ao criar usuário.' });
        }
    },

    getAll: async(req, res) =>{
        try{
            const users = await UserModel.find()
            res.json(users)
        } catch(error){
            console.log(error)
        }
    },

    get: async(req, res) =>{
        try{
            const id = req.params.id
            const user = await UserModel.findById(id)
            if(!user){
                res.status(404).json({msg: "Usuário não encontrado."})
                return
            }

            res.json(user)
        }catch(error){
            console.log(error)
        }
    },

    delete: async(req, res) =>{
        try{
            const id = req.params.id
            const user = await UserModel.findById(id)
            if(!user){
                res.status(404).json({msg: "Usuário não encontrado."})
                return
            }

            const deletedUser = await UserModel.findByIdAndDelete(id)
            res.status(200).json({deletedUser, msg: "Usuário deletado com sucesso!"})
        }catch(error){
            console.log(error)
        }
    },

    update: async (req, res) => {
        try {
            const id = req.params.id;

            // Busca o usuário existente
            const existingUser = await UserModel.findById(id);

            if (!existingUser) {
                res.status(404).json({ msg: 'Usuário não encontrado.' });
                return;
            }

            // Atualiza os campos desejados
            existingUser.nm_usuario = req.body.nm_usuario || existingUser.nm_usuario;
            existingUser.login = req.body.login || existingUser.login;
            existingUser.cpf = req.body.cpf || existingUser.cpf;
            existingUser.email = req.body.email || existingUser.email;
            existingUser.telefone = req.body.telefone || existingUser.telefone;
            existingUser.dt_nasc = req.body.dt_nasc || existingUser.dt_nasc;
            existingUser.dt_val_licenca = req.body.dt_val_licenca || existingUser.dt_val_licenca;

            // Se uma nova senha for fornecida, hash a nova senha
            if (req.body.senha) {
                const hashedPassword = await bcrypt.hash(req.body.senha, 10);
                existingUser.senha = hashedPassword;
            }

            // Salva as alterações
            const updatedUser = await existingUser.save();

            res.status(200).json({ updatedUser, msg: 'Usuário atualizado com sucesso!' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ msg: 'Erro durante a atualização do usuário.' });
        }
    },

    login: async (req, res) => {
        try {
            const { login, senha } = req.body;

            const user = await UserModel.findOne({ login });

            if (!user) {
                res.status(401).json({ msg: 'Usuário não encontrado.' });
                return;
            }

            const passwordMatch = await bcrypt.compare(senha.trim(), user.senha.trim());
            console.log('Senha fornecida:', senha);
            console.log('Senha armazenada no banco:', user.senha);
            console.log('Comparação de senhas:', passwordMatch);
            if (!passwordMatch) {
                res.status(401).json({ msg: 'Senha incorreta.' });
                return;
            }

            res.status(200).json({ user, msg: 'Login bem-sucedido!' });
        } catch (error) {
            console.error('Erro durante o login:', error);
            res.status(500).json({ msg: 'Erro durante o login. Por favor, tente novamente.' });
        }
    },
};

module.exports = userController;