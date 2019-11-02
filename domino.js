//Function to present a modal box with the rules
function rulesButton(){

  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the button that opens the modal
  var btn = document.getElementById("buttonRules");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

//Function to present a modal box with the scores
function scoresButton(){

  // Get the modal
  var modal = document.getElementById("myScores");

  // Get the button that opens the modal
  var btn = document.getElementById("scores");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[1];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
}

function logoutFunc(){
  var menu = document.getElementById("playMenu");

  var logoutmenu = document.getElementById("logout");

  var login = document.getElementById("loginButton");

  var logout = document.getElementById("buttonLogout");

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

}
function loginFunc(){

  var menu = document.getElementById("playMenu");

  var logoutmenu = document.getElementById("logout");

  var login = document.getElementById("loginButton");

  var logout = document.getElementById("buttonLogout");

  var elem = document.getElementById('loginContainer');

  var left = document.getElementById("leftContainer");

  var gameBoard = document.getElementById("gameBoard");

  var giveUp = document.getElementById("forfeit");

  var game = document.getElementById("board2");

    var user = document.getElementById("user");
    var pass = document.getElementById("pass")
    if(user.value=="" || pass.value=="")
      window.alert("Insert username and password before login!");
    else{
      document.getElementById("userLogout").innerHTML = "Welcome, " + user.value;

    elem.style.display = "none";
    menu.style.display = "block";
    logoutmenu.style.display = "block";
    return false;
  }

}

function disappear(){
  var left = document.getElementById("leftContainer");

  var gameBoard = document.getElementById("gameBoard");

  var computer = document.getElementById("button1xpc");

  var dif = document.getElementById("Dificulty");

  dif.style.display = "block";
  left.style.display = "none";
  gameBoard.style.display = "block";

}

function giveGame(){
  var giveUp = document.getElementById("forfeit");

  var btn = document.getElementById("giveUp");

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
