require('dotenv').config();
const express = require('express');
const massive = require('massive');
// const sessions = require('express-session');
const ctrl = require(`./controller`);

const {
    SERVER_PORT, DB_CONNECTION, SESSIONT_SECRET
} = process.env;

const app = express();

app.use(express.json());

// come back to sessions when i need it
// app.use(sessions({
//     secret: SESSIONT_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     maxAge: null 
// }));

massive(DB_CONNECTION).then(db => {
    app.set('db', db);
    app.listen(SERVER_PORT, ()=>{
        console.log(
            `listening ${SERVER_PORT} listening ${SERVER_PORT}`
        )
    })
})