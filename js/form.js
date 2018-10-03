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

function codigoUsado() {
    // var nome = document.getElementById("cNome")
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

function enviaForm() {
    alert("a");
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
                codigoUsado();
            }
            else {
                // event.preventDefault();
                // event.stopPropagation();
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
                }else{
                    event.preventDefault();
                    event.stopPropagation();
                    AbreModal();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

function AbreModal() {
    document.querySelector("#lblNome").innerHTML = document.querySelector("#cNome").value + ' ' + document.querySelector("#cSobrenome").value
    document.querySelector("#lblCpf").innerHTML = document.querySelector("#cCPF").value
    document.querySelector("#lblDataNascimento").innerHTML = document.querySelector("#cDataNascimento").value
    document.querySelector("#lblSexo").innerHTML = document.querySelector("input[name='gridRadios']:checked").value
    document.querySelector("#lblTelefone").innerHTML = document.querySelector("#cTelefone").value
    document.querySelector("#lblEmail").innerHTML = document.querySelector("#cEmail").value
    document.querySelector("#lblCep").innerHTML = document.querySelector("#cCEP").value
    document.querySelector("#lblEnd").innerHTML = document.querySelector("#cEnd").value
    document.querySelector("#lblCidade").innerHTML = document.querySelector("#cCidade").value
    document.querySelector("#lblEstado").innerHTML = document.querySelector("#cEstado").value

    var ele = document.getElementById('bAbreModal');
    if (typeof ele.click == 'function') {
        ele.click()
    } else if (typeof ele.onclick == 'function') {
        ele.onclick()
    }
}


var formCod = document.querySelector("#formularioCodigo")
formCod.addEventListener('submit', validaCodigo);

var formInspired = document.querySelector("#formularioInscricao")
formInspired.addEventListener('submit', codigoUsado)
formInspired.addEventListener('submit', enviaForm)

exibirElemento(formCod)
