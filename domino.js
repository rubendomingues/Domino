//Function to present a modal box with the rules
document.getElementById("buttonRules").addEventListener("click",function rulesButton(){
  // Get the modal
  var modal = document.getElementById("myModal");

  // When the user clicks the button, open the modal
    modal.style.display = "block";
});

//Function to close modal Rules
document.getElementsByClassName("close")[0].addEventListener("click", function() {
  document.getElementById("myModal").style.display = "none";
});

//Function to present a modal box with the scores
document.getElementById("scores").addEventListener("click",function scoresButton(){
  getRanking();
  // Get the modal
  var modal = document.getElementById("myScores");

  modal.style.display = "block";
});

document.getElementsByClassName("close")[1].addEventListener("click",function(){
  document.getElementById("myScores").style.display = "none";
});

function eventDisap(){
  var giveUp = document.getElementById("forfeit");

  var menu = document.getElementById("playMenu");

  var left = document.getElementById("leftContainer");

  var logoutmenu = document.getElementById("logout");

  var gameBoard = document.getElementById("gameBoard");

  var board2 = document.getElementById("board2");

  left.style.display = "block";
  giveUp.style.display = "none";
  menu.style.display = "block";
  logoutmenu.style.display = "block";
  gameBoard.style.display = "none";
  board2.style.display = "none";

  document.getElementById("left").style.visibility = "hidden";
  document.getElementById("right").style.visibility = "hidden";
}
//LogoutFunc
document.getElementById("buttonLogout").addEventListener("click",function logoutFunc(){
  flag2=1;
  var menu = document.getElementById("playMenu");

  var logoutmenu = document.getElementById("logout");

  var elem = document.getElementById('loginContainer');

  var left = document.getElementById("leftContainer");

  var gameBoard = document.getElementById("gameBoard");

  var giveUp = document.getElementById("forfeit");

  var game = document.getElementById("board2");

  game.style.display = "none";
  menu.style.display = "none";
  logoutmenu.style.display = "none";
  elem.style.display = "block";
  left.style.display = "block";
  gameBoard.style.display = "none";
  giveUp.style.display = "none";
  document.getElementById("user").value = "";
  document.getElementById("pass").value = "";
  document.getElementById("left").style.visibility = "hidden";
  document.getElementById("right").style.visibility = "hidden";
  leaveGame();
});

document.getElementById("loginButton").addEventListener("click",function loginFunc(){
  var user = document.getElementById("user");
  var pass = document.getElementById("pass");
  if(user.value=="" || pass.value=="")
    window.alert("Insert username and password before login!");
  else{
    loginServer();
  }
  flag2=0;
});

document.getElementById("button1xpc").addEventListener("click",function disappear(){
  var left = document.getElementById("leftContainer");

  var gameBoard = document.getElementById("gameBoard");

  var dif = document.getElementById("Dificulty");

  dif.style.display = "block";
  left.style.display = "none";
  gameBoard.style.display = "block";

});

document.getElementById("giveUp").addEventListener("click",function giveGame(){
  flag2=1;
  var giveUp = document.getElementById("forfeit");

  var menu = document.getElementById("playMenu");

  var left = document.getElementById("leftContainer");

  var logoutmenu = document.getElementById("logout");

  var gameBoard = document.getElementById("gameBoard");

  var board2 = document.getElementById("board2");

  left.style.display = "block";
  giveUp.style.display = "none";
  menu.style.display = "block";
  logoutmenu.style.display = "block";
  gameBoard.style.display = "none";
  board2.style.display = "none";

  document.getElementById("left").style.visibility = "hidden";
  document.getElementById("right").style.visibility = "hidden";
  leaveGame();
});

document.getElementById("button1x1").addEventListener("click", function playerGame() {
  flag2=0;
  var left = document.getElementById("leftContainer");

  var gameBoard = document.getElementById("gameBoard");

  var dif = document.getElementById("Dificulty");

  dif.style.display = "none";
  left.style.display = "none";
  gameBoard.style.display = "block";

  joinGame();
});

function displayGame(){
  document.getElementById("board2").style.display ="block";
  document.getElementById("forfeit").style.display = "block";
  document.getElementById("PCHand").innerHTML="";
  document.getElementById("Board").innerHTML=" ";
  document.getElementById("PlayerHand").innerHTML="";
  document.getElementById("Deck").innerHTML="";
}

