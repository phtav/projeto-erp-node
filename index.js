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

app.get('/', (req, res) => {
 res.send('API do ERP rodando com sucesso!');
});

let produtos = [];


app.post('/produtos', (req, res) => {
 const {nome, preco, estoque} = req.body;

 const novoProduto = {
 id: produtos.length + 1,
 nome,
 preco,
 estoque
};

produtos.push(novoProduto);
console.log('Produto cadastrado:', novoProduto);

res.status(201).json({
 mensagem: 'Produto cadastrado com sucesso!',
 produto: novoProduto
 });
});

app.get('/produtos', (req, res) => {
 res.json(produtos);
});

app.listen(port, () => {
 console.log(`Servidor rodando em http://localhost:${port}`);
});

/*async function inserirFornecedor(razao_social, CNPJ, email) {
try {
	const sql = "INSERT INTO fornecedores (razao_social, CNPJ, email) VALUES ($1, $2, $3) RETURNING *";
	const valores = [razao_social, CNPJ, email];
	const resultado = await pool.query(sql, valores);

	console.log("Fornecedor cadastrado com ID:",resultado.rows[0].id_fornecedor);
} catch (erro) {
	console.error("Erro no banco: ", erro.message);
}
}

async function inserirProdutos(nome, preco, estoque, id_fornecedor) {
try {
	const sql = 'INSERT INTO produtos (nome, preco, estoque, id_fornecedor) VALUES ($1, $2, $3, $4) RETURNING *';
	const valores = [nome, preco, estoque, id_fornecedor];
	const res = await pool.query(sql, valores);

	console.log("Produto cadastrado com sucesso!");
	console.table(res.rows);
} catch (erro) {
	console.error("Erro ao cadastrar produto:", erro.message);
}
}

async function relatorioEstoque() {
try {
	const sql = 
`SELECT 
p.nome AS PRODUTOS,
p.preco,
p.estoque,
f.razao_social AS fornecedor
FROM produtos p
INNER JOIN fornecedores f ON p.id_fornecedor = f.id_fornecedor
`;

	const res = await pool.query(sql);

console.log("Relatório detalhado:");
console.table(res.rows);
} catch (erro) {
console.error("Erro ao gerar relatório:", erro.message);
}
} */
