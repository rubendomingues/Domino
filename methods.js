const file = require('fs');
const crypto = require('crypto');
const headers = require("./headers.js").headers;

let accounts = [];
var games = [];

if(file.existsSync("accounts.json")) {
  readFile();
  orderServerScores();
}

class Board{
  constructor(line,stock,count,piece,place){
    this.line = line;
    this.stock = stock;
    this.count = count;
    this.piece = piece;
    this.place = place;
  }
  //----------------------------
  getLine(){
    return this.line;
  }
  setLine(line){
    this.line = line;
  }
  //----------------------------
  getStock(){
    return this.stock;
  }
  setStock(stock){
    this.stock = stock;
  }
  //----------------------------
  getCount(){
    return this.count;
  }
  setCount(count){
    this.count = count;
  }
  //----------------------------
  getPiece(){
    return this.piece;
  }
  setPiece(piece){
    this.piece = piece;
  }
  //----------------------------
  getPlace(){
    return this.place;
  }
  setPlace(place){
    this.place = place;
  }
  //----------------------------
};

class Game{
  constructor(group,player1,player2,turn,board,status,stock,maxpiece,respPlayer1,respPlayer2,countDraw,afkTimer,winner){
    this.gameId = crypto.createHash('md5').update(group).digest('hex');
    this.player1 = player1;
    this.player2 = player2;
    this.turn = turn;
    this.board = board;
    this.status = status;
    this.stock = stock;
    this.winner = winner;
    this.maxpiece = maxpiece;
    this.respPlayer1 = respPlayer1;
    this.respPlayer2 = respPlayer2;
    this.countDraw = countDraw;
    this.afkTimer = afkTimer;
  }
  //----------------------------
  getGameId(){
    return this.gameId;
  }
  setGameId(group){
    this.gameId = crypto.createHash('md5').update(group).digest('hex');
  }
  //----------------------------
  getPlayer1(){
    return this.player1;
  }
  setPlayer1(player1){
    this.player1 = player1;
  }
  //----------------------------
  getPlayer2(){
    return this.player2;
  }
  setPlayer2(player2){
    this.player2 = player2;
  }
  //----------------------------
  getTurn(){
    return this.turn;
  }
  setTurn(turn){
    this.turn = turn;
  }
  //----------------------------
  getBoard(){
    return this.board;
  }
  setBoard(board){
    this.board = board;
  }
  //----------------------------
  getStatus(){
    return this.status;
  }
  setStatus(status){
    this.status = status;
  }
  //----------------------------
  getStock(){
    return this.stock;
  }
  setStock(stock){
    this.stock = stock;
  }
  //----------------------------
  getWinner(){
    return this.winner;
  }
  setWinner(winner){
    this.winner = winner;
  }
  //----------------------------
  getMaxpiece(){
    return this.maxpiece;
  }
  setMaxpiece(maxpiece){
    this.maxpiece = maxpiece;
  }
  //----------------------------
  getRespPlayer1(){
    return this.respPlayer1;
  }
  setRespPlayer1(respPlayer1){
    this.respPlayer1 = respPlayer1;
  }
  //----------------------------
  getRespPlayer2(){
    return this.respPlayer2;
  }
  setRespPlayer2(respPlayer2){
    this.respPlayer2 = respPlayer2;
  }
  //----------------------------
  getCountDraw(){
    return this.countDraw;
  }
  setCountDraw(countDraw){
    this.countDraw = countDraw;
  }
  //----------------------------
  getAfkTimer(){
    return this.afkTimer;
  }
  setAfkTimer(afkTimer){
    this.afkTimer = afkTimer;
  }
  //----------------------------
};

