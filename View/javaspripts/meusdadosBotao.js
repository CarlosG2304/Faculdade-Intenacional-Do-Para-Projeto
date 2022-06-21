const email = localStorage.getItem('email')

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
} else {
  $('.botao-sair').css('display', 'none')
}

