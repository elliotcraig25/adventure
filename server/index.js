require('dotenv').config();
const express = require('express');
const massive = require('massive');
const sessions = require('express-session');
const testCtrl = require(`./controllers/testcontroller`);
const viewCtrl = require(`./controllers/view`);
const playCtrl = require(`./controllers/play`);
const userCtrl = require(`./controllers/user`);

const {
    SERVER_PORT, DB_CONNECTION, SESSIONT_SECRET
} = process.env;

const app = express();

app.use(express.json());

app.use(sessions({
    secret: SESSIONT_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: null 
}));

massive(DB_CONNECTION).then(db => {
    app.set('db', db);
    app.listen(SERVER_PORT, ()=>{
        console.log(
            `listening ${SERVER_PORT} listening ${SERVER_PORT}`
        )
    })
})

app.get(`/test`, testCtrl.testa);

app.post(`/getcategories`, viewCtrl.getCategoryItems);

app.get(`/playinfo/:id`, playCtrl.getPlayInfo);

app.get(`/api/abcdoption/:aid/:zid`, playCtrl.getOption);

app.post(`/api/user`, userCtrl.getUser);

app.post(`/auth/register`, userCtrl.register);

app.post(`/auth/login`, userCtrl.login);

app.post(`/auth/logout`, userCtrl.logout);

app.get('/api/user', userCtrl.getUser);