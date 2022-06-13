//Requisição feita só para ativar o banco de dados
$.ajax({ url: 'formulario', success(data) { } })

$('form').submit(function (e) {
  const nome = $('#name').val()
  const data = $('#data').val()
  const cpf = $('#cpf').val()
  const curso = $('.form-select').val()
  const email = $('#email').val()
  const senha = $('#password').val()
  const confimacaoS = $('#Confirmpassword').val()

  let genero

  $('input:radio[name=genero]').each(function () {
    //Verifica qual está selecionado
    if ($(this).is(':checked')) genero = $(this).val()
  })

  $.ajax({
    url: 'formulario',
    data: {
      nome,
      email
    },
    success(data) {

      dado = JSON.parse(data)
      verificacao(dado)

    },
    error(e) {
      console.log('get', e)
    }
  })

  function verificacao(dado) {

    let boolean = ((dado['nomeRepetido'] == 'true') || (dado['emailRepetido'] == 'true'))




    if (boolean) {

      alert('Usuario ja cadastrado')

    } else {
      if (senha !== confimacaoS) {
        alert("Senhas diferentes")

      } else {
        salvar()
        alert("Cadastro realizado com sucesso")
        $('body').fadeOut(2000)
        setTimeout(function () {
          window.location.replace("/index.html");
        }, 2000)

      }
    }
  }
  function salvar() {
    $.ajax({
      url: 'formulario',
      method: 'post',
      data: {
        nome,
        data,
        cpf,
        genero,
        curso,
        email,
        senha
      },
      success(data) {

      },
      error(e) {
        console.log('post', e)
      },
    })
  }

  e.preventDefault()

})