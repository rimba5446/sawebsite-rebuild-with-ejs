const discord = require("discord.js");
const moment = require('moment');
require('moment-duration-format');
const { ChannelType, version} = require('discord.js');
const client = new discord.Client();
const { token, client_port, prefix, url_server, url_invite } = require("./config.json");
const port = client_port || 3001;
// const { render } = require('ejs');
const express = require('express');
const app = express();
// const path = require('path');
const router = express.Router();
app.use(express.static("styles/"));
app.set('view engine', 'ejs');

//protected file
function userIsAllowed(callback) {
    callback(false);
  };
  
  var protectPath = function(regex) {
    return function(req, res, next) {
      if (!regex.test(req.url)) { return next(); }
  
      userIsAllowed(function(allowed) {
        if (allowed) {
          next();
        } else {
          res.end('What are you doing');
        }
      });
    };
  };
  app.use(protectPath(/^\/assets\/.*$/));

//Change log Update
const contentUpdate1 ="SaWebsite Update V1.5.4";
const contentUpdate2 ="Fixed Bug Interaction & Api Callback Break";
const contentUpdate3 ="~";
const titleUpdate ="Sayuchan Update V1.4.5";

//AboutSayuchan
// const aboutSayuchan ="testing Content";
//AboutContent
const titleAbout ="RaykujanK13";
const contentAbout = "Hello, I'm RaykujanK13! Creator of Sayuchan and this website! Thank you for using Sayuchan and I hope it lives up to your expectations!";

//Status Project
const status = {
    status: 'Active',
}

app.use(async function(req, res, next) {
    req.client = client;
    next();
});

// pages
app.get('/', function(req, res) {
    res.render('index', {client: client});
});

app.get('/docs', function(req, res) {
    res.render('docs', {client: client, prefix: prefix, titleAbout:titleAbout, contentAbout:contentAbout, contentUpdate1:contentUpdate1, contentUpdate2:contentUpdate2, contentUpdate3:contentUpdate3, titleUpdate:titleUpdate});
});

app.get('/commands', function(req, res) {
    res.render('commands', {client: client, prefix: prefix});
});

app.get('/stats', function(req, res) {
    res.render('stats', {client: client, status: status, uptime: moment.duration(req.client.uptime).format(' D [days], H [hours], m [minutes], s [seconds]'), channelType: ChannelType, djsVersion: version});
});

app.get('/invite', function(req, res) {
    res.render('invite',{client: client, url_invite});
});

app.get('/support', function(req, res) {
    res.render('support',{client: client, url_server: url_server});
});

app.use(function (req, res) {
    res.status(404).render('404_old',{client: client});
});

//add the router
app.use('/', router);
app.listen(port, async function() {
    console.log(`Running at Port: ${port}`);
    console.log(`http://localhost:${port}`);
  });

client.on("ready", () => {
    console.log("there's someone i like :D")
  })

  
client.login(token)