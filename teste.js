class Piece {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }
};

class play{
  constructor(pos,sidepiece,sideboard) {
  	this.pos=pos;
    this.sidepiece = sidepiece;
    this.sideboard = sideboard;
  }
};

var userVitorys = 0;
var userPoints = 0;
var userValue = "";

var onclickpiece;
var dif = 0;

//easyMode
document.getElementById("easy").addEventListener("click",function easyMode(){
  document.getElementById("startGame").style.display="block";
  document.getElementById("Dificulty").style.display="none";
  dif=1;
});

//mediumMode
document.getElementById("medium").addEventListener("click",function mediumMode(){
  document.getElementById("startGame").style.display="block";
  document.getElementById("Dificulty").style.display="none";

  dif=2;
});

//hardMode
document.getElementById("hard").addEventListener("click",function hardMode(){
  document.getElementById("startGame").style.display="block";
  document.getElementById("Dificulty").style.display="none";

  dif=3;
});

document.getElementById("loginButton").addEventListener("click",function getUser(){
  var user = document.getElementById("user");
  userValue = user.value;
});

// //RESET SCORES
// document.getElementById("buttonLogout").addEventListener("click",function resetScores(){
//   userPoints = 0;
//   userVitorys = 0;
//   userValue = "";
// });

// document.getElementById("scores").addEventListener("click",function printScores(){
//     document.getElementById("namePoints").innerHTML = userValue;
//     document.getElementById("victorys").innerHTML = String(userVitorys);
//     document.getElementById("valuePoints").innerHTML = String(userPoints);
// });

var giveUp = document.getElementById("forfeit");
var menu = document.getElementById("playMenu");
var left = document.getElementById("leftContainer");
var logoutmenu = document.getElementById("logout");
var gameBoard = document.getElementById("gameBoard");
var board2 = document.getElementById("board2");

//baralhar array
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

var array=[];
array.length=28;
var aux=0;
var mypieces=[];
var hispieces=[];
var tabu=[];


