// Função para atualizar o valor do ingresso com base na seleção do tipo
function atualizarValor() {
    var select = document.getElementById("tipoIngresso");
    var valorIngresso = document.getElementById("valorIngresso");
    var valorSelecionado = select.options[select.selectedIndex].value;

    if (valorSelecionado === "") {
        valorIngresso.textContent = "Valor do Ingresso: --";
    } else {
        valorIngresso.textContent = "Valor do Ingresso: $" + valorSelecionado + ".00";
    }
}

// Função para lidar com o pagamento e confirmar a transação
function prosseguirPagamento() {
    var select = document.getElementById("tipoIngresso");
    var valorSelecionado = select.options[select.selectedIndex].value;
    var valorPagar = parseFloat(valorSelecionado);

    if (valorSelecionado === "") {
        // Exibir aviso se nenhum tipo de ingresso foi selecionado
        document.getElementById("aviso").style.display = "block";
    } else {
        // Ocultar aviso se um tipo de ingresso foi selecionado
        document.getElementById("aviso").style.display = "none";

        // Atualizar o valor a pagar no formulário de pagamento
        document.getElementById("cc-payment").value = "Pagar $" + valorPagar.toFixed(2);

        // Simular confirmação de pagamento após 3 segundos
        setTimeout(function() {
            // Exibir mensagem de confirmação de pagamento
            document.getElementById("pagamentoConcluido").style.display = "block";

            // Ocultar modal de pagamento após 1 segundo
            setTimeout(function() {
                var modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'), {});
                modal.hide();
            }, 1000);
        }, 3000);
    }
}

// Event listener para atualizar o valor do ingresso quando a seleção mudar
document.getElementById("tipoIngresso").addEventListener("change", atualizarValor);

// Event listener para o botão "Prosseguir pagamento"
document.querySelector(".botaomodal").addEventListener("click", prosseguirPagamento);

// Event listener para o botão "Gerar Ingresso" no modal de pagamento
document.querySelector("#exampleModalToggle .modal-footer button").addEventListener("click", function() {
    // Ocultar o modal de pagamento
    var modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'), {});
    modal.hide();

    // Exibir o modal de ingresso virtual
    var ingressoVirtualModal = new bootstrap.Modal(document.getElementById('modalIngressoVirtual'), {});
    ingressoVirtualModal.show();
});