module.exports.methodPost = function (pathname,request,query,response){
  switch(pathname){
    case "/register":
      registerServer(query.nick,query.pass,response);
      break;

    case "/join":
      joinGameServer(query.group,query.nick,query.pass,response)
      break;

    case "/leave":
      leaveGameServer(query.game,query.nick,query.pass,response);
      break;

    case "/notify":
      notifyGameServer(query.nick,query.pass,query.game,query.side,query.piece,query.skip,response);
      break;

    case "/ranking":
      rankingServer(response);
      break;

    default:
      response.writeHead(404,headers.plain);
      response.end();
      break;
  }
}

module.exports.methodGet = function (pathname,request,query,response){
  switch(pathname){
    case "/":
      file.readFile(__dirname+"/index.html", function (err,info){
        if(err){
          response.writeHead(404);
          response.end();
        }
        else{
          response.writeHead(200,headers.html);
          response.write(info);
          response.end();
        }
      });
      break;
    case "/update":
      updateGameServer(query.nick,query.game,response);
      break;
    default:
      file.readFile(__dirname+pathname, function (err,info){
        if(err){
          response.writeHead(404);
          response.end();
        }
        else{
          switch(pathname){
            case "/domino.css":
            response.writeHead(200,headers.css);
            break;
            case "/background.jpg":
            response.writeHead(200,headers.jpg);
            break;
            case "/button.jpg":
            response.writeHead(200,headers.jpg);
            break;
            case "/canvas.js":
            response.writeHead(200,headers.plain);
            break;
            case "/clock.js":
            response.writeHead(200,headers.plain);
            break;
            case "/domino.js":
            response.writeHead(200,headers.plain);
            break;
            case "/headers.js":
            response.writeHead(200,headers.plain);
            break;
            case "/icon.png":
            response.writeHead(200,headers.png);
            break;
            case "/index.js":
            response.writeHead(200,headers.plain);
            break;
            case "/methods.js":
            response.writeHead(200,headers.plain);
            break;
            case "/tab.jpeg":
            response.writeHead(200,headers.jpeg);
            break;
            case "/teste.js":
            response.writeHead(200,headers.plain);
            break;
          }
          response.write(info);
          response.end();
        }
      });
      break;
  }
}

function updateGameServer(name,game,response){
  if(name === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "User is undefined"}));
    response.end();
    return;
  }
  else if(game === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "Game is undefined"}));
    response.end();
    return;
  }
  let roomPlaying=-1;
  for(let i=0; i<games.length; i++){
    if(games[i].getGameId()=== game){
      roomPlaying = i;
      if(games[i].getPlayer1() === name && games[i].getRespPlayer1() === null){
        games[i].setRespPlayer1(response);
        response.writeHead(200,headers.sse);
        return;
      }
      else if(games[i].getPlayer2() === name && games[i].getRespPlayer2() === null){
        games[i].setRespPlayer2(response);
        response.writeHead(200,headers.sse);
        let data = dataServer(i);
        if(games[i].getRespPlayer1()!==null)
          games[i].getRespPlayer1().write('data: '+ data +'\n\n');
        if(games[i].getRespPlayer2()!==null)
          games[i].getRespPlayer2().write('data: '+ data +'\n\n');
        return;
      }
    }
  }

  if(roomPlaying == -1){
    response.writeHead(200, headers.sse);
    response.write(JSON.stringify({error: "Invalid game reference"}));
    response.end();
    return;
  }
  else{
    let data = dataServer(roomPlaying);
    if(games[roomPlaying].getRespPlayer1()!==null)
      games[roomPlaying].getRespPlayer1().write('data: '+ data +'\n\n');
    if(games[roomPlaying].getRespPlayer2()!==null)
      games[roomPlaying].getRespPlayer2().write('data: '+ data +'\n\n');
  }
}

