"use strict";
const http = require('http');
const link = require('url');
let port = 8149;

const headers = require("./headers.js").headers;
const methods = require("./methods.js");

//Create server connection
const server = http.createServer(function (request, response) {
  const parsedLink = link.parse(request.url,true);
  let pathname = parsedLink.pathname;
  let body = "";
  switch(request.method){
    case 'POST':
        request.on('data', (chunk) => {
          body+=chunk;
        })
        .on('end', () => {
          try{
            let query = JSON.parse(body);
            methods.methodPost(pathname,request,query,response);
          }
          catch(err){
            console.log(err);
          }
        })
        .on('error', (err) => {
          console.log(err.message);
        });
      break;

    case 'GET':
      request.on('data', (chunk) => {
        body+=chunk;
      })
      .on('end', () => {
          let query = parsedLink.query;
          methods.methodGet(pathname,request,query,response);
      })
      .on('error', (err) => {
        console.log(err.message);
      });
      break;

    default:
      response.writeHead(404,headers.plain);
      response.end();
      break;
  }

});
server.listen(port);
