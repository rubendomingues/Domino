const http = require('http');
const link = require('url');
let port = 8149;

let accounts = [];
let rankings = [];

//Store all the accounts registred at the moment
require('fs').readFile("accounts.json", (err, data) => {
  if(err) throw err;
  let parsedData = JSON.stringify(data).split("\n");
  for(let i=0; i<parsedData.length; i++){
    accounts.push(JSON.parse(parsedData[i]));
  }
});

//Register new account
function registerAccount(data){
  require('fs').writeFile("accounts.json", JSON.stringify(data), (err) => {
    if(err) throw err;
  });
}

//Store all the rankings
function readRankings(){
  require('fs').readFile("rankings.json", (err,data) => {
    if(err) throw err;
    let parsedData = data.split("\n");
    for(let i=0; i<parsedData.length; i++){
      rankings.push(JSON.parse(parsedData[i]));
    }
  });
}

//Create server connection
const server = http.createServer(function (request, response) {
  const parsedLink = link.parse(request.url,true);
  const query = parsedLink.query;
  switch(request.method){
    case 'POST':
        request.on('data', (chunk) => {
          body+=cunk;
        })
        .on('end', () => {
          try{
            query = JSON.parse(body);
            methodPost(pathname,request,query;
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
      //*FINISH UPDATE*
      break;
  }

});

server.listen(port);

function methodPost(pathname,request,response){
  switch(pathname){
    case "/register":

      break;

    case "/join":

      break;

    case "/leave":

      break;

    case "/notify":

      break;

    case "/ranking":

      break;
  }
}
