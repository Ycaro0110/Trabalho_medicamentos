import express from "express";
import cors from "cors";
import { executeQuery } from "./config/database.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Testando a rota para saber si la ruta está funcionando
app.get("/", (req, res) => {
  res.send("API de medicamentos no ar!");
});

// Com la ejecución del select va retornar los registros que estaan en el banco de datos
app.get("/medicamentos", (req, res) => {
  const sql = "SELECT * FROM MEDICAMENTOS ORDER BY ID";
  executeQuery(sql, [], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(result);
  });
});

// Va a hacer a busca del medicamento por ID 
app.get("/medicamentos/:id", (req, res) => {
  const sql = "SELECT * FROM MEDICAMENTOS WHERE ID = ?";
  executeQuery(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0) {
      res.status(404).json({ erro: " O medicamento não foi encontrado" }); //Mensaje se não encontra o código
    } else {
      res.status(200).json(result[0]);
    }
  });
});

// Inserindo os medicamentos 
app.post("/medicamentos", (req, res) => {
  const { id, nome, nome_comercial, dose } = req.body;

  if (!id || !nome || !nome_comercial || !dose) {
    return res.status(400).json({ erro: "Precisa preencher todos os campos" });
  }

  const sql = "INSERT INTO MEDICAMENTOS (ID, NOME, NOME_COMERCIAL, DOSE) VALUES (?, ?, ?, ?)"; //populando o banco
  executeQuery(sql, [id, nome, nome_comercial, dose], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(201).send("OK");
  });
});

// Atualizando o medicamento
app.put("/medicamentos/:id", (req, res) => {
  const { nome, nome_comercial, dose } = req.body;
  const id = req.params.id;

  const sql = "UPDATE MEDICAMENTOS SET NOME = ?, NOME_COMERCIAL = ?, DOSE = ? WHERE ID = ?"; //Fazendo a atualização no banco
  executeQuery(sql, [nome, nome_comercial, dose, id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).send("OK");
  });
});

// Excluindo medicamento
app.delete("/medicamentos/:id", (req, res) => {
  const sql = "DELETE FROM MEDICAMENTOS WHERE ID = ?"; //Excluindo do banco
  executeQuery(sql, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    res.status(200).send("OK");
  });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

