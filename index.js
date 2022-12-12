const discord = require("discord.js");
const client = new discord.Client();
const { token } = require("./config.json");
// const { render } = require('ejs');
const express = require('express');
const app = express();
// const path = require('path');
const router = express.Router();
app.use(express.static("styles"));
app.use(express.static("assets"));
app.set('view engine', 'ejs');


const status = {
    status: 'Active',
}

const prefix = {
    prefix: 's!',
}

// index page
app.get('/', function(req, res) {
    res.render('index', {client: client});
});

app.get('/docs', function(req, res) {
    res.render('docs', {client: client, prefix: prefix});
});

app.get('/commands', function(req, res) {
    res.render('commands', {client: client, prefix: prefix});
});

app.get('/stats', function(req, res) {
    res.render('stats', {client: client, status: status});
});

// app.get('/invite', function(req, res) {
//     res.render('invite');
// });

// app.get('/support', function(req, res) {
//     res.render('support');
// });

app.use(function (req, res) {
    res.status(404).render('404');
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

client.on("ready", () => {
    client.user.setStatus("online"); // You Can Set It To dnd, online, idle. dont set it to offline plz  
  });

// client.on("ready", () => {
//     console.log("I am Looking Forward to this :D")
//   })

client.login(token)
console.log('Running at Port 3000');