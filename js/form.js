function exibirElemento(form) {
    form.style.display = 'block'
    form.classList.add('slower')
    form.classList.add('fadeIn')
}

function validaCodigo(event)
{
	event.preventDefault()
    var codigo = document.querySelector('#codigoPromocional').value
    fetch("https://localhost:44346/api/CodigoPromocional/Validar", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"CodigoPromo": codigo}),
    })
    .then(response => response.json())
    .then(json => {
          console.log(json)
          if (json.sucesso)
          {
            alert("O codigo " + codigo + " é valido")
            exibirElemento(formInspired)
          }
          else
          {
            alert("O codigo " + codigo + " é invalido")
          }        
    })
    .catch(function(err) {
        // tenho aqui se deu erro
        console.error(err)
    })
}

function enviaForm(event) 
{
    // var nome = document.getElementById("cNome")
    event.preventDefault()
    var codigo = document.querySelector('#codigoPromocional').value
    fetch("https://localhost:44346/api/CodigoPromocional/MarcarCodigoUsado", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"CodigoPromo": codigo}),
    })
    .then(response => response.json())
    .then(json => {
        console.log(json)
    })
    .catch(function(err){
        console.error(err)
    })
}

var formCod = document.querySelector("#formularioCodigo")
formCod.addEventListener('submit', validaCodigo);

var formInspired = document.querySelector("#formularioInscricao")
formInspired.addEventListener('submit', enviaForm)
exibirElemento(formCod)
