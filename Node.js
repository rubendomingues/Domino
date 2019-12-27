const http = require('http');
const link = require('url');
let file = require('fs');
let port = 8149;

//Headers
const headers = {
    plain: {
        'Content-Type': 'application/javascript',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
    },
    sse: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
        'Connection': 'keep-alive'
    }
};

let accounts = [];

if(!file.existsSync("accounts.json")) {
  let myObject = new ActiveXObject("Scripting.FileSystemObject");
  let newfile = myObject.CreateTextFile("accounts.json", false);
}

//Store all the accounts registred at the moment
function readFile(){
  let data = file.readFileSync("accounts.json");
  if(data.length === 0)
    return;
  let parsedData = JSON.parse(data.toString())["users"];
  for(let i = 0; i< parsedData.length; i++){
    accounts.push(parsedData[i]);
  }
}

//Register new account
function registerAccount(data){
  accounts.push(data);
  let finalData = {users:accounts};
  file.writeFileSync("./accounts.json", JSON.stringify(finalData));;
}

readFile();

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
            methodPost(pathname,request,query,response);
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

function methodPost(pathname,request,query,response){
  switch(pathname){
    case "/register":
      registerServer(query.nick,query.pass,response);
      break;

    case "/join":
      joinGameServer(query.group,query.nick,query.pass)
      break;

    case "/leave":
      leaveGameServer(query.game,query.nick,query.pass);
      break;

    case "/notify":

      break;

    case "/ranking":
      rankingServer();
      break;
  }
}

function registerServer(name,pass,response){
  let notRegistred = 1 ;
  if(name === "" || pass === ""){
    let answer = JSON.stringify({error: "User and Password can't be empty"});
    response.writeHead(400,headers.plain);
    response.write(answer);
    response.end();
    return;
  }
  for(let i=0; i<accounts.length; i++){
    if(accounts[i].nick === name && accounts[i].pass === pass){
      notRegistred = 0;
      let answer = JSON.stringify({});
      response.writeHead(200,headers.plain);
      response.write(answer);
      response.end();
      break;
    }
    else if(accounts[i].nick === name && accounts[i].pass !== pass){
      notRegistred = 0;
      let answer = JSON.stringify({error: "Wrong User or Password"});
      response.writeHead(400,headers.plain);
      response.write(answer);
      response.end();
      break;
    }
  }
  if(notRegistred === 1){
    let answer = JSON.stringify({});
    const conta = {
      nick : name,
      pass : pass,
      games : 0,
      wins : 0
    };
    registerAccount(conta);
    response.writeHead(200,headers.plain);
    response.write(answer);
    response.end();
  }
}
