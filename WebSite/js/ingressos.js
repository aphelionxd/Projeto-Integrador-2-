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

// Função para mostrar o loading
function mostrarLoading() {
    document.getElementById("loading-screen").style.display = "block";
}

// Função para esconder o loading
function esconderLoading() {
    document.getElementById("loading-screen").style.display = "none";
}

// Função para prosseguir com o pagamento
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

        // Mostre o modal
        var myModal = new bootstrap.Modal(document.getElementById('exampleModalToggle'));
        myModal.show();

        // Configure o valor do botão "Pagar"
        document.getElementById("payment-button-amount").textContent = `Pagar $${valorPagar.toFixed(2)}`;
    }
}

// Função para confirmar o pagamento
function confirmarPagamento() {
    // Mostre o loading
    mostrarLoading();

    // Simule o processamento do pagamento (substitua isso com sua lógica real)
    setTimeout(function() {
        // Esconda o loading
        esconderLoading();

        // Exibir mensagem de confirmação de pagamento
        document.getElementById("pagamentoConcluido").style.display = "block";

        // Ocultar modal de pagamento após 1 segundo
        setTimeout(function() {
            var modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'), {});
            modal.hide();
        }, 1000);
    }, 3000); // Simulação de 3 segundos de processamento
}

// Event listener para atualizar o valor do ingresso quando a seleção mudar
document.getElementById("tipoIngresso").addEventListener("change", atualizarValor);

// Event listener para o botão "Prosseguir pagamento"
document.querySelector(".botaomodal").addEventListener("click", prosseguirPagamento);

// Event listener para o botão "Pagar" no modal de pagamento
document.getElementById("payment-button").addEventListener("click", confirmarPagamento);

// Event listener para o botão "Gerar Ingresso" no modal de pagamento
document.querySelector("#exampleModalToggle.modal-footer button").addEventListener("click", function() {
    // Ocultar o modal de pagamento
    var modal = new bootstrap.Modal(document.getElementById('exampleModalToggle'), {});
    modal.hide();

    // Exibir o modal de ingresso virtual
    var ingressoVirtualModal = new bootstrap.Modal(document.getElementById('modalIngressoVirtual'), {});
    ingressoVirtualModal.show();
});

function mostrarLoading() {
    document.getElementById("loading-screen").innerHTML = `
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
      <p>Processando pagamento...</p>
    `;
    document.getElementById("loading-screen").style.display = "block";
  }