/*
Crie uma aplicação Node.js usando Express e EJS para cadastro e visualização de uma lista de e-mails de uma newsletter fictícia. 
A aplicação deve ter três páginas:
Página inicial para cadastro na newsletter.
Página de sucesso para a qual o usuário será redirecionado após se cadastrar.
Página para visualizar a lista de todos os e-mails cadastrados.
Ao preencher o formulário de inscrição o e-mail deverá ser salvo no backend 
em um array em memória e o usuário deverá ser redirecionado para a página de sucesso com uma mensagem indicando 
que seu e-mail foi cadastrado.
Desafio Extra: Crie na página de visualização dos e-mails cadastrados um botão que permite excluir um e-mail da lista.
*/
const path = require('path')
const express = require('express')
const app = express()
const emails = []

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('form')
})

app.post('/register', (req,res) => {
    const {email,username} = req.body
    if (email && username) {
        emails.push({email, username})
        res.redirect('success')
    }else{
        res.send('Preencha todos os campos!')
    }
})

app.post('/remove', (req,res) => {
    const {email} = req.body
    if (email) {
        const index = emails.findIndex(e => e.email === email)
        if (index > -1) {
            emails.splice(index, 1)
            res.redirect('successRemove')
        } else {
            res.send('E-mail não encontrado!')
        }
    }else{
        res.send('Preencha todos os campos!')
    }
})

app.get('/success', (req, res) => {
    res.render('success')
})

app.get('/successRemove', (req, res) => {
    res.render('successRemove')
})

app.get('/emails', (req, res) => {
    res.render('emails', {emails})
    console.log(emails)
})


const PORT = 3000

app.listen(PORT, () => {
    console.log(`Servidor iniciado em http://localhost:${PORT}/`)
})