function notifyGameServer(name,pass,game,side,piece,skip,response){
  if(name === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "User is undefined"}));
    response.end();
    return;
  }
  else if(pass === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "Password is undefined"}));
    response.end();
    return;
  }
  else if(game === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "Password is undefined"}));
    response.end();
    return;
  }
  else if(name === "" || pass === ""){
    let answer = JSON.stringify({error: "User and Password can't be empty"});
    response.writeHead(401,headers.plain);
    response.write(answer);
    response.end();
    return;
  }
  else{
    let notRegistred=1;
    for(let i=0; i<accounts.length; i++){
      const hash = crypto.createHash('md5').update(pass).digest('hex');
      if(accounts[i].nick === name && accounts[i].pass !== hash){
        notRegistred = 0;
        let answer = JSON.stringify({error: "Wrong Password"});
        response.writeHead(401,headers.plain);
        response.write(answer);
        response.end();
        return;
      }
      else if(accounts[i].nick === name && accounts[i].pass === hash){
        notRegistred = 0;
        break;
      }
    }
    if(notRegistred == 1){
      let answer = JSON.stringify({error: "Account does not Exist"});
      response.writeHead(401,headers.plain);
      response.write(answer);
      response.end();
      return;
    }
  }

  let roomPlaying = -1;
  for(let i=0; i<games.length; i++){
    if(games[i].getGameId() === game){
      roomPlaying= i;
      break;
    }
  }
  clearTimeout(games[roomPlaying].getAfkTimer());
  // countAfk(roomPlaying);
  if(typeof skip !== 'undefined'){
    if(games[roomPlaying].getBoard().getStock() === 0){
      games[roomPlaying].setCountDraw(games[roomPlaying].getCountDraw()++);
      if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer1())
        games[roomPlaying].setTurn(games[roomPlaying].getPlayer2());
      else if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer2()){
        games[roomPlaying].setTurn(games[roomPlaying].getPlayer1());
      }
      let data = dataServer(roomPlaying);
      if(games[roomPlaying].getRespPlayer2()!==null)
        games[roomPlaying].getRespPlayer2().write('data: '+ data +'\n\n');
      if(games[roomPlaying].getRespPlayer1()!==null)
        games[roomPlaying].getRespPlayer1().write('data: '+ data +'\n\n');
    }
    else{
      response.writeHead(400,headers.plain);
      response.write(JSON.stringify({error : "Deck is not empty!"}));
      response.end();
      return;
    }
  }
  else if(piece === null){
    let tempStock = games[roomPlaying].getStock();
    let rand = Math.floor(Math.random() * tempStock.length);
    let newpiece = tempStock[rand];
    tempStock.splice(rand,1);
    games[roomPlaying].setStock(tempStock);
    games[roomPlaying].getBoard().setStock(tempStock.length);
    let count = games[roomPlaying].getBoard().getCount();
    count[name]++;
    games[roomPlaying].getBoard().setCount(count);
    response.writeHead(200,headers.plain);
    response.write(JSON.stringify({piece : newpiece}));
    response.end();
    let data = dataServer(roomPlaying);
    if(games[roomPlaying].getRespPlayer2()!==null)
      games[roomPlaying].getRespPlayer2().write('data: '+ data +'\n\n');
    if(games[roomPlaying].getRespPlayer1()!==null)
      games[roomPlaying].getRespPlayer1().write('data: '+ data +'\n\n');
    return;
  }
  else{
    if(games[roomPlaying].getBoard().getLine().length == 0){
      let count = games[roomPlaying].getBoard().getCount();
      count[name]--;
      games[roomPlaying].getBoard().setCount(count);
      let line = games[roomPlaying].getBoard().getLine();
      line.push(piece);
      games[roomPlaying].getBoard().setPiece(piece);
      games[roomPlaying].getBoard().setPlace("start");
      games[roomPlaying].getBoard().setLine(line);
      if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer1())
        games[roomPlaying].setTurn(games[roomPlaying].getPlayer2());
      else if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer2()){
        games[roomPlaying].setTurn(games[roomPlaying].getPlayer1());
      }
    }
    else{
      let line = games[roomPlaying].getBoard().getLine();
      if(side === null){
        let sideplay = 0;
        if(piece[0] == line[line.length-1][1])
          sideplay++;
        if(piece[1] == line[0][0])
          sideplay++;
        if(sideplay == 2){
          response.writeHead(400,headers.plain);
          response.write(JSON.stringify({error : "Select side!"}));
          response.end();
          return;
        }
        else if(sideplay == 1){
          if(piece[0] == line[line.length-1][1]){
            games[roomPlaying].setCountDraw(0);
            line.push(piece);
            let count = games[roomPlaying].getBoard().getCount();
            count[name]--;
            games[roomPlaying].getBoard().setCount(count);
            games[roomPlaying].getBoard().setLine(line);
            games[roomPlaying].getBoard().setPiece(piece);
            games[roomPlaying].getBoard().setPlace("end");
            if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer1())
              games[roomPlaying].setTurn(games[roomPlaying].getPlayer2());
            else if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer2())
              games[roomPlaying].setTurn(games[roomPlaying].getPlayer1());
          }
          else if(piece[1] == line[0][0]){
            games[roomPlaying].setCountDraw(0);
            line.unshift(piece);
            let count = games[roomPlaying].getBoard().getCount();
            count[name]--;
            games[roomPlaying].getBoard().setCount(count);
            games[roomPlaying].getBoard().setLine(line);
            games[roomPlaying].getBoard().setPiece(piece);
            games[roomPlaying].getBoard().setPlace("start");
            if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer1())
              games[roomPlaying].setTurn(games[roomPlaying].getPlayer2());
            else if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer2())
              games[roomPlaying].setTurn(games[roomPlaying].getPlayer1());
          }
        }
      }

      if(side === "start"){
        if(piece[1] == line[0][0]){
          games[roomPlaying].setCountDraw(0);
          line.unshift(piece);
          let count = games[roomPlaying].getBoard().getCount();
          count[name]--;
          games[roomPlaying].getBoard().setCount(count);
          games[roomPlaying].getBoard().setLine(line);
          games[roomPlaying].getBoard().setPiece(piece);
          games[roomPlaying].getBoard().setPlace("start");
          if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer1())
            games[roomPlaying].setTurn(games[roomPlaying].getPlayer2());
          else if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer2())
            games[roomPlaying].setTurn(games[roomPlaying].getPlayer1());
        }
        else if(piece[0] == line[0][0]){
          games[roomPlaying].setCountDraw(0);
          let temp = [piece[1],piece[0]];
          line.unshift(temp);
          let count = games[roomPlaying].getBoard().getCount();
          count[name]--;
          games[roomPlaying].getBoard().setCount(count);
          games[roomPlaying].getBoard().setLine(line);
          games[roomPlaying].getBoard().setPiece(piece);
          games[roomPlaying].getBoard().setPlace("start");
          if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer1())
            games[roomPlaying].setTurn(games[roomPlaying].getPlayer2());
          else if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer2())
            games[roomPlaying].setTurn(games[roomPlaying].getPlayer1());
        }
        else{
          response.writeHead(400,headers.plain);
          response.write(JSON.stringify({error : "Can't play piece!"}));
          response.end();
          return;
        }
      }
      else if(side === "end"){
        if(piece[0] == line[line.length-1][1]){
          games[roomPlaying].setCountDraw(0);
          line.push(piece);
          let count = games[roomPlaying].getBoard().getCount();
          count[name]--;
          games[roomPlaying].getBoard().setCount(count);
          games[roomPlaying].getBoard().setLine(line);
          games[roomPlaying].getBoard().setPiece(piece);
          games[roomPlaying].getBoard().setPlace("end");
          if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer1())
            games[roomPlaying].setTurn(games[roomPlaying].getPlayer2());
          else if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer2())
            games[roomPlaying].setTurn(games[roomPlaying].getPlayer1());
        }
        else if(piece[1] == line[line.length-1][1]){
          games[roomPlaying].setCountDraw(0);
          let temp = [piece[1],piece[0]];
          line.push(temp);
          let count = games[roomPlaying].getBoard().getCount();
          count[name]--;
          games[roomPlaying].getBoard().setCount(count);
          games[roomPlaying].getBoard().setLine(line);
          games[roomPlaying].getBoard().setPiece(piece);
          games[roomPlaying].getBoard().setPlace("end");
          if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer1())
            games[roomPlaying].setTurn(games[roomPlaying].getPlayer2());
          else if(games[roomPlaying].getTurn() === games[roomPlaying].getPlayer2())
            games[roomPlaying].setTurn(games[roomPlaying].getPlayer1());
        }
        else{
          response.writeHead(400,headers.plain);
          response.write(JSON.stringify({error : "Can't play piece!"}));
          response.end();
          return;
        }
      }

    }

    checkWinner(roomPlaying);
    if(typeof games[roomPlaying].getWinner() === 'undefined'){
        let timeout = setTimeout(function() {
        countAfk(game);
    }, 120000);
  		games[roomPlaying].setAfkTimer(timeout);
    }

    if(typeof games[roomPlaying] === 'undefined')
      return;

    let data = dataServer(roomPlaying);
    response.writeHead(200,headers.plain);
    response.write(JSON.stringify({}));
    response.end();
    if(games[roomPlaying].getRespPlayer2()!==null)
      games[roomPlaying].getRespPlayer2().write('data: '+ data +'\n\n');
    if(games[roomPlaying].getRespPlayer1()!==null)
      games[roomPlaying].getRespPlayer1().write('data: '+ data +'\n\n');
    if(typeof games[roomPlaying].getWinner() !== 'undefined'){
      if(games[roomPlaying].getRespPlayer1()!==null){
        games[roomPlaying].getRespPlayer1().end();
      }
      if(games[roomPlaying].getRespPlayer2()!==null){
        games[roomPlaying].getRespPlayer2().end();
      }
    }

  }
}

