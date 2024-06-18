const mongoose = require("mongoose")

async function main() {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb+srv://valmir:hzWSZiZdvoJ3tk7W@veridioculi.qqcq3.mongodb.net/veridioculi")
        console.log("Conexão com o BD realizada com sucesso!")
    } catch (error) {
        console.log(`Erro:${error}`)
    }
}

module.exports = main

//hzWSZiZdvoJ3tk7W