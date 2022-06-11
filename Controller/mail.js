const res = require('express/lib/response')
const nodemailer = require('nodemailer')


user = 'fipsuperior@yahoo.com'

module.exports = function envioDeEmail(email, res) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'efrain.prohaska53@ethereal.email',
      pass: 'NEaCtdpHDctxDE4rDb'
    }
  });
  transporter.sendMail({
    from: user,
    to: email,
    replyTo: user,
    subject: 'Ola, Seja bem vindo!',
    text: 'Bem vindo a FIP! Seu cadastro foi feito com sucesso!'
  }).then(info => {
    res.send(info)
  }).catch(erro => {
    console.log(erro)
  })

}