function checkWinner(i){
  let count = games[i].getBoard().getCount();
  if (games[i].getCountDraw() == 3){
    if(accounts[j].nick === games[i].getPlayer2()){
      accounts[j].games++;
    }
    if(accounts[j].nick === games[i].getPlayer1()){
      accounts[j].games++;
    }
    updateServerRanks();
    games[i].setWinner("draw");
  }
  else if (count[games[i].getPlayer1()] === 0){
    for(let j=0; j<accounts.length; j++){
      if(accounts[j].nick === games[i].getPlayer1()){
        accounts[j].victories++;
        accounts[j].games++;
      }
      if(accounts[j].nick === games[i].getPlayer2()){
        accounts[j].games++;
      }
    }
    orderServerScores();
    updateServerRanks();
    games[i].setWinner(games[i].getPlayer1());
  }
  else if (count[games[i].getPlayer2()] === 0){
    for(let j=0; j<accounts.length; j++){
      if(accounts[j].nick === games[i].getPlayer2()){
        accounts[j].victories++;
        accounts[j].games++;
      }
      if(accounts[j].nick === games[i].getPlayer1()){
        accounts[j].games++;
      }
    }
    orderServerScores();
    updateServerRanks();
    games[i].setWinner(games[i].getPlayer2());
  }
}

