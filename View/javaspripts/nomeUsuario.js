let nome = localStorage.nome
console.log(nome)
if (nome) {
  $('.nomeUsuario').css('display', 'flex')
  $('.nomeUsuario').show()
  $('.nomeUsuario').append(`Ola,${nome}!`)
}