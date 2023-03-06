class ITransacaoRepository {
    async findByRemetente(id) {}
    async findByDestinatario(Id) {}    
    async create(transacao) {}
    async transferenciaComTransacao(transacao) {}
  }

  module.exports = ITransacaoRepository;