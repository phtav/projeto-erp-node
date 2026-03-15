require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const { Pool } = require('pg');
const pool = new Pool ({
user: process.env.DB_USER,
host: process.env.DB_HOST,
database: process.env.DB_NAME,
password: process.env.DB_PASS,
port: process.env.DB_PORT,
});

app.post('/produtos', async(req, res) => {

	const { nome, preco, estoque, id_fornecedor } = req.body;

	try {
		const sql = `INSERT INTO produtos (nome, preco, estoque, id_fornecedor)
		VALUES ($1, $2, $3, $4) RETURNING *;`
		const valores = [nome, preco, estoque, id_fornecedor];
		const resp = await pool.query(sql, valores);

		console.log('Sucesso no banco!', resp.rows[0]);
		
		res.status(201).json({
			mensagem: 'Produto salvo no PostgreSQL com sucesso!',
			produto: resp.rows[0]
		});

	} catch(erro) {
		console.log("Erro ao salvar no banco:", erro.message);
		res.status(500).json({
			erro: 'Erro ao salvar no banco',
			detalhes: erro.message
		})
	}
})

app.get('/produtos', async(req, res) => {

try {
	const sql = 'SELECT * FROM produtos ORDER BY id_produto ASC;';
	const resp = await pool.query(sql);
	res.status(200).json(resp.rows);
	console.log(`Consulta realizada: ${resp.rowCount} produtos encontrados.`);
} catch (erro) {
	console.error("Erro ao buscar no banco de dados:", erro.message);
	res.status(500).json({
	erro: 'Erro ao buscar produtos no banco de dados',
	detalhes: erro.message
});
}
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});