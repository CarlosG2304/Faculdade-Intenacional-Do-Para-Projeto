let email = localStorage.getItem('email')

$('.js-redirect').click(function (e) {
  e.preventDefault()
  if (email) {
    window.location.replace("/MeusDados.html");
  } else {
    window.location.replace("/login.html");
  }
})


if (email) {
  $('.botao-sair').css('display', 'flex')
  $('.botao-sair').show()

}

$('.botao-sair').click(function (e) {
  localStorage.setItem('email', '')
  nome = localStorage.nome
  email = localStorage.getItem('email')
  $('.botao-sair').hide(3000)
  $('.nomeUsuario').html(`Tchau ${nome} `)
  $('.nomeUsuario').hide(3000)
  setTimeout(function () {
    $('.botao-sair').css('display', 'none')
    $('.nomeUsuario').css('display', 'none')
    localStorage.nome = ''
  }, 2500)
})

