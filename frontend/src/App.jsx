import { useState, useEffect } from 'react'
import axios from 'axios';
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './index.css'
import { Boxes } from 'lucide-react';

function App() {
  const [produtos, setProdutos] = useState([]);

  const buscarProdutos = async () => {
    try {
      const resp = await axios.get('http://localhost:3000/produtos');
      setProdutos(resp.data);
    } catch (erro) {
      console.error('Erro ao buscar dados:', erro.message);
    }
  };

  useEffect(() => {
    buscarProdutos();
  }, []);

  return (
    <main>
      <header>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <Boxes size={32} color="#333" /> 
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
          <tr key ={p.id_produto}>
            <td>{p.id_produto}</td>
            <td>{p.nome}</td>
            <td>R$ {p.preco}</td>
            <td>{p.estoque} un</td>
            <td>{p.fornecedor}</td>
            <td>
              <button>📝</button>
              <button>🗑️</button>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App
