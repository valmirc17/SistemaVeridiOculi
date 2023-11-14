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

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get("/",function(req,res){
    res.render("index")
})

app.get("/home",function(req,res){
    res.render("home")
})

app.get("/analise",function(req,res){
    res.render("analise")
})

app.listen(3000, function(){
    console.log("Servidor iniciado com sucesso!")
})
