/** 
 
 * @param {string} formaPagamento 
 * @returns {number} 
 */
function calcularDescontoPagamento(formaPagamento) {
    switch (formaPagamento) {
        case "pix":
            return 0.15;
        case "boleto":
            return 0.10;
        case "cartao-vista":
            return 0.05;
        case "cartao-parcelado":
            return 0;
        default:
            return 0;
    }
}

/**
 
 * @param {string} tipoEntrega 
 * @returns {number} 
 */
function calcularValorEntrega(tipoEntrega) {
    switch (tipoEntrega) {
        case "retirada":
            return 0;
        case "padrao":
            return 12;
        case "expressa":
            return 25;
        case "super-expressa":
            return 45;
        default:
            return 0;
    }
}

/**

 * @param {number} valor 
 * @returns {string} 
 */
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

const formulario = document.getElementById("form-orcamento");
const painelResultado = document.getElementById("resultado");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const valorProduto = Number(document.getElementById("valor-produto").value);
    const formaPagamento = document.getElementById("pagamento").value;
    const tipoEntrega = document.getElementById("entrega").value;

    if (!Number.isFinite(valorProduto) || valorProduto <= 0) {
        alert("Informe um valor de produto maior que zero.");
        return;
    }

    if (!formaPagamento || !tipoEntrega) {
        alert("Selecione a forma de pagamento e a modalidade de frete.");
        return;
    }

    const taxaDesconto = calcularDescontoPagamento(formaPagamento);
    const valorDesconto = valorProduto * taxaDesconto;
    const valorFrete = calcularValorEntrega(tipoEntrega);
    const totalFinal = valorProduto - valorDesconto + valorFrete;

    document.getElementById("res-produto").textContent = formatarMoeda(valorProduto);
    document.getElementById("res-desconto").textContent = formatarMoeda(valorDesconto);
    document.getElementById("res-frete").textContent = formatarMoeda(valorFrete);
    document.getElementById("res-total").textContent = formatarMoeda(totalFinal);

    painelResultado.classList.remove("hidden");
});
