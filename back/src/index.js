import express from "express";
import cors from "cors";
import { executeQuery /*, dbOptions*/ } from "./config/database.js";
const app = express();


app.use(express.json({ limit: "50mb" }));

app.use(cors());

//requisições

app.get("/", function (req, res) {
  res.send("OK");
});

app.get("/medicamentos/:id", function (req, res) {
  console.log("Pesquisando pelo id: " + req.params.id);
  executeQuery(
    "SELECT * FROM MEDICAMENTOS WHERE ID=?",
    [req.params.id],
    (err, result) => {
      if (err) res.json(err);
      res.json(result);
    }
  );
});

app.get("/medicamentos", function (req, res) {
  console.log("Listando Medicamentos");

  

  let filtro = [];
  let sql = "SELECT * FROM MEDICAMENTOS WHERE ID > 0";

  if (req.query.nome) {
    sql += "and nome like ?";
    filtro.push("%" + req.query.descricao + "%");
  }

  if (req.query.nomeComercial) {
    sql += "and nomeComercial >= ?";
    filtro.push(req.query.valor);
    console.log(req.query.valor);
  }

  executeQuery(sql, filtro, function (err, result) {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(result);
    }
  });
});

app.post("/medicamentos", function (req, res) {
  console.log(req.body);
  let sql =
    "INSERT INTO MEDICAMENTOS(DESCRICAO, VALOR, IMAGEM) VALUES (?, ?, ?) RETURNING ID";

  if (!req.body.id) {
    executeQuery(
      sql,
      [req.body.nome, req.body.nomeComercial, req.body.dose],
      function (err, result) {
        if (err) {
          return res.status(500).json(err);
        } else {
          return res.status(201).send("ok"); //json(result);
        }
      }
    );
  } else {
    sql = "UPDATE MEDICAMENTOS SET NOME=?, nomeComercial=?, dose=? WHERE ID=?";
    executeQuery(
      sql,
      [req.body.nome, req.body.nomeComercial, req.body.dose, req.body.id],
      function (err, result) {
        if (err) {
          return res.status(500).json(err);
        } else {
          return res.status(201).send("ok"); //json(result);
        }
      }
    );
  }
});

app.delete("/medicamentos/:id", function (req, res) {
  console.log("Excluindo medicamento: " + req.params.id);
  let sql = "DELETE FROM MEDICAMENTOS WHERE ID=?";
  executeQuery(sql, [req.params.id], function (err, result) {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).send("ok");
    }
  });
});

//inicio do servidor
let port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log("Servidor no ar... na porta : " + port);
});
