function resetClock(){
  second=0;
  second1=120;
}
var canvas = document.getElementById("canvasClock");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);
var second=0;
var second1=120;
function drawClock() {
  drawFace(ctx, radius);
  drawHand(ctx, second*Math.PI/30, radius*0.9, radius*0.02);
  drawNumber(ctx, radius,second1);
  second++;
  second1--;
  if(second===120) second=0;
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, '#333');
  grad.addColorStop(0.5, 'white');
  grad.addColorStop(1, '#333');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = 'black';
  ctx.fill();
}

function drawNumber(ctx, radius,aux) {
  var ang;
  var num;
  ctx.font = radius*0.7 + "px arial";
  ctx.textBaseline="top";
  ctx.textAlign="center";
  ctx.translate(0, -radius*0.85);
  ctx.fillText(aux.toString(), 0, 0);
  ctx.translate(0, radius*0.85);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;;
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}
