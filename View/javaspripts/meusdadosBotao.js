$('.js-redirect').click(function (e) {
  const email = localStorage.getItem('email')
  e.preventDefault()
  if (email) {
    window.location.replace("/MeusDados.html");
  } else {
    window.location.replace("/login.html");
  }
})

