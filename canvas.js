
var canvas2, ctx2;
     window.onload = function() {
        canvas2 = document.getElementById("canvas");
        ctx2 = canvas2.getContext("2d");
        document.addEventListener("keydown", keyDownEvent);
        setInterval(draw, 100);//speed
    }
      var grid = (Size = 15);
      var nextX = (nextY = 0);
      var initial = 1;
      var road = [];
      var X = (Y = 7);
      function draw() {
        X += nextX;
        Y += nextY;
        //  overflow
        if (X < 0) {
          X = grid - 1;
        }
        if (X > grid - 1) {
          X = 0;
        }
        if (Y < 0) {
          Y = grid - 1;
        }
        if (Y > grid - 1) {
          Y = 0;
        }
        ctx2.fillStyle = "black";
		for (var i = 0; i < road.length; i++) {//painting the square
		  ctx2.fillRect(
		    road[i].x * Size,
		    road[i].y * Size,
		    Size,
		    Size
		  );
		}
        road.push({ x: X, y: Y });
      }
      function keyDownEvent(e) {//direction of the square
        switch (e.keyCode) {
          case 37:
            nextX = -1;
            nextY = 0;
            break;
          case 38:
            nextX = 0;
            nextY = -1;
            break;
          case 39:
            nextX = 1;
            nextY = 0;
            break;
          case 40:
            nextX = 0;
            nextY = 1;
            break;
        }
      }