function fillScores(info){

  info = info.ranking;
  var scoreT = document.getElementById("tableinfo");

  while(scoreT.firstChild){
    scoreT.removeChild(scoreT.firstChild);
  }

  var thM = document.createElement("tr");
  var nameM = document.createElement("th");
  var vicM = document.createElement("th");
  var gamM = document.createElement("th");

  nameM.innerHTML = "Username";
  vicM.innerHTML = "Victorys";
  gamM.innerHTML = "Games";
  thM.appendChild(nameM);
  thM.appendChild(vicM);
  thM.appendChild(gamM);

  scoreT.appendChild(thM);
  for(var i=0; i<info.length; i++){
    var th = document.createElement("tr");

    var player = document.createElement("th");
    var wins = document.createElement("th");
    var games = document.createElement("th");
    player.innerHTML = info[i].nick;
    wins.innerHTML = info[i].victories;
    games.innerHTML = info[i].games;

    th.appendChild(player);
    th.appendChild(wins);
    th.appendChild(games);

    scoreT.appendChild(th);
  }
}
//SERVER CONNECTION
var url ='http://twserver.alunos.dcc.fc.up.pt:8008/';
var username = "";
var password = "";
var groupName = "winnersRD";
var gameId = "";
var turn;

//LOGIN
function loginServer(){

  var user = document.getElementById("user").value;
  var pass = document.getElementById("pass").value;
  username = user;
  password = pass;
  acc = {
    nick : user,
    pass : pass
  }
  fetch(url + "register",{
    method: "POST",
    body: JSON.stringify(acc),
  })
  .then(function (r){
    return r.text();
  })
  .then(function (t){
    if(t != "{}"){
      window.alert(t);
    }
    else{
      document.getElementById("userLogout").innerHTML = "Welcome, " + user;
      document.getElementById('loginContainer').style.display = "none";
      document.getElementById("playMenu").style.display = "block";
      document.getElementById("logout").style.display = "block";
    }
  });
}

//JOIN GAME
function joinGame(){
  game = {
    group : groupName,
    nick : username,
    pass : password
  }

  fetch(url + "join",{
    method: "POST",
    body: JSON.stringify(game),
  })
  .then(function (r){
    return r.json();
  })
  .then(function (t){
    gameId = t.game;
    atualizaHand(t.hand);
    displayGame();
    startGame();
  });
}

//LEAVE GAME
function leaveGame(){
  game = {
    game : gameId,
    nick : username,
    pass : password
  }

  fetch(url + "leave",{
    method: "POST",
    body: JSON.stringify(game),
  })
  .then(function (r){
    return r.text();
  })
  .then(function (t){
    return t;
  });
}

//GET RANKING
function getRanking(){
  fetch(url + "ranking",{
    method: "POST",
    body: JSON.stringify(""),
  })
  .then(function (r){
    return r.json();
  })
  .then(function (t){
    fillScores(t);
  });
}

//NOTIFY TO ASK PIECE
function notifyAskPiece(){
  game = {
    nick : username,
    pass : password,
    game: gameId,
    piece: null

  }
  fetch(url + "notify",{
    method:"POST",
    body: JSON.stringify(game),
  })
  .then(function (r){
    return r.json();
  })
  .then(function (t){
    givePiecep(t.piece);
  });
}

//NOTIFY SERVER TO PLAY
function notifyServerPlay(piece,side){
  game = {
    nick : username,
    pass : password,
    game: gameId,
    piece: piece,
    side: side,

  }
  fetch(url + "notify",{
    method:"POST",
    body: JSON.stringify(game),
  })
  .then(function (r){
    return r.text();
  })
  .then(function (t){
    return t;
  });
}

//NOTIFY SERVER TO SKIP
function notifyServerSkip(){
  game = {
    nick : username,
    pass : password,
    game: gameId,
    skip: null,
  }
  fetch(url + "notify",{
    method:"POST",
    body: JSON.stringify(game),
  })
  .then(function (r){
    return r.text();
  })
  .then(function (t){
    return t;
  });
}

