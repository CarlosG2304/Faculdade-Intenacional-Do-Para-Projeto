$.ajax({ url: 'autenticacao', success(data) { } })

$('form').submit(function (e) {
  const email = $('#email').val()
  const senha = $('#password').val()

  $.ajax({
    url: 'autenticacao',
    data: {
      email,
      senha
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
    let boolean = dado['verificacaoEmail'] && dado['verificacaoSenha']

    if (boolean) {
      alert('Bem vindo')
      localStorage.setItem('email', email)
      $('body').fadeOut(2000)
      setTimeout(function () {
        window.location.replace("/MeusDados.html");
      }, 2000)
    } else {
      alert('Email e/ou senha incorreta')
    }
  }
  e.preventDefault()
})