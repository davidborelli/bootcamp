const express = require("express");

const server = express(); //Express exporta uma funcao, esse é o motivo dos parenteses
server.use(express.json()); //Ensinando Express ler json do body do POST

const USERS = ["David B.", "Erick", "David P."];

/* IMPORTANTE */
/* Middleware, interceptador de toda requisição, o next indica que após ele ser 
    executado, é para seguir o fluxo.
*/
server.use((req, res, next) => {
  console.time("Request");
  console.log(`Método ${req.method} | URL: ${req.url}`);

  next();

  console.timeEnd("Request"); //Continua executando após a rotina solicitada (next()) ser executada.
});

// Query Params = ?teste=1
// Route Params = /users/1
// Request body = { name: "David" }
//Utilizando QUERY params
server.get("/teste", (req, res) => {
  const nome = req.query.nome;
  return res.json({ message: `Hello ${nome}` });
});

server.get("/users", (req, res) => {
  return res.json(USERS);
});

// //Utilizando route PARAMS
// server.get("/users/:id", checkUserInArray, (req, res) => {
//   //Utilizando desestruturação do ES6
//   const { id } = req.params; //Quero pegar o id dentro de req.params
//   return res.json(USERS[id]);
//   // res.json({ message: `Buscando pelo id ${id}` });
// });

server.get("/users/:index", checkUserInArray, (req, res) => {
  return res.json(req.user); //Retornando dessa forma pq o middleware na preencheu o usuário
});

server.post("/users", checkUserExists, (req, res) => {
  const { name } = req.body;
  USERS.push(name);
  return res.json(USERS);
});

server.put("/users/:id", checkUserInArray, checkUserExists, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  USERS[id] = name;
  return res.json(USERS);
});

server.delete("/users/:id", checkUserInArray, (req, res) => {
  const { id } = req.params;
  USERS.splice(id, 1);

  return res.send();
});

function checkUserExists(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ message: "User name is required" });
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = USERS[req.params.index];

  if (!user) {
    return res.status(400).json({ message: "User does not exists" });
  }

  req.user = user; //Adicionando user em req. para quem o chama, ja poder utilizar o usuario, sem ter que
  //filtar o mesmo

  return next();
}

server.listen(3000);
