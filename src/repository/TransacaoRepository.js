class TransacaoRepository extends ITransacaoRepository {
    constructor(db) {
      super();
      this.db = db;
    }
  
    async findByRemetente(id) {
      const query = 'SELECT COALESCE(SUM(valor), 0) as saldo FROM transacoes WHERE remetente = ?';
      return await this.db.get(query, [id]);
    }
  
    async findByDestinatario(id) {
      try {
        const result = await db.all(`SELECT * FROM transacoes WHERE destinatario = ?`, [id]);
        return result;
      } catch (error) {
        throw new Error(`Erro ao buscar transações por destinatário: ${error.message}`);
      }
    }
  
    async create(transacao) {
      const { remetente, destinatario, historico, valor, data } = transacao;
  
      try {
        const result = await db.run(`
          INSERT INTO transacoes (remetente, destinatario, historico, valor, data)
          VALUES (?, ?, ?, ?, ?)
        `, [remetente, destinatario, historico, valor, data]);
  
        return result.lastID;
      } catch (error) {
        throw new Error(`Erro ao criar transação: ${error.message}`);
      }
    }
    
    async transferenciaComTransacao(transacao) {
      const { remetente, destinatario, valor } = transacao;
  
      const transaction = await db.beginTransaction();
      try {

        const saldoRemetente = await db.get(`SELECT COALESCE(SUM(valor), 0) as saldo FROM transacoes WHERE Remetente = ? OR Destinatario = ? OR UserId = ?`, [remetente]);
        if (saldoRemetente.saldo < valor) {
          throw new Error(`Saldo insuficiente para transferência. Saldo atual: ${saldoRemetente.saldo}`);
        }
  
        await db.run(`INSERT INTO transacoes (remetente, destinatario, historico, valor, data) VALUES (?, ?, ?, ?, datetime('now'))`, [remetente, destinatario, `Transferência enviada para o usuário ${destinatario}`, -valor]);
        await db.run(`INSERT INTO transacoes (remetente, destinatario, historico, valor, data) VALUES (?, ?, ?, ?, datetime('now'))`, [destinatario, remetente, `Transferência recebida do usuário ${remetente}`, valor]);
      
        const transacaoId = await this.create(transacao);
  
        await db.commitTransaction();
        return transacaoId;
      } catch (error) {
        await db.rollbackTransaction();
        throw new Error(`Erro ao realizar transferência com transação: ${error.message}`);
      }
    }
  }