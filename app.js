const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o banco de dados
const conn = require("./db/conn");
conn();

// Rotas
const routes = require("./routes/router");
app.use("/api", routes);

app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/home", (req, res) => {
    res.render("home");
});

app.get("/analise", (req, res) => {
    res.render("analise");
});

app.get("/login-old", function (req, res) {
    res.render("login_old");
});

app.get("/login", function (req, res) {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

app.get("/galeria", async (req, res) => {
    try {
        const response = await fetch('http://localhost:5000/galeria');
        const imagens = await response.json();
        res.render("galeria", { imagens });
    } catch (error) {
        console.error('Erro ao obter a galeria:', error);
        res.status(500).send('Erro ao obter a galeria');
    }
});

app.listen(3000, () => {
    console.log("Servidor iniciado com sucesso!");
});
