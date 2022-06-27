//Requisição feita só para ativar o banco de dados
$.ajax({ url: 'formulario', success(data) { } })

$('form').submit(function (e) {
  const nome = $('#name').val()
  const data = $('#data').val()
  const cpf = $('#cpf').val()
  const curso = $('.form-select').val()
  const email = $('#email').val().trim()
  const senha = $('#password').val()
  const confimacaoS = $('#Confirmpassword').val()

  let genero

  $('input:radio[name=genero]').each(function () {
    //Verifica qual está selecionado
    if ($(this).is(':checked')) genero = $(this).val()
  })

  $.ajax({
    url: 'formulario',
    data: {
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

    let boolean = ((dado['nomeRepetido'] == 'true') || (dado['emailRepetido'] == 'true'))




    if (boolean) {

      swal({
        title: "Ja cadastrado!",
        text: "Usuario ja cadastrado",
        icon: "warning",
      });

    } else {
      if (senha !== confimacaoS) {
        $('.alert').css('display', 'block')

      } else {
        salvar()
        localStorage.setItem('nome', nome.split(' ').slice(0, 1).join(' ').trim())
        localStorage.setItem('email', email)
        swal({
          title: "Sucesso!",
          text: "Cadastro realizado com sucesso!",
          icon: "success",
          buttons: {
            comprovante: 'Comprovante',
            Ok: 'Ok'
          }
        }).then((value) => {
          switch (value) {
            case 'Ok':
              $('body').fadeOut(2000)
              setTimeout(function () {
                window.location.replace("/index.html");
              }, 2000)
              break;
            case 'comprovante':
              let janela = window.open('', '', 'width=800, heigth=600')
              janela.document.write('<html><head>');
              janela.document.write('<title>Aluno da Falcudade Internacional do Pará</title></head>');
              janela.document.write('<body>');
              janela.document.write(`Confirmação de cadastro no curso ${curso} <br>`)
              janela.document.write(`Nome: ${nome} <br>`)
              janela.document.write(`CPF: ${cpf} <br>`)
              janela.document.write(`Email: ${email} <br>`)
              janela.document.write(`Data de Aniversario: ${data} <br>`)
              janela.document.write('</body> </html>')
              janela.document.close();
              janela.print();
              break;
          }
        });



      }
    }
  }
  function salvar() {
    $.ajax({
      url: 'formulario',
      method: 'post',
      data: {
        nome,
        data,
        cpf,
        genero,
        curso,
        email,
        senha
      },
      success(data) {

      },
      error(e) {
        console.log('post', e)
      },
    })
  }

  e.preventDefault()

})


