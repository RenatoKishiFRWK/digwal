const validarDocumento = (documento) => {
    const documentoLimpo = documento.replace(/[^\d]/g, '');
    if (documentoLimpo.length === 11) {
      return validarCPF(documentoLimpo);
    } else if (documentoLimpo.length === 14) {
      return validarCNPJ(documentoLimpo);
    } else {
      return false;
    }
}


const validarCPF = (cpf) => {

if (!/^\d{11}$/.test(cpf)) {
    return false;
}

let soma = 0;
for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
}
let resto = soma % 11;
let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

soma = 0;
for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
}
resto = soma % 11;
let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

return cpf.charAt(9) == digitoVerificador1 && cpf.charAt(10) == digitoVerificador2;
};

const validarCNPJ = (cnpj) => {
if (!/^\d{14}$/.test(cnpj)) {
    return false;
}

let soma = 0;
let multiplicador = 2;
for (let i = 11; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
}
let resto = soma % 11;
let digitoVerificador1 = resto < 2 ? 0 : 11 - resto;

soma = 0;
multiplicador = 2;
for (let i = 12; i >= 0; i--) {
    soma += parseInt(cnpj.charAt(i)) * multiplicador;
    multiplicador = multiplicador === 9 ? 2 : multiplicador + 1;
}
resto = soma % 11;
let digitoVerificador2 = resto < 2 ? 0 : 11 - resto;

return cnpj.charAt(12) == digitoVerificador1 && cnpj.charAt(13) == digitoVerificador2;
};
