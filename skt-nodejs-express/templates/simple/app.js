const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require("serve-static");

global.__BASEDIR = __dirname + '/';

const app = express();

app.use(
  serveStatic(path.join(__dirname, "public"), {
    maxAge: "1m"
  })
);
app.use(express.static(path.join(__BASEDIR, '/public')));		//static resource 폴더 
app.use(bodyParser.urlencoded({extended:false}));				//include request 객체 parser

app.use(function(req, res, next) {
  let pathname = req.url;
  
  if(pathname === "/") {
    let html = "";
    html = "<h1>Appsody nodejs-express Sample</h1>"+
    "<ul>"+
    "<li><a href=\"/\" target=\"_self\">Home</a></li>"+
    "<li><a href=\"/appmetrics-dash\" target=\"_New\">Dashboard</a></li>"+
    "<li><a href=\"/live\" target=\"_New\">Liveness</a></li>"+
    "<li><a href=\"/ready\" target=\"_New\">Readiness</a></li>"+
    "<li><a href=\"/health\" target=\"_New\">Health check</a></li>"+
    "<li><a href=\"/metrics\" target=\"_New\">Metrics</a></li>"+
    "</ul>";


    res.writeHead(200, { 'Content-Type':'text/html; charset=utf-8' });
    res.write(html);
    res.end();
  } else {
    next();
  }

});
 
module.exports.app = app;