//ao clicar remover e adicionar, tem de ser alterada ainda
function remove(idpiece){
  document.getElementById("left").style.visibility = "hidden";
  document.getElementById("right").style.visibility = "hidden";
	if(bool===1) return;
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
	var test=jogada2(mypieces[i],tabu[0].left,tabu[tabu.length-1].right);
	if(test.pos===-1){
    document.getElementById("warnings").innerHTML = "Can't play piece";
    return;
	}
  	document.getElementById(filhos[i].id).style.color = "green";
  onclickpiece=i;
  if(checkleftp(mypieces[onclickpiece],tabu[0].left)!==-1){
    document.getElementById("left").style.visibility ="visible";
  }
  if(checkrightp(mypieces[onclickpiece],tabu[tabu.length-1].right)!==-1){
    document.getElementById("right").style.visibility = "visible";
  }

}
var l=-1,r=-1;
var max=0;
var pos=-1;
var maxpiece=0;
var bool=0;
//maximo
function myFunction(item,index) {
  maxpiece=item.left+item.right;
  if(maxpiece>max){
  	max=maxpiece;
  	pos=index;
  	bool=1;
  }
}
//começar o jogo
document.getElementById("startGame").addEventListener("click",function start(){
document.getElementById("startGame").style.display="none";
document.getElementById("board2").style.display ="block";
document.getElementById("forfeit").style.display = "block";
document.getElementById("PCHand").innerHTML="";
document.getElementById("Board").innerHTML="";
document.getElementById("PlayerHand").innerHTML="";
document.getElementById("Deck").innerHTML="";

  reset();
  console.log(mypieces);
  l=-1,r=-1;
  max=0;
  pos=-1;
  maxpiece=0;
  mypieces.forEach(myFunction);
  bool = 0;
  hispieces.forEach(myFunction);
tabu.length=1;
if(bool==0){
	var board=document.getElementById("Board");
	var filhos=document.getElementById("PlayerHand").childNodes;
	var change=filhos[pos];
	var span=document.createElement("span");
	var conta=127025+mypieces[pos].left*7+mypieces[pos].right;
	l=mypieces[pos].left;r=mypieces[pos].right;
	if(l===r) conta+=50;
		span.innerHTML="&#"+(conta);
	document.getElementById("PlayerHand").removeChild(change);
	board.appendChild(span);
	tabu[0]=mypieces[pos];
	bool=1;
	mypieces.splice(pos, 1);
  document.getElementById("warnings").innerHTML = "PC TURN";
	setTimeout(PCturn,1000);
}
else {
	var board=document.getElementById("Board");
	var filhos=document.getElementById("PCHand").childNodes;
	var change=filhos[pos];
	var span=document.createElement("span");
	var conta=127025+hispieces[pos].left*7+hispieces[pos].right;
	l=hispieces[pos].left;r=hispieces[pos].right;
	if(l===r) conta+=50;
		span.innerHTML="&#"+(conta);
	document.getElementById("PCHand").removeChild(change);
	board.appendChild(span);
	tabu[0]=hispieces[pos];
	bool=0;
	hispieces.splice(pos, 1);
	chekarHand();
}

});
// resetar o jogo
function reset(){
  array.length=28;
  var aux=0;
  for(var i=0;i<7;i++){
  	for(var j=i;j<7;j++){
  		var p=new Piece(i,j);
  		array[aux]=p;
  		aux++;
  	}
  }
  shuffle(array);

  mypieces = [];
  hispieces = [];
  for(var i=0;i<7;i++){
  	var newpiece = Math.floor(Math.random() * array.length);
  	mypieces[i]=array[newpiece];
  	var conta=127025+array[newpiece].left*7+array[newpiece].right+50;
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
  	array.splice(newpiece, 1);
  }
  //guardas as peças dele
  for(var i=0;i<7;i++){
  	var newpiece = Math.floor(Math.random() * array.length);
  	hispieces[i]=array[newpiece];
  	var conta=127025+array[newpiece].left*7+array[newpiece].right+50;
  	var p=document.createElement("span");
  	var idd;
  	if(array[i].left!=0)
  		idd=""+array[i].left+""+array[i].right+"";
  	else idd=""+array[i].right+"";
  	p.innerHTML="&#"+127074;
  	document.getElementById("PCHand").appendChild(p);
  	array.splice(newpiece, 1);
  }
  //peças no baralho, pode nao aparecer
  for(var i=0;i<14;i++){
  	var conta=127025+array[i].left*7+array[i].right;
  	var p=document.createElement("span");
  	var idd;
  	if(array[i].left!=0)
  		idd=""+array[i].left+""+array[i].right+"";
  	else idd=""+array[i].right+"";
  	p.setAttribute('id',"piece("+idd+")");
  	p.setAttribute("onclick","remove("+idd+")");
  	p.innerHTML="&#"+127074;
  	document.getElementById("Deck").appendChild(p);
  }
}
function PCWin(){
  window.alert("PC WIN!");
  giveUp.style.display = "none";
  menu.style.display = "block";
  gameBoard.style.display = "none";
  board2.style.display = "none";
  left.style.display = "block";
}
function PlayerWin(){
  window.alert("PLAYER WIN!");
  giveUp.style.display = "none";
  menu.style.display = "block";
  gameBoard.style.display = "none";
  board2.style.display = "none";
  left.style.display = "block";
}
function Draw(){
  window.alert("DRAW!");
  giveUp.style.display = "none";
  menu.style.display = "block";
  gameBoard.style.display = "none";
  board2.style.display = "none";
  left.style.display = "block";
}
//ver pontos na mao do pc
function pointsPC(){
  let points = 0;
  for(var i=0; i<hispieces.length; i++){
    points+= hispieces[i].left+hispieces[i].right;
  }
  return points;
}
//ver pontos na mao do player
function pointsPlayer(){
  let points = 0;
  for(var i=0; i<mypieces.length; i++){
    points+= mypieces[i].left+mypieces[i].right;
  }
  return points;
}
//turno do pc
function PCturn(){
	if(mypieces.length==0){
    userPoints += pointsPC();
    userVitorys ++;
		setTimeout(PlayerWin,500);
		return;
	}
  else if(array.length==0 && (check(hispieces,tabu[0].left,tabu[tabu.length-1].right).pos===-1 && check(mypieces,tabu[0].left,tabu[tabu.length-1].right).pos===-1)){
    if(pointsPlayer()>pointsPC()){
      userPoints += pointsPC();
      userVitorys ++;
      setTimeout(PlayerWin,500);
    }
    else if(pointsPlayer()<pointsPC()){
      setTimeout(PCWin,1000);
    }
    else{
      if(mypieces.length<hispieces.length){
        userPoints += pointsPC();
        userVitorys ++;
        setTimeout(PlayerWin,500);
      }
      else if(mypieces.length>hispieces.length){
        setTimeout(PCWin,1000);
      }
      else{
        setTimeout(Draw,500);
      }
    }
    return;
  }
	if(check(hispieces,tabu[0].left,tabu[tabu.length-1].right).pos===-1){
		var newpiece = Math.floor(Math.random() * array.length);
		var peçafora =array[newpiece];
		array.splice(newpiece,1);
    if(typeof peçafora === 'undefined'){
      bool = 0;
      chekarHand();
      return;
    }
		var joga=jogada2(peçafora,tabu[0].left,tabu[tabu.length-1].right);
		while(joga.pos===-1 && array.length>0){
			var filhos=document.getElementById("Deck").childNodes;
			var change=filhos[newpiece];
			document.getElementById("Deck").removeChild(change);
			var span=document.createElement("span");
			hispieces.push(peçafora);
			span.innerHTML="&#"+127074;
			document.getElementById("PCHand").appendChild(span);
			newpiece = Math.floor(Math.random() * array.length);
			peçafora =array[newpiece];
			array.splice(newpiece,1);
			joga=jogada2(peçafora,tabu[0].left,tabu[tabu.length-1].right);
		}
	if(joga.pos===-1) {bool=0;}//passa a vez
		else{
			var filhos=document.getElementById("Deck").childNodes;
			var change=filhos[newpiece];
			document.getElementById("Deck").removeChild(change);
			var span=document.createElement("span");
			hispieces.push(peçafora);
			span.innerHTML="&#"+127074;
			document.getElementById("PCHand").appendChild(span);
			var posi=hispieces.length-1;//ultima peça para jogar
			playpiecepc(posi,joga.sidepiece,joga.sideboard);
			bool=0;
		}
	}
	else{
    if(dif ===  1){
		    var posi=check(hispieces,tabu[0].left,tabu[tabu.length-1].right);
    }
    else if(dif === 2){
      var jogar=check1(hispieces,tabu[0].left,tabu[tabu.length-1].right);
		  var posi=myFunction1(jogar);
    }
    else if(dif == 3){
      var jogar=check2(hispieces,tabu[0].left,tabu[tabu.length-1].right);
		  var posi=myFunction2(jogar,tabu[0].left,tabu[tabu.length-1].right);
		  if(posi.pos===-1){
        jogar=check1(hispieces,tabu[0].left,tabu[tabu.length-1].right);
        posi=myFunction1(jogar);
      }
    }
		playpiecepc(posi.pos,posi.sidepiece,posi.sideboard);
		bool=0;
	}
	if(hispieces.length==0){
		setTimeout(PCWin,1000);
    return;
	}
	chekarHand();
}

