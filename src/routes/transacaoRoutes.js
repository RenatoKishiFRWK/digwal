const express = require('express');
const router = express.Router();
const TransacaoController = require('../controller/TransacaoController');
const transacaoService = require('../service/transacaoService');

const transacaoController = new TransacaoController(transacaoService);

// Route to get account balance
router.get('/contas/:id/saldo', transacaoController.consultarSaldo.bind(transacaoController));

// Route to transfer money between accounts
router.post('/contas/transferir', transacaoController.transferir.bind(transacaoController));

// Route to transfer money between accounts with transaction
router.post('/contas/transferir-com-transacao', transacaoController.transferenciaComTransacao.bind(transacaoController));

module.exports = router;
