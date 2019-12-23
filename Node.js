const http = require('http');
const link = require('url');
let port = 8149;

let accounts = [];
let rankings = [];

let file = require('fs');

//Store all the accounts registred at the moment
function readFile(){
  let data = file.readFileSync("accounts.json");
  let parsedData = JSON.parse(data);
  parsedData = JSON.stringify(parsedData);
  let tempData = "";
  //Parse the info
  for(let i=0; i < parsedData.length; i++){
    if(parsedData[i] === '[' || parsedData[i] === ']'){
      continue;
    }
    if(parsedData[i] === '}'){
      tempData = tempData.concat(parsedData[i]);
      tempData = tempData.concat("\n");
      i++;
      continue;
    }
    tempData = tempData.concat(parsedData[i]);
  }
  //Store the info
  let finalData = tempData.split("\n");
  for(let i = 0; i< finalData.length-1; i++){
    accounts.push(JSON.parse(finalData[i]));
  }
}

//Store all the rankings
function readRankings(){
  let data = file.readFileSync("rankings.json");
  let parsedData = JSON.parse(data);
  parsedData = JSON.stringify(parsedData);
  let tempData = "";
  //Parse the info
  for(let i=0; i < parsedData.length; i++){
    if(parsedData[i] === '[' || parsedData[i] === ']'){
      continue;
    }
    if(parsedData[i] === '}'){
      tempData = tempData.concat(parsedData[i]);
      tempData = tempData.concat("\n");
      i++;
      continue;
    }
    tempData = tempData.concat(parsedData[i]);
  }
  //Store the info
  let finalData = tempData.split("\n");
  for(let i = 0; i< finalData.length-1; i++){
    rankings.push(JSON.parse(finalData[i]));
  }
}

//Register new account
function registerAccount(data){
  accounts.push(data);
  file.writeFile("./accounts.json", JSON.stringify(accounts), (err) => {
    if(err) throw err;
  });
}

//Create server connection
const server = http.createServer(function (request, response) {
  const parsedLink = link.parse(request.url,true);
  const query = parsedLink.query;
  switch(request.method){
    case 'POST':
        request.on('data', (chunk) => {
          body+=chunk;
        })
        .on('end', () => {
          try{
            query = JSON.parse(body);
            methodPost(pathname,request,query);
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
      registerServer(query.nick,query.pass);
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

function registerServer(name,pass){
  for(let conta in accounts){
    if(conta.nick === name && conta.pass === pass){
      let answer = JSON.stringify("");
      return answer;
    }
    else if(conta.nick === name && conta.pass !== pass){
      let answer = JSON.stringify("Wrong Password");
      return answer;
    }
    else{
      let answer = JSON.stringify("");
      const conta = {
        nick : name,
        pass : pass
      };
      accounts.push(JSON.parse(conta));
      registerAccount(conta);
      return answer;
    }
  }
}