//Update
var eventSource;
var countu = 0;
var deckL = 0;
var flag2 = 0;
function update(){
    let urltemp = url + "update?game=" + gameId + "&nick=" + username;
    eventSource = new EventSource(encodeURI(urltemp));
    eventSource.onmessage = function(event){
      const data = JSON.parse(event.data);
      if(data.winner !== undefined){
        window.alert(data.winner + " win");
        if(data.winner===username && flag2===0)
          eventDisap();
        else if(data.winner !== username && flag2 ===0)
          eventDisap();
        leaveGame();
        eventSource.close();
      }
      else{
      for(let i in data.board.count){
        if(i===username && data.board.count[i]!=mypieces.length)
          return;
      }

      if(data === undefined){
        tabu = [];
      }
      else if(data !== undefined && data.board !== undefined){
        tabu = data.board.line;
        turn = data.turn;
        deckL = data.board.stock;
        updateTab();
        checkPass();
      }}

  }
}

//-----------------
//PLAYER VS PLAYER ALGORITHM
var board = document.getElementById("Board");
var playerH = document.getElementById("PlayerHand");
var pcH = document.getElementById("PCHand");
var deckM = document.getElementById("Deck");
var pieceReturn;
var mypieces = [];
var tabu = [];

function givePiecep(pieceG){
  mypieces.push(new Piece(pieceG[0],pieceG[1]));
  var p=document.createElement("span");
  var conta = 127025 + mypieces[mypieces.length-1].left*7 + mypieces[mypieces.length-1].right+50;
  var idd;
  if(mypieces[mypieces.length-1].left!=0)
    idd=""+mypieces[mypieces.length-1].left+""+mypieces[mypieces.length-1].right+"";
  else idd=""+mypieces[mypieces.length-1].right+"";
  p.setAttribute('id',"piece("+idd+")");
  p.setAttribute("class","pecaPlayer");
  p.setAttribute("onclick","removeP("+idd+")");
  p.innerHTML="&#"+(conta);
  document.getElementById("PlayerHand").appendChild(p);
  checkPass();
}
function checkPass(){
  if(tabu.length===0){
    document.getElementById("warnings").innerHTML = turn + " turn";
    return;
  }
  if(check(mypieces,tabu[0].left,tabu[tabu.length-1].right).pos===-1 &&  deckL === 0 && turn === username){
    document.getElementById("warnings").innerHTML = "Turn Passed, "+ turn+ " turn";
    notifyServerSkip();
  }
  else if(check(mypieces,tabu[0].left,tabu[tabu.length-1].right).pos===-1 &&  deckL !== 0 && turn ===username ){
    document.getElementById("warnings").innerHTML = turn+ " turn";
    notifyAskPiece();
  }
  else{
    document.getElementById("warnings").innerHTML = turn+ " turn";
  }

}

function updateTab(){
  board.innerHTML = "";
  document.getElementById("Deck").innerHTML = "";
  for(var i=0; i<deckL; i++){
    document.getElementById("Deck").innerHTML+= "&#127074";
  }
  var temp = tabu;
  for(var i=0; i<tabu.length; i++){
    tabu[i] = new Piece(temp[i][0],temp[i][1]);
  }
//[[1,2],[3,4]]
//[(1,2),(3,4)] -> (1,2) == new Piece(left,right)
  document.getElementById("PCHand").innerHTML = "";
  for(var i=0; i<(28-tabu.length-deckL-mypieces.length); i++){
    document.getElementById("PCHand").innerHTML += "&#127074";
  }

  for(var i=0; i<tabu.length; i++){
    var conta=127025+tabu[i].left*7+tabu[i].right;
    if(tabu[i].left === tabu[i].right)
      conta+=50;
    board.innerHTML+= "&#"+conta;
  }
}

function atualizaHand(s){
  for(var i=0; i<s.length; i++){
    var temp = s[i];
    mypieces[i] = new Piece(temp[0],temp[1]);
  }
}

function startGame(){
  update();
  for(var i=0;i<7;i++){
  	var conta=127025+mypieces[i].left*7+mypieces[i].right+50;
  	var p=document.createElement("span");
  	var idd;
  	if(mypieces[i].left!=0)
  		idd=""+mypieces[i].left+""+mypieces[i].right+"";
  	else idd=""+mypieces[i].right+"";
  	p.setAttribute('id',"piece("+idd+")");
    p.setAttribute("class","pecaPlayer");
  	p.setAttribute("onclick","removeP("+idd+")");
  	p.innerHTML="&#"+(conta);
  	document.getElementById("PlayerHand").appendChild(p);
  }
}

