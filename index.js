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

app.get('/relatorio', async(req, res) => {
	try {
		const sql = `SELECT p.nome AS produtos,
		p.preco,
		p.estoque,
		f.razao_social AS fornecedores
		FROM produtos p
		INNER JOIN fornecedores f ON p.id_fornecedor = f.id_fornecedor
		ORDER BY p.nome ASC;`

		const resp = await pool.query(sql);

		console.log(`Relatorio gerado: ${resp.rowCount} produtos encontrados`);

		res.status(200).json(resp.rows);
		
	} catch (erro) {
		console.error('Falha em encontrar produto no banco', erro.message);
		res.status(500).json({
			erro: 'Erro ao buscar no banco de dados',
			detalhes: erro.message
		})
	}
})

app.delete('/produtos/:id', async(req, res) => {
	const {id} = req.params;

	try{
		const sql = `DELETE FROM produtos WHERE id_produto = $1 RETURNING *;`;
		const valores = [id];
		const resp = await pool.query(sql, valores);

		if(resp.rowCount === 0) {
			return res.status(404).json({erro: 'Nao foi possivel encontrar o produto pelo ID'});
		}

		console.log(`Produto com ID ${id} removido com sucesso!`);

		res.status(200).json({
			mensagem:'Produto deletado com sucesso!',
			produtoRemovido: resp.rows[0]
		});
		
	} catch (erro) {
		console.error('Erro ao deletar!', erro.message);
		res.status(500).json({
			mensagem: 'Processo falhou!',
			Erro: erro.message
		});
	}
})

app.put('/produtos/:id', async (req, res) => {
	const {id} = req.params;
	const {preco, estoque} = req.body;

	try {
		const sql = `UPDATE produtos SET preco = $1, estoque = $2 WHERE id_produto = $3 RETURNING *;`;
		const valores = [preco, estoque, id];

		const resp = await pool.query(sql, valores);

		if(resp.rowCount === 0) {
			return res.status(404).json({erro: 'Produto não encontrado.'});
		}
		
		console.log(`Preço atualizado para o ID{id}`);
		res.json(resp.rows[0]);
	} catch (erro) {
		res.status(404).json({erro: erro.message});
	}
})

app.get('/produtos/busca', async (req, res) => {
	const {nome} = req.query;

	try {
		const sql = `SELECT * FROM produtos WHERE nome ILIKE $1;`;
		const busca = `%${nome}%`;
		const resp = await pool.query(sql, [busca]);

		res.json(resp.rows);
		console.log(`Itens encontrados com "${nome}": ${resp.rowCount}`);

	} catch (erro) {
		res.status(500).json({erro: erro.message});
	}
});

app.patch('/produtos/estoque/:id', async (req, res) => {
    const { id } = req.params;
    const { estoque } = req.body;

    try {
        const sql = `UPDATE produtos SET estoque = $1 WHERE id_produto = $2 RETURNING *;`;
        const valores = [estoque, id];
        const resp = await pool.query(sql, valores);

        if (resp.rowCount === 0) { 
            return res.status(404).json({ mensagem: 'Falha ao encontrar produto' });
        }

        res.status(200).json({ 
            mensagem: `Valor alterado para o ID ${id}`, 
            produto: resp.rows[0] 
        });

    } catch (erro) { 
        console.error(erro);
        res.status(500).json({ erro: 'Erro interno no servidor' });
    }
}); 

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});