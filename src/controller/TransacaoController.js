const express = require('express');

class TransacaoController {
  constructor(transacaoService) {
    this.transacaoService = transacaoService;
  }

  async consultarSaldo(req, res) {
    try {
      const saldo = await this.transacaoService.consultarSaldo(req.params.id);
      res.json({ saldo });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async transferir(req, res) {
    try {
      const transacao = req.body;
      await this.transacaoService.transferir(transacao);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async transferenciaComTransacao(req, res) {
    try {
      const transacao = req.body;
      await this.transacaoService.transferenciaComTransacao(transacao);
      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }


}

module.exports = TransacaoController;
