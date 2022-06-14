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

  e.preventDefault()



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


})
$('#Sair').click(function () {
  localStorage.setItem('email', '')
  $('body').fadeOut(2000)
  setTimeout(function () {
    window.location.replace("/index.html");
  }, 2000)
})
