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

  localStorage.setItem('nome', data['nome'].split(' ').slice(0, 1).join(' '))
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

      swal({
        title: "Ja cadastrado!",
        text: "Usuario ja cadastrado",
        icon: "warning",
      });

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
          swal({
            title: "Sucesso!",
            text: "Alteração feita com sucesso",
            icon: "success",
          });
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
  swal({
    title: "Confimação",
    text: "Tem certeza que deseja excluir a sua conta?",
    icon: "warning",
    buttons: ["Não", "Sim"],
  });

  $('.swal-button--confirm').click(function () {
    $.ajax({
      url: 'meusdados',
      method: 'delete',
      data: {
        email
      },
      success(data) {
        swal({
          title: "Sucesso!",
          text: data,
          icon: "success",
        });

        localStorage.setItem('email', '')
        $('.swal-button--confirm').click(function () {
          $('body').fadeOut(2000)
          setTimeout(function () {
            window.location.replace("/index.html");
          }, 2000)
        })
      },
      error(e) {
        console.log('post', e)
      },
    })

  })


})