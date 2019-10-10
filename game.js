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
//guardar todas as peças
var array=[];
array.length=28;
var aux=0;
for(var i=0;i<7;i++){
	for(var j=i;j<7;j++){
		var p=new Piece(i,j);
		array[aux]=p;
		aux++;
	}
}

var mypieces=[];
var hispieces=[];
//guardar as minhas peças
for(var i=0;i<7;i++){
	var newpiece = Math.floor(Math.random() * array.length);
	mypieces[i]=array[newpiece];
	var conta=127025+array[newpiece].left*7+array[newpiece].right;
	document.getElementById("demoo").innerHTML += "&#" + conta +" ";
	array.splice(newpiece, 1);
}
//guardas as peças dele
for(var i=0;i<7;i++){
	var newpiece = Math.floor(Math.random() * array.length);
	hispieces[i]=array[newpiece];
	var conta=127025+array[newpiece].left*7+array[newpiece].right;
	document.getElementById("demooo").innerHTML += "&#" + conta +" ";
	array.splice(newpiece, 1);
}
var l=-1,right=-1;
var max=0;
var pos=-1;
var maxpiece=0;
mypieces.forEach(myFunction);
var bool=0;
hispieces.forEach(myFunction);
function myFunction(item,index) {
  maxpiece=item.left+item.right;
  if(maxpiece>max){
  	max=maxpiece;
  	pos=index;
  	bool=1;
  }
}
var board=[];
board.length=1;
if(bool==0){
	var conta=127025+mypieces[pos].left*7+mypieces[pos].right;
	l=mypieces[pos].left;r=mypieces[pos].right;
	board[0]=mypieces[pos];
	bool=1;
	mypieces.splice(pos, 1);
}
else {
	var conta=127025+hispieces[pos].left*7+hispieces[pos].right;
	l=hispieces[pos].left;r=hispieces[pos].right;
	board[0]=hispieces[pos];
	bool=0;
	hispieces.splice(pos, 1);
}

function printarray(arr){
	for(var i=0;i<arr.length;i++){
		var conta=127025+arr[i].left*7+arr[i].right;
		document.getElementById("demoooo").innerHTML += "&#" + conta +" ";
	}
	document.getElementById("demoooo").innerHTML += "<br>";
}/*
//ver se tem uma peça que encaixa
function jogada(arr,l,r){
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
	if(piece.left==l) return new play(i,0,0);
	if(piece.right==l) return new play(i,1,0);
	if(piece.left==r) return new play(i,0,1);
	if(piece.right==r) return new play(i,1,1);
	return joga;
}
var i=0;
while(mypieces.length>0 && hispieces.length>0){

printarray(array);
printarray(mypieces);
printarray(hispieces);
		printarray(board);
	if(bool==0){
		var joga=jogada(mypieces,board[0].left,board[board.length-1].right);

		if(joga.pos==-1){
			var newpiece = Math.floor(Math.random() * array.length);
			var peçafora =array[newpiece];
			array.splice(newpiece,1);
			joga=jogada2(peçafora,board[0].left,board[board.length-1].right);
			while(joga.pos==-1 && array.length>0){
				mypieces.push(peçafora);
				newpiece = Math.floor(Math.random() * array.length);
				peçafora =array[newpiece];
				array.splice(newpiece,1);

				joga=jogada2(peçafora,board[0].left,board[board.length-1].right);
			}
			if(joga.pos==-1) continue;//passa a vez
			else{
				mypieces.push(peçafora);
				joga.pos=mypieces.length-1;//ultima peça para jogar
			}
		}
			if(joga.sidepiece==0 && joga.sideboard==0){
				board.unshift(new Piece(mypieces[joga.pos].right,mypieces[joga.pos].left));

			}
			if(joga.sidepiece==0 && joga.sideboard==1){
				board.push(new Piece(mypieces[joga.pos].left,mypieces[joga.pos].right));

			}
			if(joga.sidepiece==1 && joga.sideboard==0){
				board.unshift(new Piece(mypieces[joga.pos].left,mypieces[joga.pos].right));

			}
			if(joga.sidepiece==1 && joga.sideboard==1){
				board.push(new Piece(mypieces[joga.pos].right,mypieces[joga.pos].left));

			}
			mypieces.splice(joga.pos, 1);
			bool=1;
		}

	else{var joga=jogada(hispieces,board[0].left,board[board.length-1].right);
		if(joga.pos==-1){
			var newpiece = Math.floor(Math.random() * array.length);
			var peçafora =array[newpiece];
			array.splice(newpiece,1);
			joga=jogada2(peçafora,board[0].left,board[board.length-1].right);
			while(joga.pos==-1 && array.length>0){
				hispieces.push(peçafora);
				newpiece = Math.floor(Math.random() * array.length);
				peçafora =array[newpiece];
				array.splice(newpiece,1);
				joga=jogada2(peçafora,board[0].left,board[board.length-1].right);
			}
			if(joga.pos==-1) continue;//passa a vez
			else{
				hispieces.push(peçafora);
				joga.pos=hispieces.length-1;//ultima peça para jogar
			}
		}
			if(joga.sidepiece==0 && joga.sideboard==0){
				board.unshift(new Piece(hispieces[joga.pos].right,hispieces[joga.pos].left));

			}
			if(joga.sidepiece==0 && joga.sideboard==1){
				board.push(new Piece(hispieces[joga.pos].left,hispieces[joga.pos].right));

			}
			if(joga.sidepiece==1 && joga.sideboard==0){
				board.unshift(new Piece(hispieces[joga.pos].left,hispieces[joga.pos].right));

			}
			if(joga.sidepiece==1 && joga.sideboard==1){
				board.push(new Piece(hispieces[joga.pos].right,hispieces[joga.pos].left));

			}
			hispieces.splice(joga.pos, 1);

		bool=0;
	}
	if(mypieces.length==0) {console.log('ganhei eu');break;}
	if(hispieces.length==0) { console.log('ganhou o pc');break;}

}
*/
