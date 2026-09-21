-- Estrutura do Banco de Dados
-- Tabela: clientes

CREATE TABLE IF NOT EXISTS clientes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT NOT NULL,
  criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Dados iniciais
INSERT INTO clientes (nome, email, telefone) VALUES
  ('Maria Silva', 'maria@email.com', '(11) 99999-1111'),
  ('Joao Santos', 'joao@email.com', '(11) 98888-2222'),
  ('Ana Oliveira', 'ana@email.com', '(21) 97777-3333');