//dar as posiçoes das peças que dão para jogar
function check2(arr,l,r){
	var jogar=[];
	var aux=0;
	for(var i=0;i<arr.length;i++){
		if(arr[i].left==l) {jogar[aux]= i;aux++;continue;}
		if(arr[i].right==l) {jogar[aux]= i;aux++;continue;}
		if(arr[i].left==r) {jogar[aux]= i;aux++;continue;}
		if(arr[i].right==r) {jogar[aux] =i;aux++;}
	}
	return jogar;
}
//retorna posicao da peça, lado da peça, lado do tabuleiro (dificuldade hard )
function myFunction2(arr,l,r) {
	var joga=new play(-1,-1,-1);
	let maxi=-1;
	var joga=new play(-1,-1,-1);
  	for(var i=0;i<arr.length;i++){
  		if(hispieces[arr[i]].left==l) {
			let hpaux=[...hispieces];
			let l1=hispieces[arr[i]].right;
			let r1=tabu[tabu.length-1].right;
			let maxaux=hispieces[arr[i]].left+hispieces[arr[i]].right;
			hpaux.splice(arr[i],1);
			if(checkleft(hpaux,l1).pos!==-1 && checkright(hpaux,r1).pos!==-1){
				if(maxaux>=maxi){
				 maxi=maxaux;
				 joga= new play(arr[i],0,0);
				}
			}


  		}
		if(hispieces[arr[i]].right==l) {
			let hpaux=[...hispieces];
			let l1=hispieces[arr[i]].left;
			let r1=tabu[tabu.length-1].right;
			let maxaux=hispieces[arr[i]].left+hispieces[arr[i]].right;
			hpaux.splice(arr[i],1);
			if(checkleft(hpaux,l1).pos!==-1 && checkright(hpaux,r1).pos!==-1){
				if(maxaux>=maxi){
				 maxi=maxaux;
				 joga= new play(arr[i],1,0);
				}
			}
		}
		if(hispieces[arr[i]].left==r) {
			let hpaux=[...hispieces];
			let l1=tabu[0].left;
			let r1=hispieces[arr[i]].right;
			let maxaux=hispieces[arr[i]].left+hispieces[arr[i]].right;
			hpaux.splice(arr[i],1);
			if(checkleft(hpaux,l1).pos!==-1 && checkright(hpaux,r1).pos!==-1){
				if(maxaux>=maxi){
				 maxi=maxaux;
				 joga= new play(arr[i],0,1);
				}
			}
		}
		if(hispieces[arr[i]].right==r) {
			let hpaux=[...hispieces];
			let l1=tabu[0].left;
			let r1=hispieces[arr[i]].left;
			let maxaux=hispieces[arr[i]].left+hispieces[arr[i]].right;
			hpaux.splice(arr[i],1);
			if(checkleft(hpaux,l1).pos!==-1 && checkright(hpaux,r1).pos!==-1){
				if(maxaux>=maxi){
				 maxi=maxaux;
				 joga= new play(arr[i],1,1);
				}
			}
		}
  	}

  	return joga;
}
function checkleft(arr,l){
	var joga=new play(-1,-1,-1);
	for(var i=0;i<arr.length;i++){
		if(arr[i].left==l) return new play(i,0,0);
		if(arr[i].right==l) return new play(i,1,0);
	}
	return joga;
}
function checkright(arr,r){
	var joga=new play(-1,-1,-1);
	for(var i=0;i<arr.length;i++){
		if(arr[i].left==r) return new play(i,0,1);
		if(arr[i].right==r) return new play(i,1,1);
	}
	return joga;
}
//dar as posiçoes das peças que dão para jogar (dificuldade media)
function check1(arr,l,r){
	var joga=new play(-1,-1,-1);
	var jogar=[];
	var aux=0;
	for(var i=0;i<arr.length;i++){
		if(arr[i].left==l) {jogar[aux]= new play(i,0,0);aux++;continue;}
		if(arr[i].right==l) {jogar[aux]= new play(i,1,0);aux++;continue;}
		if(arr[i].left==r) {jogar[aux]= new play(i,0,1);aux++;continue;}
		if(arr[i].right==r) {jogar[aux] =new play(i,1,1);aux++;}
	}
	return jogar;
}
//retorna posicao da peça, lado da peça, lado do tabuleiro (dificuldade media )
function myFunction1(arr) {
	let max=-1;
	var joga=new play(-1,-1,-1);
  	for(var i=0;i<arr.length;i++){
  		let conta=hispieces[arr[i].pos].left+hispieces[arr[i].pos].right;

  		if(max<conta) {max=conta; joga=arr[i];}
  	}
  	return joga;
}
//jogar peça do pc
function playpiecepc(posi,sidepi,sideb){
	var filhos;
	var board=document.getElementById("Board");
	filhos=document.getElementById("PCHand").childNodes;
	var change=filhos[posi];
	var span=document.createElement("span");
	var conta=127025+valuepiece(hispieces,posi,sidepi,sideb);
	var change=filhos[posi];
	span.innerHTML="&#"+conta;
	document.getElementById("PCHand").removeChild(change);
	if(sideb==0) board.insertBefore(span,board.childNodes[0]);
	else board.appendChild(span);
	hispieces.splice(posi, 1);
}


