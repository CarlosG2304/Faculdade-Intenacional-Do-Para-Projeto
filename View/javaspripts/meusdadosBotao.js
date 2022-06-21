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
  $('.borda-sair').css('display', 'flex')
} else {
  $('.borda-sair').css('display', 'none')
}

