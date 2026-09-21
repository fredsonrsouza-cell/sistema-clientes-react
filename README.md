# sistema-clientes-react

Aplicacao React (Vite) com catalogo de produtos (State local) + gestao de clientes (API + SQLite).

## Problema solucionado
Empresa precisava exibir produtos e gerenciar clientes. Produtos ficam no State do React; clientes vao para API/Back-End/Banco e voltam para a tela via `fetch()`.

## Tecnologias
Front: React 18, JSX, Vite, CSS puro. Back: Node.js nativo (http + node:sqlite, sem dependencias). Banco: SQLite (arquivo `backend/clientes.db`).

## Como executar o Back-End
```bash
cd backend
npm start
# API em http://localhost:3001
```

## Como executar o Front-End
```bash
cd frontend
npm install
npm run dev
# App em http://localhost:5173
```

## Rotas da API
| Metodo | Rota | Corpo | Retorno |
|---|---|---|---|
| GET | / | - | info da API |
| GET | /clientes | - | lista de clientes |
| POST | /clientes | `{ nome, email, telefone }` | cliente criado (201) |

Teste com Postman: GET http://localhost:3001/clientes e POST com JSON.
Ou via curl:
```bash
curl http://localhost:3001/clientes
curl -X POST http://localhost:3001/clientes -H "Content-Type: application/json" -d "{\"nome\":\"Teste\",\"email\":\"teste@email.com\",\"telefone\":\"(11) 90000-0000\"}"
```

## Banco de Dados
Tabela `clientes(id, nome, email UNIQUE, telefone, criado_em)`. Schema em `database/schema.sql`. O servidor cria o arquivo e popula 3 clientes na primeira execucao.

## Funcionalidades
- Titulo, Produto (props), FormularioProduto, Cliente (props), FormularioCliente
- State: lista de produtos, campos dos formularios, lista de clientes
- `map()` para produtos e clientes; eventos onChange/onSubmit; `fetch()` GET e POST
- CSS proprio: pagina, titulo, formularios, campos, botao, lista e cards

## Fluxo
USUARIO > REACT/JSX > COMPONENTES > STATE > fetch() > API > BACK-END > BANCO (e volta ate a TELA).

## Integrantes
- Fredson Rafael Silva Souza
- Luma Cristina de Souza Barbosa
