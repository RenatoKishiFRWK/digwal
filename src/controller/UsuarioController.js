const db = require('../database/database');

const UsuarioController = {
  // Função para obter o saldo do usuário
  obterSaldoUsuario: async (req, res) => {
    const { id } = req.params;
    console.log('ID do usuário:', id);
  
    try {
      // Obtem o saldo do usuário a partir do ID informado
      const sql = `SELECT COALESCE(SUM(valor), 0) as saldo FROM transacoes WHERE Remetente = ? OR Destinatario = ? OR UserId = ?`;
      db.get(sql, [id], (err, row) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ mensagem: 'Erro ao obter saldo do usuário' });
        }
  
        if (!row) {
          return res.status(404).json({ mensagem: 'Usuário não encontrado' });
        }
  
        return res.json({ saldo: row.saldo });
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro ao obter saldo do usuário' });
    }
  },

  // Função para cadastrar um novo usuário
  cadastrarUsuario: async (req, res) => {
    const { nome, email, senha, cpf_cnpj } = req.body;

    try {
      // Insere o novo usuário no banco de dados
      const { lastID } = await db.run('INSERT INTO usuarios (nome, email, senha, cpf_cnpj) VALUES (?, ?, ?, ?)', [
        nome,
        email,
        senha,
        cpf_cnpj
      ]);

      return res.status(201).json({ id: lastID, nome, email, cpf_cnpj });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
    }
  },
} ;

module.exports = UsuarioController;
