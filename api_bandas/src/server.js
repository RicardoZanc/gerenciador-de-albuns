const express = require("express");
const app = express();
const cors = require("cors");
const { pool } = require("./config");

app.use(cors());
app.use(express.json());

const PORT = 3333;

// Consulta todas as bandas
app.get("/banda", (req, res) => {
  pool.query("SELECT * FROM banda", (err, result) => {
    if (err) {
      res.status(400).send(err);
    }
    res.status(200).json(result.rows);
  });
});

// Consulta todos os albums
app.get("/album", (req, res) => {
  pool.query(
    `
    SELECT a.id_album, a.nome_album, a.data_lanc_album, a.id_banda, b.nome_banda
    FROM album a
    INNER JOIN banda b
    ON a.id_banda = b.id_banda
    ORDER BY a.id_album
  `,
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(result.rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});

//Cria um novo albúm

app.post("/album", (req, res) => {
  const { nome, dataLanc, banda } = req.body;
  pool.query(
    `
  INSERT INTO album (nome_album, data_lanc_album, id_banda) 
  VALUES ($1,$2,$3) RETURNING *
  `,
    [nome, dataLanc, banda],
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(result.rows);
    }
  );
});

// Atualiza album
app.put("/album/:id", (req, res) => {
  const { id } = req.params;
  const { nome, dataLanc, banda } = req.body;
  pool.query(
    `
    UPDATE album SET 
    nome_album = $1,
    data_lanc_album  = $2,
    id_banda = $3
    WHERE id_album = $4
    RETURNING *;
    `,
    [nome, dataLanc, banda, id],
    (err, result) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json(result.rows);
    }
  );
});

// Apaga album
app.delete("/album/:id", (req, res) => {
  const { id } = req.params;
  pool.query(
    `
  DELETE FROM album WHERE id_album = $1 RETURNING *
  `,
    [id],
    (err, results) => {
      if (err) {
        res.status(400).send(err);
      }
      res.status(200).json({ Excluído: "Sim", Objeto: results.rows });
    }
  );
});
