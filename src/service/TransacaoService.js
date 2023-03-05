class TransacaoService extends ITransacaoService {
    constructor(transacaoRepository) {
      super();
      this.transacaoRepository = transacaoRepository;
    }
  
    async consultarSaldo(id) {
      const saldo = await this.transacaoRepository.findByDestinatario(id);
      return saldo;
    }
  
    async transferir(transacao) {
      // Verificar se o remetente tem saldo suficiente para a transferência
      const saldoRemetente = await this.transacaoRepository.findByDestinatario(transacao.remetente);
      if (saldoRemetente < transacao.valor) {
        throw new Error('Saldo insuficiente');
      }
  
      // Cria a transação
      await this.transacaoRepository.create(transacao);
  
    }

    async transferenciaComTransacao(transacao) {
      await this.transacaoRepository.transferenciaComTransacao(transacao);
    }
  }
  