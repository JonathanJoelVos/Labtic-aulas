// Biblioteca que cria o servidor
import express from "express";
//Biblioteca que junta os dados da requisição que vem em partes
import bodyParser from "body-parser";
//Cliente que se conecta ao banco de dados (https://www.mongodb.com/docs/drivers/node/current/quick-start/download-and-install/#std-label-node-quick-start-download-and-install)
import { MongoClient } from "mongodb";
//Biblioteca que permite que o servidor seja acessado por outros servidores
import cors from "cors";

//Conexão com o banco de dados
const uri = "mongodb://localhost:27017";
const clientDoBanco = new MongoClient(uri);

//Conexão com o documento do banco de dados
const labticBanco = clientDoBanco.db("Labtic");

// Levantar o servidor
const servidor = express();

//usando as bibliotecas no nosso servidor
servidor.use(cors());
servidor.use(bodyParser.json());

//Rota para pegar as finanças
servidor.post("/financas", async (req, res) => {
  const valores = req.body;
  const senha = req.headers;
  if (senha.senha !== "labticehfoda123") {
    res.status(401).send("Acesso negado");
    return;
  }
  if (valores.valor <= 0) {
    res.status(400).send("Valor inválido");
    return;
  }
  const colecaoFinancas = labticBanco.collection("Financas");
  await colecaoFinancas.insertOne(valores);
  res.send(valores);
});

// Colocar o servidor para escutar na porta 3033
servidor.listen(3033, () => {
  console.log("Servidor iniciado na porta 3033.");
});
