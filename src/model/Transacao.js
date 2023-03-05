class Transacao {
    constructor(id, userId, remetente, destinatario, historico, valor, data) {
      this.id = id;      
      this.userId = userId;
      this.remetente = remetente;
      this.destinatario = destinatario;
      this.historico = historico;
      this.valor = valor;
      this.data = data;
    }
  }
  
  module.exports = Transacao;
  