function removeP(idpiece){
  document.getElementById("leftp").style.visibility = "hidden";
  document.getElementById("rightp").style.visibility = "hidden";
  if(turn !== username) return;
	var filhos;
	var board=document.getElementById("Board");
	filhos=document.getElementById("PlayerHand").childNodes;
	var i;
  for(i=0;i<filhos.length;i++){
		document.getElementById(filhos[i].id).style.color ="white";
	}
	for(i=0;i<filhos.length;i++){
		if(filhos[i].id=="piece("+idpiece+")"){
			break;
		}
	}
	var change=filhos[i];
  if(tabu.length===0){
  		pos=-1;
  		maxpiece=0;
  		mypieces.forEach(myFunction);
  		if(i==pos){
  			var board=document.getElementById("Board");
  			// board.appendChild(change);
  			var a=[mypieces[i].left,mypieces[i].right];
        playerH.removeChild(change);
        mypieces.splice(i,1);
  			notifyServerPlay(a,"start");
  		}
  		return;
  	}
	var test=jogada2(mypieces[i],tabu[0].left,tabu[tabu.length-1].right);
	if(test.pos===-1){
    document.getElementById("warnings").innerHTML = "Can't play piece";
    return;
	}

  document.getElementById(filhos[i].id).style.color = "green";
  onclickpiece=i;
  if(checkleftp(mypieces[onclickpiece],tabu[0].left)!==-1){
    document.getElementById("leftp").style.visibility ="visible";
  }
  if(checkrightp(mypieces[onclickpiece],tabu[tabu.length-1].right)!==-1){
    document.getElementById("rightp").style.visibility = "visible";
  }

}

//jogar peça esquerda
document.getElementById("leftp").addEventListener("click",function playpieceplayer(){
  var sideb = 0;
	var filhos;
	var board=document.getElementById("Board");
	filhos=document.getElementById("PlayerHand").childNodes;
	var change=filhos[onclickpiece];
	var span=document.createElement("span");
	var sidepi;
	if(sideb==0){
		if(tabu[0].left===mypieces[onclickpiece].left){
			sidepi=0;
      var a = [mypieces[onclickpiece].right,mypieces[onclickpiece].left];
  	  notifyServerPlay(a,"start");
    }
		else {
      sidepi=1;
      var a = [mypieces[onclickpiece].left,mypieces[onclickpiece].right];
  	  notifyServerPlay(a,"start");
    }
	}
	var conta=127025+valuepiece(mypieces,onclickpiece,sidepi,sideb);
	var change=filhos[onclickpiece];
	span.innerHTML="&#"+conta;
	document.getElementById("PlayerHand").removeChild(change);
	mypieces.splice(onclickpiece, 1);
  document.getElementById("leftp").style.visibility = "hidden";
  document.getElementById("rightp").style.visibility = "hidden";

});

//jogar peça direita
document.getElementById("rightp").addEventListener("click",function playpieceplayer(){
  var sideb = 1;
	var filhos;
	var board=document.getElementById("Board");
	filhos=document.getElementById("PlayerHand").childNodes;
	var change=filhos[onclickpiece];
	var span=document.createElement("span");
	var sidepi;
	if(sideb==1){
		if(tabu[tabu.length-1].right===mypieces[onclickpiece].left){
			sidepi=0;
      var a = [mypieces[onclickpiece].left,mypieces[onclickpiece].right];
  	  notifyServerPlay(a,"end");
    }
		else {
      sidepi=1;
      var a = [mypieces[onclickpiece].left,mypieces[onclickpiece].right];
  	  notifyServerPlay(a,"end");
    }
	}
	var conta=127025+valuepiece(mypieces,onclickpiece,sidepi,sideb);
	var change=filhos[onclickpiece];
	span.innerHTML="&#"+conta;
	document.getElementById("PlayerHand").removeChild(change);
  mypieces.splice(onclickpiece, 1);
  document.getElementById("leftp").style.visibility = "hidden";
  document.getElementById("rightp").style.visibility = "hidden";
});
