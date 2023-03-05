const db = require('./database/database');

const createUsuariosTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT,
      email TEXT,
      senha TEXT,
      cpf_cnpj TEXT
    )
  `);
};

const createTransacoesTable = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userId INTERGER,
      remetente INTEGER,
      destinatario INTERGER,
      historico TEXT,
      valor REAL,
      data TEXT,
      FOREIGN KEY (userId) REFERENCES usuarios(id),
      FOREIGN KEY (remetente) REFERENCES usuarios(id),
      FOREIGN KEY (destinatario) REFERENCES usuarios(id)
    )
  `);
};

const runMigrations = () => {
  createUsuariosTable();
  createTransacoesTable();
};

runMigrations();
