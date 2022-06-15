const email = localStorage.getItem('email')

$('#email').val(email)

$.ajax({
  url: 'meusdados',
  data: {
    email
  },
  success(data) {

    inserir(data)

  },
  error(e) {
    console.log('get', e)
  }
})


const inserir = data => {
  localStorage.setItem('id', data['id'])
  $('#name').val(data['nome'])
  $('#Password').val(data['senha'])
  $('#CPF').val(data['cpf'])
  $('#data').val(data['dataNascimento'].substring(0, 10))

}

$('#alterar').click(function (e) {
  const nome = $('#name').val()
  const senha = $('#Password').val()
  const cpf = $('#CPF').val()
  const dataNascimento = $('#data').val()
  const email = $('#email').val()
  const id = localStorage.id

  e.preventDefault()

  $.ajax({
    url: 'meusdados/verificacao',
    data: {
      id,
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

    let boolean = dado['verificacaoEmail'] || dado['verificacaoNome']

    if (boolean) {

      alert('Usuario ja cadastrado')

    } else {
      $.ajax({
        url: 'meusdados',
        method: 'put',
        data: {
          nome,
          dataNascimento,
          cpf,
          email,
          senha
        },
        success(data) {
          alert(`Alteração feita com sucesso`)
        },
        error(e) {
          console.log('post', e)
        },
      })
    }
  }

})
$('#Sair').click(function () {
  localStorage.setItem('email', '')
  $('body').fadeOut(2000)
  setTimeout(function () {
    window.location.replace("/index.html");
  }, 2000)
})

$('#excluir').click(function () {

  const email = $('#email').val()

  $.ajax({
    url: 'meusdados',
    method: 'delete',
    data: {
      email
    },
    success(data) {
      alert(data)
      localStorage.setItem('email', '')
      $('body').fadeOut(2000)
      setTimeout(function () {
        window.location.replace("/index.html");
      }, 2000)
    },
    error(e) {
      console.log('post', e)
    },
  })

})