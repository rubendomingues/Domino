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
//LogoutFunc
document.getElementById("buttonLogout").addEventListener("click",function logoutFunc(){
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
});

document.getElementById("button1x1").addEventListener("click", function playerGame() {
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
  var player = "player";
  var wins = "wins";
  var games = "games";
  info = info.ranking;
  for(var i=0; i<info.length; i++){
    var temp = player +""+i+"";
    document.getElementById(temp).innerHTML = info[i].nick;
    temp = wins+""+i+"";
    document.getElementById(temp).innerHTML = info[i].victories;
    temp = games+""+i+"";
    document.getElementById(temp).innerHTML = info[i].games;
  }
}
//SERVER CONNECTION

var url ='http://twserver.alunos.dcc.fc.up.pt:8008/';
var username = "";
var password = "";
var groupName = "winnersRD";
var gameId = "";

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
    update();
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
    console.log("SAIS-TE DO JOGO!");
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

function notifyServerPlay(p){
  game = {
    nick :  username,
    pass : password,
    game: gameId,
    piece: p,
  }
  fetch(url + "notify",{
    method:"POST",
    body: JSON.stringify(game),
  })
  .then(function (r){
    return r.text();
  })
  .then(function (t){
    console.log(t);
  });
}

function notifyServerPlaySide(p,s,skip){
  game = {
    nick :  username,
    pass : password,
    game: gameId,
    piece: p,
    side: s,

  }
  fetch(url + "notify",{
    method:"POST",
    body: JSON.stringify(game),
  })
  .then(function (r){
    return r.text();
  })
  .then(function (t){
    console.log(t);
  });
}

function notifyServerSkip(){
  game = {
    nick :  username,
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
    console.log(t);
  });
}
//Update
function update(){

  game = {
    game : gameId,
    nick : username,
  }

}
//-----------------
//PLAYER VS PLAYER ALGORITHM

var mypieces = [];
var tabu = [];

function atualizaHand(s){
  for(var i=0; i<s.length; i++){
    var temp = s[i];
    mypieces[i] = new Piece(temp[0],temp[1]);
  }
}

function startGame(){
  for(var i=0;i<7;i++){
  	var conta=127025+mypieces[i].left*7+mypieces[i].right+50;
  	var p=document.createElement("span");
  	var idd;
  	if(mypieces[i].left!=0)
  		idd=""+mypieces[i].left+""+mypieces[i].right+"";
  	else idd=""+mypieces[i].right+"";
  	p.setAttribute('id',"piece("+idd+")");
    p.setAttribute("class","pecaPlayer");
  	p.setAttribute("onclick","remove("+idd+")");
  	p.innerHTML="&#"+(conta);
  	document.getElementById("PlayerHand").appendChild(p);
  }
}
