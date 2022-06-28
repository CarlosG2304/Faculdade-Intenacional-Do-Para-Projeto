const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const db = require('../Model/database')
const mail = require('./mail')
app.use(express.static('View'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const porta = process.env.PORT || 8080



app.post('/envio', (req, res) => {
  mail(req.body.email, res)
})

app.get('/meusdados', (req, res) => {

  db('usuarios').where('email', '=', req.query.email)
    .then(data => res.send(data[0]))
})

app.get('/meusdados/verificacao', (req, res) => {

  dados = {
    verificacaoEmail: false,
    verificacaoNome: false
  }


  db('usuarios').whereNot('id', req.query.id).then(data => data.forEach(element => {



    if (element['email'] == req.query.email) {
      dados['verificacaoEmail'] = true
    }
    if (element['nome'] == req.query.nome) {
      dados['verificacaoNome'] = true
    }

  })).then(() => res.status(200).send(JSON.stringify(dados)))
    .catch(e => {
      console.log('Erro:', e.message);
    })


})

app.put('/meusdados', (req, res) => {

  db('usuarios').where('email', '=', req.body.email).update(req.body)
    .then(data => res.status(200).send(JSON.stringify(data)))

})

app.delete('/meusdados', (req, res) => {

  db('usuarios').delete().where('email', '=', req.body.email)
    .then(data => res.send('Usuario excluido com sucesso'))
    .catch(e => {
      console.log('Erro:', e.message);
    })

})

app.get('/autenticacao', (req, res) => {

  dados = {
    verificacaoEmail: false,
    verificacaoSenha: false
  }

  db('usuarios').select('email', 'senha').then(data => data.forEach(element => {



    if (element['email'] == req.query.email) {
      dados['verificacaoEmail'] = true

      if (element['senha'] == req.query.senha) {
        dados['verificacaoSenha'] = true
      }
    }


  })).then(() => res.status(200).send(JSON.stringify(dados)))
    .catch(e => {
      console.log('Erro:', e.message);
    })

})
app.get('/formulario', (req, res) => {

  dados = {
    nomeRepetido: 'false',
    emailRepetido: 'false'
  }
  db('usuarios').select('nome', 'email').then(data => data.forEach(element => {

    if (element['email'] == req.query.email) {
      dados['emailRepetido'] = 'true'
    }
    if (element['nome'] == req.query.nome) {
      dados['nomeRepetido'] = 'true'
    }

  })).then(() => res.status(200).send(JSON.stringify(dados)))
    .catch(e => {
      console.log('Erro:', e.message);
    })


})
app.post('/formulario', (req, res, next) => {

  const dados = {
    nome: req.body.nome,
    dataNascimento: req.body.data,
    cpf: req.body.cpf,
    curso: req.body.curso,
    genero: req.body.genero,
    email: req.body.email,
    senha: req.body.senha,


  }
  console.log(dados)
  insert = db('usuarios').insert(dados);

  insert.then(data => {
    res.send(data)
  }).catch(e => {
    console.log('Erro:', e.message);
  })
})


app.listen(porta)