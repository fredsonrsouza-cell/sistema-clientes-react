import http from 'node:http';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = path.join(__dirname, 'clientes.db');
const PORT = 3001;

// Banco SQLite (arquivo local)
const db = new DatabaseSync(DB_FILE);
db.exec(`
  CREATE TABLE IF NOT EXISTS clientes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT NOT NULL,
    criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

const total = db.prepare('SELECT COUNT(*) AS total FROM clientes').get();
if (total.total === 0) {
  const seed = db.prepare('INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)');
  seed.run('Maria Silva', 'maria@email.com', '(11) 99999-1111');
  seed.run('Joao Santos', 'joao@email.com', '(11) 98888-2222');
  seed.run('Ana Oliveira', 'ana@email.com', '(21) 97777-3333');
  console.log('Banco populado com 3 clientes iniciais.');
}

function send(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (c) => (raw += c));
    req.on('end', () => resolve(raw));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  // GET / -> info da API
  if (url.pathname === '/' && req.method === 'GET') {
    return send(res, 200, { api: 'sistema-clientes', rotas: ['GET /clientes', 'POST /clientes'] });
  }

  // GET /clientes
  if (url.pathname === '/clientes' && req.method === 'GET') {
    const rows = db.prepare('SELECT id, nome, email, telefone FROM clientes ORDER BY id DESC').all();
    return send(res, 200, rows);
  }

  // POST /clientes
  if (url.pathname === '/clientes' && req.method === 'POST') {
    try {
      const raw = await readBody(req);
      const { nome, email, telefone } = JSON.parse(raw || '{}');
      if (!nome?.trim() || !email?.trim() || !telefone?.trim()) {
        return send(res, 400, { error: 'Nome, e-mail e telefone sao obrigatorios.' });
      }
      try {
        const r = db.prepare('INSERT INTO clientes (nome, email, telefone) VALUES (?, ?, ?)').run(nome.trim(), email.trim(), telefone.trim());
        const novo = db.prepare('SELECT id, nome, email, telefone FROM clientes WHERE id = ?').get(Number(r.lastInsertRowid));
        return send(res, 201, novo);
      } catch (e) {
        if (String(e.message).includes('UNIQUE')) {
          return send(res, 409, { error: 'Este e-mail ja esta cadastrado.' });
        }
        throw e;
      }
    } catch (e) {
      return send(res, 400, { error: 'JSON invalido. Envie { nome, email, telefone }.' });
    }
  }

  return send(res, 404, { error: 'Rota nao encontrada. Use GET /clientes ou POST /clientes.' });
});

server.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
  console.log(`Banco SQLite em: ${DB_FILE}`);
});