//jogar peça do jogador -> ESQUERDA
document.getElementById("left").addEventListener("click",function playpieceplayer(){
  var sideb = 0;
	var filhos;
	var board=document.getElementById("Board");
	filhos=document.getElementById("PlayerHand").childNodes;
	var change=filhos[onclickpiece];
	var span=document.createElement("span");
	var sidepi;
	if(sideb==0){
		if(tabu[0].left===mypieces[onclickpiece].left)
			sidepi=0;
		else sidepi=1;
	}
	if(sideb==1){
		if(tabu[tabu.length-1].right===mypieces[onclickpiece].left)
			sidepi=0;
		else sidepi=1;
	}
	var conta=127025+valuepiece(mypieces,onclickpiece,sidepi,sideb);
	var change=filhos[onclickpiece];
	span.innerHTML="&#"+conta;
	document.getElementById("PlayerHand").removeChild(change);
	if(sideb==0) board.insertBefore(span,board.childNodes[0]);
	else board.appendChild(span);
	mypieces.splice(onclickpiece, 1);
  bool=1;
  document.getElementById("left").style.visibility = "hidden";
  document.getElementById("right").style.visibility = "hidden";
  document.getElementById("warnings").innerHTML = "PC TURN";
  setTimeout(PCturn,1000);
});
//jogar peça jogador -> DIREITA
//jogar peça do jogador
document.getElementById("right").addEventListener("click",function playpieceplayer(){
  var sideb = 1;
	var filhos;
	var board=document.getElementById("Board");
	filhos=document.getElementById("PlayerHand").childNodes;
	var change=filhos[onclickpiece];
	var span=document.createElement("span");
	var sidepi;
	if(sideb==0){
		if(tabu[0].left===mypieces[onclickpiece].left)
			sidepi=0;
		else sidepi=1;
	}
	if(sideb==1){
		if(tabu[tabu.length-1].right===mypieces[onclickpiece].left)
			sidepi=0;
		else sidepi=1;
	}
	var conta=127025+valuepiece(mypieces,onclickpiece,sidepi,sideb);
	var change=filhos[onclickpiece];
	span.innerHTML="&#"+conta;
	document.getElementById("PlayerHand").removeChild(change);
	if(sideb==0) board.insertBefore(span,board.childNodes[0]);
	else board.appendChild(span);
	mypieces.splice(onclickpiece, 1);
  bool=1;
  document.getElementById("left").style.visibility = "hidden";
  document.getElementById("right").style.visibility = "hidden";
  document.getElementById("warnings").innerHTML = "PC TURN";
  setTimeout(PCturn,1000);
});

