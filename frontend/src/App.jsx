import { useState, useEffect } from 'react'
import axios from 'axios';
import { Boxes } from 'lucide-react';
import './index.css'

function App() {
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [novoProduto, setNovoProduto] = useState({
    nome: '',
    preco: '',
    estoque: '',
    id_fornecedor: ''
  })

  // 1. Busca de Clientes
  const buscarClientes = async () => {
    try {
      const resp = await axios.get('http://localhost:3000/clientes');
      setClientes(resp.data);
    } catch (erro) {
      console.error('Erro ao buscar clientes:', erro.message);
    }
  }

  // 2. Busca de Todos os Produtos
  const buscarProdutos = async () => {
    try {
      const resp = await axios.get('http://localhost:3000/produtos');
      setProdutos(resp.data);
    } catch (erro) {
      console.error('Erro ao buscar produtos:', erro.message);
    }
  };

  // 3. Filtro de Estoque Baixo
  const estoqueBaixo = async () => {
    try {
      const resp = await axios.get('http://localhost:3000/produtos/estoque-baixo');
      setProdutos(resp.data);
    } catch (erro) {
      console.error('Erro ao buscar estoque baixo:', erro.message);
    }
  };

  // 4. Função para Deletar Produto
  const deletarProduto = async (id) => {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:3000/produtos/remove/${id}`);
        alert("Produto removido com sucesso!");
        buscarProdutos(); // Atualiza a lista após deletar
      } catch (erro) {
        console.error("Erro ao remover:", erro.message);
      }
    }
  };

  // 5. Função para Salvar Novo Produto
  const salvarProduto = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/produtos', novoProduto);
      alert("Produto cadastrado com sucesso!");
      // Limpa o formulário e atualiza a tabela
      setNovoProduto({ nome: '', preco: '', estoque: '', id_fornecedor: '' });
      buscarProdutos();
    } catch (erro) {
      console.error("Erro ao cadastrar:", erro.message);
    }
  };

  // Carregamento inicial dos dados
  useEffect(() => {
    buscarProdutos();
    buscarClientes();
  }, []);

  return (
    <main>
      <header>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Boxes size={32} color="#443c2d" />
          <h1>BBERP</h1>
        </div>
        <p>Olá [NOME DE USUÁRIO]!</p>
      </header>

      <nav>
        <ul>
          <li>Painel</li>
          <li>Produtos</li>
          <li>Vendas</li>
        </ul>
      </nav>

      {/* Botões de Filtro */}
      <div className="filter-bar">
        <button onClick={buscarProdutos} className="btn-filter btn-all">
          📦 Ver Todos
        </button>
        <button onClick={estoqueBaixo} className="btn-filter btn-low">
          ⚠️ Estoque Baixo
        </button>
      </div>

      {/* Formulário de Cadastro */}
      <section className="form-container">
        <h3>📦 Novo Produto</h3>
        <form onSubmit={salvarProduto} className="form-group">
          <input
            placeholder="Nome do Produto"
            value={novoProduto.nome}
            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
            required
          />
          <input
            placeholder="Preço (R$)"
            type="number"
            step="0.01"
            value={novoProduto.preco}
            onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
            required
          />
          <input
            placeholder="Estoque (un)"
            type="number"
            value={novoProduto.estoque}
            onChange={(e) => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
            required
          />
          <input
            placeholder="ID Fornecedor"
            type="number"
            value={novoProduto.id_fornecedor}
            onChange={(e) => setNovoProduto({ ...novoProduto, id_fornecedor: e.target.value })}
            required
          />
          <button type="submit" className="btn-save">
            💾 Salvar Produto
          </button>
        </form>
      </section>

      {/* Tabela de Produtos */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome do Produto</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Fornecedor</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p) => (
            <tr key={p.id_produto}>
              <td>{p.id_produto}</td>
              <td>{p.nome}</td>
              <td>R$ {p.preco}</td>
              <td>{p.estoque} un</td>
              <td>{p.fornecedor || "Não definido"}</td>
              <td>
                <button className="action-btn">📝</button>
                <button 
                  className="action-btn" 
                  onClick={() => deletarProduto(p.id_produto)}
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Tabela de Clientes */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id_cliente}>
              <td>{c.id_cliente}</td>
              <td>{c.nome}</td>
              <td>{c.cpf}</td>
              <td>
                <button className="action-btn">📝</button>
                <button className="action-btn">🗑️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;