function dataServer(i){
  let board = {
    line : games[i].getBoard().getLine(),
    stock : games[i].getBoard().getStock(),
    count : games[i].getBoard().getCount(),
    piece : games[i].getBoard().getPiece(),
    place : games[i].getBoard().getPlace()
  };
  let data = {
    board : board,
    turn : games[i].getTurn(),
    winner : games[i].getWinner()
  };
  data = JSON.stringify(data);
  return data;
}
function rankingServer(response){
  orderServerScores();
  let ranks = [];

  let conta = {
    nick : "",
    games : 0,
    victories: 0
  };

  for(let i=0; i<accounts.length; i++){
    if(i == 10)
      break;
    let conta = {
      nick : accounts[i].nick,
      games : accounts[i].games,
      victories: accounts[i].victories
    };
    ranks.push(conta);
  }
  ranks = {ranking: ranks};
  response.writeHead(200,headers.plain);
  response.write(JSON.stringify(ranks));
  response.end();

}

function registerServer(name,pass,response){
  let notRegistred = 1 ;

  if(name === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "User is undefined"}));
    response.end();
    return;
  }
  else if(pass === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "Password is undefined"}));
    response.end();
    return;
  }

  if(name === "" || pass === ""){
    let answer = JSON.stringify({error: "User and Password can't be empty"});
    response.writeHead(401,headers.plain);
    response.write(answer);
    response.end();
    return;
  }
  for(let i=0; i<accounts.length; i++){
    const hash = crypto.createHash('md5').update(pass).digest('hex');
    if(accounts[i].nick === name && accounts[i].pass === hash){
      notRegistred = 0;
      let answer = JSON.stringify({});
      response.writeHead(200,headers.plain);
      response.write(answer);
      response.end();
      break;
    }
    else if(accounts[i].nick === name && accounts[i].pass !== hash){
      notRegistred = 0;
      let answer = JSON.stringify({error: "Wrong Password"});
      response.writeHead(401,headers.plain);
      response.write(answer);
      response.end();
      break;
    }
  }
  if(notRegistred === 1){
    let answer = JSON.stringify({});
    const hash = crypto.createHash('md5').update(pass).digest('hex');
    const conta = {
      nick : name,
      pass : hash,
      games : 0,
      victories : 0
    };
    registerAccount(conta);
    response.writeHead(200,headers.plain);
    response.write(answer);
    response.end();
  }
}