//calcular valor da peça
function valuepiece(arr,pi,sp,sb){
	var conta=0;
	if(sp==0 && sb=="0"){
		tabu.unshift(new Piece(arr[pi].right,arr[pi].left));
		if(arr[pi].right===arr[pi].left)
			return 50+arr[pi].right*7+arr[pi].left;
		return arr[pi].right*7+arr[pi].left;
	}
	if(sp==0 && sb=="1"){
		tabu.push(new Piece(arr[pi].left,arr[pi].right));
		if(arr[pi].right===arr[pi].left)
		return arr[pi].left*7+arr[pi].right+50;
			return arr[pi].left*7+arr[pi].right;
	}
	if(sp==1 && sb=="0"){
		tabu.unshift(new Piece(arr[pi].left,arr[pi].right));
		if(arr[pi].right===arr[pi].left)
		return arr[pi].left*7+arr[pi].right+50;
			return arr[pi].left*7+arr[pi].right;
	}
	if(sp==1 && sb=="1"){
		tabu.push(new Piece(arr[pi].right,arr[pi].left));
		if(arr[pi].right===arr[pi].left)
		return arr[pi].right*7+arr[pi].left+50;
			return arr[pi].right*7+arr[pi].left;

	}
}
//verifica se pode jogar alguma das peças da mao
function check(arr,l,r){
	var joga=new play(-1,-1,-1);
	for(var i=0;i<arr.length;i++){
		if(arr[i].left==l) return new play(i,0,0);
		if(arr[i].right==l) return new play(i,1,0);
		if(arr[i].left==r) return new play(i,0,1);
		if(arr[i].right==r) return new play(i,1,1);
	}
	return joga;
}
//peça retirada do baralho
function jogada2(piece,l,r){
	var joga=new play(-1,-1,-1);
	if(piece.left==l) return new play(1,0,0);
	if(piece.right==l) return new play(1,1,0);
	if(piece.left==r) return new play(1,0,1);
	if(piece.right==r) return new play(1,1,1);
	return joga;
}
//verificar se pode jogar à esquerda
function checkleftp(test,l){
	if(test.left==l || test.right==l)
    return 1;
	return -1;
}
//verificar se pode jogar à direita
function checkrightp(test,r){
	if(test.left==r || test.right==r)
    return 1;
	return -1;
}
//buscar peça do baralho
document.getElementById("buttonDeck").addEventListener("click",function getDeck(){
  var newpiece = Math.floor(Math.random() * array.length);
  var peçafora =array[newpiece];
  array.splice(newpiece,1);
  mypieces.push(peçafora);
  var conta=127025+peçafora.left*7+peçafora.right+50;
  var filhos=document.getElementById("Deck").childNodes;
  var change=filhos[newpiece];
  document.getElementById("Deck").removeChild(change);
  var p=document.createElement("span");
  var idd;
  if(peçafora.left!=0)
    idd=""+peçafora.left+""+peçafora.right+"";
  else idd=""+peçafora.right+"";
  p.setAttribute('id',"piece("+idd+")");
  p.setAttribute("class","pecaPlayer");
  p.setAttribute("onclick","remove("+idd+")");
  p.innerHTML="&#"+(conta);
  document.getElementById("PlayerHand").appendChild(p);
  if(check(mypieces,tabu[0].left,tabu[tabu.length-1].right).pos!=-1){
    document.getElementById("buttonDeck").style.display="none";
    document.getElementById("warnings").innerHTML = "Your turn";
  }
  else {
    chekarHand();
  }
});
//verifica se pode jogar, se tem de ir buscar ao baralho ou se tem de passar
function chekarHand(){
  if(check(mypieces,tabu[0].left,tabu[tabu.length-1].right).pos===-1 && array.length === 0){
    document.getElementById("warnings").innerHTML = "You can't play";
    document.getElementById("buttonDeck").style.display="none";
    document.getElementById("buttonPass").style.display = "block"
  }
  else if(check(mypieces,tabu[0].left,tabu[tabu.length-1].right).pos===-1){
    document.getElementById("buttonDeck").style.display="block";
    document.getElementById("warnings").innerHTML = "Get new pieces";
  }
  else{
    document.getElementById("buttonDeck").style.display="none";
    document.getElementById("warnings").innerHTML = "Your turn";
  }


}
//passar a vez
document.getElementById("buttonPass").addEventListener("click",function passTurn(){
  document.getElementById("buttonPass").style.display = "none";
  PCturn();
});
