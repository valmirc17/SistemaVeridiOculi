const mongoose = require("mongoose")

async function main() {
    try {
        mongoose.set("strictQuery", true);
        await mongoose.connect("mongodb+srv://valmir:8gZrtgzIBu67QweI@veridioculi.qqcq3.mongodb.net/")
        console.log("Conexão com o BD realizada com sucesso!")
    } catch (error) {
        console.log(`Erro:${error}`)
    }
}

module.exports = main