function joinGameServer(group,name,pass,response){
  let foundRoom = 0;
  if(name === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "User is undefined"}));
    response.end();
    return;
  }
  else if(pass === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "Password is undefined"}));
    response.end();
    return;
  }
  else if(group === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "Group is undefined"}));
    response.end();
    return;
  }
  else if(name === "" || pass === ""){
    let answer = JSON.stringify({error: "User and Password can't be empty"});
    response.writeHead(401,headers.plain);
    response.write(answer);
    response.end();
    return;
  }
  else{
    let notRegistred=1;
    for(let i=0; i<accounts.length; i++){
      const hash = crypto.createHash('md5').update(pass).digest('hex');
      if(accounts[i].nick === name && accounts[i].pass !== hash){
        notRegistred = 0;
        let answer = JSON.stringify({error: "Wrong Password"});
        response.writeHead(401,headers.plain);
        response.write(answer);
        response.end();
        return;
      }
      else if(accounts[i].nick === name && accounts[i].pass === hash){
        notRegistred = 0;
        break;
      }
    }
    if(notRegistred == 1){
      let answer = JSON.stringify({error: "Account does not Exist"});
      response.writeHead(401,headers.plain);
      response.write(answer);
      response.end();
      return;
    }
  }
  for(let i=0; i<games.length; i++){
    const hash = crypto.createHash('md5').update(group).digest('hex');
    if(games[i].getGameId() === hash){
      foundRoom = 1;
      if(games[i].getStatus() === "waiting"){
        if(games[i].getPlayer1() === name){
          response.writeHead(400,headers.plain);
          response.write(JSON.stringify({error: "Already in this room"}));
          response.end();
          break;
        }
        games[i].setPlayer2(name);
        games[i].setStatus("ready");
        let player2Hand = giveServerHand(games[i].getStock(),i,games[i].getPlayer2());
        let count = games[i].getBoard().getCount();
        count[name] = 7;
        games[i].getBoard().setCount(count);
        response.writeHead(200,headers.plain);
        response.write(JSON.stringify({hand:player2Hand,game: games[i].getGameId()}));
        response.end();
        break;
      }
      else{
        response.writeHead(400,headers.plain);
        response.write(JSON.stringify({error: "Game in Progress"}));
        response.end();
        break;
      }
    }
  }
  if(foundRoom === 0){
    let stock = createRoomStock();
    let count = {};
    count[name] = 7;
    let newBoard = new Board([],14,count,null,"");
    let newGame = new Game(group,name,"","",newBoard,"waiting", stock,0,null,null,0);
    const hash = crypto.createHash('md5').update(group).digest('hex');
    games.push(newGame);
    let timeout = setTimeout(function() { countAfk(hash); }, 120000);
    games[games.length-1].setAfkTimer(timeout);
    let player1Hand = giveServerHand(games[games.length-1].getStock(),games.length-1,games[games.length-1].getPlayer1());
    response.writeHead(200,headers.plain);
    response.write(JSON.stringify({hand:player1Hand,game: games[games.length-1].getGameId()}));
    response.end();
  }
}

