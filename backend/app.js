const express = require("express")
const cors = require("cors")
const app = express()

app.use(cors())

app.use(express.json())

// Conexão com o banco de dados
const conn = require("./db/conn")

conn();

// Routes
const routes = require("./routes/router")

app.use("/api", routes)

app.listen(3000, function(){
    console.log("Servidor iniciado com sucesso!")
})

// O3HDxV9VB0WX29IS