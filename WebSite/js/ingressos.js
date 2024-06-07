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

            // Adicionar os detalhes do pagamento na seção abaixo da escolha de ingressos
            adicionarDetalhesPagamento();
        }, 1000);
    }, 3000); // Simulação de 3 segundos de processamento
}

// Função para adicionar os detalhes do pagamento na seção abaixo da escolha de ingressos
function adicionarDetalhesPagamento() {
    var nomeNoCartao = document.getElementById("cc-name").value;
    var select = document.getElementById("tipoIngresso");
    var tipoIngresso = select.options[select.selectedIndex].text;
    var dataHora = new Date().toLocaleString();
    var detalhesPagamento = document.getElementById("detalhesPagamento");

    var compraId = `compra-${Date.now()}`; // Gera um ID único para cada compra

    var novoDetalhe = document.createElement("div");
    novoDetalhe.id = compraId;
    novoDetalhe.innerHTML = `
        <p>Ingresso ${tipoIngresso} comprado por ${nomeNoCartao} em ${dataHora}</p>
        <button class="btn btn-info" onclick="visualizarCodigoBarra('${compraId}')">Visualizar Código de Barras</button>
        <button class="btn btn-danger" onclick="confirmarCancelamentoCompra('${compraId}')">Cancelar Compra</button>
        <div id="codigo-barra-${compraId}" style="display: none;">
            <svg id="barcode-${compraId}"></svg>
            <p>Status: <span id="status-${compraId}">Ingresso inválido</span></p>
        </div>
    `;
    detalhesPagamento.appendChild(novoDetalhe);

    // Gerar o código de barras
    JsBarcode(`#barcode-${compraId}`, compraId, {
        format: "CODE128",
        displayValue: true,
        fontSize: 20
    });

    // Validar ingresso ao ler o código de barras
    validarIngresso(compraId);
}

// Função para validar o ingresso ao ler o código de barras
function validarIngresso(compraId) {
    // Simulação de ingresso válido após 3 segundos
    setTimeout(function() {
        var statusElement = document.getElementById(`status-${compraId}`);
        statusElement.textContent = "Ingresso válido";
        statusElement.style.color = "green";
    }, 3000);
}

// Função para confirmar o cancelamento da compra
function confirmarCancelamentoCompra(compraId) {
    var confirmacao = confirm("Você tem certeza que deseja cancelar a compra?");
    if (confirmacao) {
        cancelarCompra(compraId);
    }
}

// Função para cancelar a compra
function cancelarCompra(compraId) {
    var compra = document.getElementById(compraId);
    compra.remove();
}

// Função para visualizar o código de barras
function visualizarCodigoBarra(compraId) {
    var codigoBarra = document.getElementById(`codigo-barra-${compraId}`);
    if (codigoBarra.style.display === "none") {
        codigoBarra.style.display = "block";
    } else {
        codigoBarra.style.display = "none";
    }
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

$('#exampleModalToggle').modal('hide');