function countAfk(id){
  let room = 0;
  for(let i=0; i<games.length; i++){
    if(games[i].getGameId() === id){
      room = i;
      if(games[i].getStatus() === "ready"){
        if(games[i].getTurn() === games[i].getPlayer2()){
          for(let j=0; j<accounts.length; j++){
            if(accounts[j].nick === games[i].getPlayer1()){
              accounts[j].victories++;
              accounts[j].games++;
            }
            if(accounts[j].nick === games[i].getPlayer2()){
              accounts[j].games++;
            }
          }
          orderServerScores();
          updateServerRanks();
          games[i].setWinner(games[i].getPlayer1());
        }
        else if(games[i].getTurn() === games[i].getPlayer1()){
          for(let j=0; j<accounts.length; j++){
            if(accounts[j].nick === games[i].getPlayer2()){
              accounts[j].victories++;
              accounts[j].games++;
            }
            if(accounts[j].nick === games[i].getPlayer1()){
              accounts[j].games++;
            }
          }
          orderServerScores();
          updateServerRanks();
          games[i].setWinner(games[i].getPlayer2());
        }
        let data = dataServer(i);
        if(games[i].getRespPlayer2()!==null){
          games[i].getRespPlayer2().write('data: '+ data +'\n\n');
          games[i].setRespPlayer2(games[i].getRespPlayer2().end());
        }
        if(games[i].getRespPlayer1()!==null){
          games[i].getRespPlayer1().write('data: '+ data +'\n\n');
          games[i].setRespPlayer1(games[i].getRespPlayer1().end());
        games.splice(i,1);
        }

      }
      else{
        if(games[i].getRespPlayer1()!==null){
          games[i].getRespPlayer1().end();
        }
        if(games[i].getRespPlayer2()!==null){
          games[i].getRespPlayer2().end();
        }
        games.splice(i,1);
      }
    }
  }

}

