require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

//CONECTA COM O BD
mongoose.connect(process.env.CONNECTIONSTRING)  //retorna uma promise
    .then(() => {
        app.emit('pronto');
    })
    .catch((err) => console.log('Erro na conexão com o Banco de Dados.'));

//CRIA SESSION E FLASH MESSAGES
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const csrf = require('csurf');
const { checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

//CONFIGURA REQ.BODY
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

//PASTA "PUBLIC" ESTÁTICA
app.use(express.static(path.resolve(__dirname, 'public')));

// CONFIGURA SESSION
const sessionOptions = session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    } 
});
app.use(sessionOptions);
app.use(flash());

//CONFIGURA "VIEWS"
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//MIDDLEWARE GLOBAL E ROUTES
app.use(csrf());
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);

//ESCUTA O SERVIDOR
app.on('pronto', () => {
    app.listen(3000,  () => {
        console.log('executando em: http://localhost:3000');
    });
});
