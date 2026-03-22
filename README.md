# 📦 BBERP - Sistema de Gerenciamento Full Stack

O **BBERP** é um sistema de Planejamento de Recursos Empresariais (ERP) focado no gerenciamento de produtos, clientes e fornecedores. Este projeto foi desenvolvido para demonstrar a integração completa entre um banco de dados relacional, uma API robusta e uma interface de usuário moderna e responsiva.

---

## 🚀 Tecnologias Utilizadas

### Frontend
- **React.js (Vite)**: Biblioteca principal para construção da interface.
- **Axios**: Cliente HTTP para consumo da API.
- **Lucide React**: Biblioteca de ícones vetoriais.
- **CSS3 Moderno**: Estilização com Grid, Flexbox e variáveis para uma experiência de usuário (UX) fluida.

### Backend
- **Node.js & Express**: Ambiente de execução e framework para criação das rotas REST.
- **PostgreSQL**: Banco de dados relacional para persistência de dados.
- **PG (node-postgres)**: Driver de conexão para execução de queries SQL.

---

## 🛠️ Funcionalidades Implementadas

- [x] **Dashboard de Produtos**: Visualização clara de todos os itens cadastrados.
- [x] **Filtros Inteligentes**: Botão de "Estoque Baixo" que identifica automaticamente produtos com criticidade de reposição.
- [x] **Gestão de Fornecedores**: Integração via SQL `JOIN` para exibir a Razão Social dos fornecedores diretamente na tabela de produtos.
- [x] **Operações CRUD**: Fluxo completo de Cadastro (POST) e Exclusão (DELETE) de produtos.
- [x] **Interface Pastel Design**: Visual limpo e profissional, utilizando sombras suaves e tabelas zebradas para facilitar a leitura.

---

## 🏗️ Guia de Instalação e Detalhes Técnicos

```bash
# 1. Instalação das dependências e inicialização do servidor (Raiz)
npm install
node index.js # Certifique-se de configurar o arquivo .env antes

# 2. Configuração e inicialização do ambiente de interface
cd frontend
npm install
npm run dev

# 3. Estrutura do Banco de Dados e Relacionamentos
# - PRODUTOS: Contém 'id_fornecedor' como chave estrangeira (FK).
# - FORNECEDORES: Armazena Razão Social, CNPJ e Contatos.
# - CLIENTES: Base de dados de compradores.

# 4. Conceitos Aplicados e Aprendizados
# - Manipulação de estados complexos com useState e useEffect no React.
# - Comunicação assíncrona (Async/Await) entre cliente e servidor com Axios.
# - Consultas SQL performáticas utilizando Joins Relacionais no Postgres.
# - Organização de arquitetura de pastas e boas práticas de versionamento com Git.

# Desenvolvido por Pedro Henrique Tavares 🚀
# LinkedIn: [https://www.linkedin.com/in/pedro-htavares]