function leaveGameServer(game,name,pass,response){

  if(name === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "User is undefined"}));
    response.end();
    return;
  }
  else if(pass === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "Password is undefined"}));
    response.end();
    return;
  }
  else if(game === null){
    response.writeHead(400, headers.plain);
    response.write(JSON.stringify({error: "Game is undefined"}));
    response.end();
    return;
  }
  else if(name === "" || pass === ""){
    let answer = JSON.stringify({error: "User and Password can't be empty"});
    response.writeHead(401,headers.plain);
    response.write(answer);
    response.end();
    return;
  }
  else{
    let notRegistred=1;
    for(let i=0; i<accounts.length; i++){
      const hash = crypto.createHash('md5').update(pass).digest('hex');
      if(accounts[i].nick === name && accounts[i].pass !== hash){
        notRegistred = 0;
        let answer = JSON.stringify({error: "Wrong Password"});
        response.writeHead(401,headers.plain);
        response.write(answer);
        response.end();
        return;
      }
      else if(accounts[i].nick === name && accounts[i].pass === hash){
        notRegistred = 0;
      }
    }
    if(notRegistred == 1){
      let answer = JSON.stringify({error: "Account does not Exist"});
      response.writeHead(401,headers.plain);
      response.write(answer);
      response.end();
      return;
    }
  }
  for(let i=0; i<games.length; i++){
    if(games[i].getGameId() === game){
      clearTimeout(games[i].getAfkTimer());
      if(games[i].getStatus() === "finish" || games[i].getStatus() === "waiting"){
        if(games[i].getRespPlayer1()!==null){
          games[i].getRespPlayer1().end();
        }
        if(games[i].getRespPlayer2()!==null){
          games[i].getRespPlayer2().end();
        }
        response.writeHead(200, headers.plain);
        response.write(JSON.stringify({}));
        response.end();
        games.splice(i,1);
      }
      else{
        games[i].setStatus("finish");
        let winner = 1; //ganhou player1
        if(typeof games[i].getWinner() !== 'undefined')
          winner = 0;
        else if(name === games[i].getPlayer1())
          winner = 2; //ganhou player2
        for(let j=0; j<accounts.length; j++){
          if(winner == 1){
            if(typeof games[i].getWinner() === 'undefined')
              games[i].setWinner(games[i].getPlayer1());
            if(accounts[j].nick === games[i].getPlayer1()){
              accounts[j].games++;
              accounts[j].victories++;
            }
            if(accounts[j].nick === games[i].getPlayer2()){
              accounts[j].games++;
            }
            updateServerRanks();
            orderServerScores();
            let data = dataServer(i);
            if(games[i].getRespPlayer1()!==null)
              games[i].getRespPlayer1().write('data: '+ data +'\n\n');
            if(games[i].getRespPlayer2()!==null)
              games[i].getRespPlayer2().write('data: '+ data +'\n\n');
          }
          else if(winner == 2){
            if(typeof games[i].getWinner() === 'undefined')
              games[i].setWinner(games[i].getPlayer2());
            if(accounts[j].nick === games[i].getPlayer2()){
              accounts[j].games++;
              accounts[j].victories++;
            }
            if(accounts[j].nick === games[i].getPlayer1()){
              accounts[j].games++;
            }
            updateServerRanks();
            orderServerScores();
            let data = dataServer(i);
            if(games[i].getRespPlayer1()!==null)
              games[i].getRespPlayer1().write('data: '+ data +'\n\n');
            if(games[i].getRespPlayer2()!==null)
              games[i].getRespPlayer2().write('data: '+ data +'\n\n');
          }
        }
        response.writeHead(200, headers.plain);
        response.write(JSON.stringify({}));
        response.end();
      }
      break;
    }
  }
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
  orderServerScores();
  let finalData = {users:accounts};
  file.writeFileSync("./accounts.json", JSON.stringify(finalData));
}

function updateServerRanks(){
  let finalData = {users:accounts};
  file.writeFileSync("./accounts.json", JSON.stringify(finalData));
}

function giveServerHand(stocktemp,i,nick){
  let hand = [];
  let stock = stocktemp;
  for(let j = 0; j<7; j++){
    let rand = Math.floor(Math.random() * stock.length);
    if(stock[rand][0]+stock[rand][1]>games[i].getMaxpiece()){
      games[i].setMaxpiece(stock[rand][0]+stock[rand][1]);
      games[i].setTurn(nick);
    }
    hand.push(stock[rand]);
    stock.splice(rand,1);
  }
  games[i].setStock(stock);
  return hand;
}

function createRoomStock(){
  let stock = [];
  for(let i=0; i<7; i++){
    for(let j=i; j<7; j++){
      stock.push([i,j]);
    }
  }
  return stock;
}

function orderServerScores(){
  for(let i=0; i<accounts.length; i++){
    for(let j=i+1; j<accounts.length; j++){
      if(accounts[j].victories > accounts[i].victories){
        let temp = accounts[i];
        accounts[i] = accounts[j];
        accounts[j] = temp;
      }
    }
  }
}
