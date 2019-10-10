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

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

//Function hidde login when logged and make game options appear
function login(){

  var menu = document.getElementById("playMenu");

  var logoutmenu = document.getElementById("logout");

  var login = document.getElementById("loginButton");

  var logout = document.getElementById("buttonLogout");

  var elem = document.getElementById('loginContainer');

  var left = document.getElementById("leftContainer");

  var gameBoard = document.getElementById("gameBoard");

  var giveUp = document.getElementById("forfeit");


  login.onclick = function() {
    elem.style.display = "none";
    menu.style.display = "block";
    logoutmenu.style.display = "block";
    return false;
  }

  logout.onclick = function() {
    menu.style.display = "none";
    logoutmenu.style.display = "none";
    elem.style.display = "block";
    left.style.display = "block";
    gameBoard.style.display = "none";
    giveUp.style.display = "none";
  }

}

function disappear(){
  var left = document.getElementById("leftContainer");

  var human = document.getElementById("button1x1");

  var gameBoard = document.getElementById("gameBoard");

  var computer = document.getElementById("button1xpc");

  var giveUp = document.getElementById("forfeit");

  human.onclick = function(){
    left.style.display = "none";
    gameBoard.style.display = "block";
    giveUp.style.display = "block";
  }

  computer.onclick = function(){
    left.style.display = "none";
    gameBoard.style.display = "block";
    giveUp.style.display = "block";
  }

}

function giveGame(){
  var giveUp = document.getElementById("forfeit");

  var btn = document.getElementById("giveUp");

  var menu = document.getElementById("playMenu");

  var left = document.getElementById("leftContainer");

  var logoutmenu = document.getElementById("logout");

  var gameBoard = document.getElementById("gameBoard");

    btn.onclick = function(){
      left.style.display = "block";
      giveUp.style.display = "none";
      menu.style.display = "block";
      logoutmenu.style.display = "block";
      gameBoard.style.display = "none";
    }
}
