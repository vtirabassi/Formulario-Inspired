function exibirElemento(form) {
    form.style.display = 'block'
    form.classList.add('slower')
    form.classList.add('fadeIn')
}

function ocultaElemento(form) {
    form.style.display = 'none'
}

function validaCodigo(event) {
    event.preventDefault()
    var codigo = document.querySelector('#codigoPromocional').value
    fetch("https://localhost:44346/api/CodigoPromocional/Validar", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "CodigoPromo": codigo }),
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.sucesso) {
                exibirElemento(formInspired)
                ocultaElemento(formCod)
            }
            else {
                event.preventDefault();
                event.stopPropagation();
            }
        })
        .catch(function (err) {
            // tenho aqui se deu erro
            console.error(err)
        })
}

function codigoUsado(event) {
    // var nome = document.getElementById("cNome")
    event.preventDefault()
    var codigo = document.querySelector('#codigoPromocional').value
    fetch("https://localhost:44346/api/CodigoPromocional/MarcarCodigoUsado", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "CodigoPromo": codigo }),
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
        })
        .catch(function (err) {
            console.error(err)
        })
}

function enviaForm(event) {
    event.preventDefault()
    var firstName = document.querySelector("#cNome").value
    var lastName = document.querySelector("#cSobrenome").value
    var cpf = document.querySelector("#cCPF").value
    var dataNascimento = document.querySelector("#cDataNascimento").value
    var telefone = document.querySelector("#cTelefone").value
    var email = document.querySelector("#cEmail").value
    var cep = document.querySelector("#cCEP").value
    var end = document.querySelector("#cEnd").value
    var cidade = document.querySelector("#cCidade").value
    var estado = document.querySelector("#cEstado").value
    var qualidade = document.querySelector("#cQualidade").value
    var comentario = document.querySelector("#cComment").value
    var sexo = document.querySelector("input[name='gridRadios']:checked").value
    var not = document.querySelector("input#cTermo").checked

    fetch("https://localhost:44346/api/Formulario/CadastraForm", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "FirstName": firstName,
            "LastName": lastName,
            "Cpf": cpf,
            "NumeroTelefone": telefone,
            "Email": email,
            "Sexo": sexo,
            "DataNascimento": dataNascimento,

            "CEP": cep,
            "Endereco": end,
            "Estado": estado,
            "Cidade": cidade,

            "Qualidade": qualidade,
            "Obs": comentario,
            "Notificacao": not
        }),
    })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            if (json.sucesso) {
                alert("dados enviados")
            }
            else {
                event.preventDefault();
                event.stopPropagation();
            }
        })
        .catch(function (err) {
            console.error(err)
        })
}

(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Pega todos os formulários que nós queremos aplicar estilos de validação Bootstrap personalizados.
        var forms = document.getElementsByClassName('needs-validation');
        // Faz um loop neles e evita o envio
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();


var formCod = document.querySelector("#formularioCodigo")
formCod.addEventListener('submit', validaCodigo);

var formInspired = document.querySelector("#formularioInscricao")
formInspired.addEventListener('submit', codigoUsado)
formInspired.addEventListener('submit', enviaForm)

exibirElemento(formCod)
