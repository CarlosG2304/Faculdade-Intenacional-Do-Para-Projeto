$('.js-redirect').click(function (e) {
  const email = localStorage.getItem('email')
  e.preventDefault()
  if (email) {
    window.location.replace("/meusDados.html");
  } else {
    window.location.replace("/login.html");
  }
})

