var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var fire = false;

var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;

window.onload = function() {

  screenCanvas = document.getElementById('screen');
  screenCanvas.width = 256;
  screenCanvas.height = 256;

  ctx = screenCanvas.getContext('2d');

  screenCanvas.addEventListener('mousemove', mouseMove, true);
  screenCanvas.addEventListener('mousedown', mouseDown, true);
  window.addEventListener('keydown', keyDown, true);

  info = document.getElementById('info');

  var chara = new Character();
  chara.init(10);

  var charaShot = new Array(CHARA_SHOT_MAX_COUNT);
  for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
    charaShot[i] = new CharacterShot();
  }

  (function(){
    info.innerHTML = mouse.x + ' : ' + mouse.y;

    if(fire){
      for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++){
        if(!charaShot[i].alive){
          charaShot[i].set(chara.position, 3, 5);
          break;
        }
      }
      fire = false;
    }

    ctx.clearRect(0, 0, screenCanvas.width, screenCanvas.height);

    ctx.beginPath();
    chara.position.x = mouse.x;
    chara.position.y = mouse.y;
    ctx.arc(chara.position.x, chara.position.y, chara.size, 0, Math.PI * 2, false);
    ctx.fillStyle = CHARA_COLOR;
    ctx.fill();

    ctx.beginPath();
    for(i = 0; i < CHARA_SHOT_MAX_COUNT; i++) {
      if(charaShot[i].alive) {
        charaShot[i].move();

        ctx.arc(
          charaShot[i].position.x,
          charaShot[i].position.y,
          charaShot[i].size,
          0, Math.PI * 2, false
        );

        ctx.closePath();
      }
    }

    ctx.fillStyle = CHARA_SHOT_COLOR;
    ctx.fill();

    if(run){ setTimeout(arguments.callee, fps); }
  })();
};

function mouseMove(event) {
  mouse.x = event.clientX - screenCanvas.offsetLeft;
  mouse.y = event.clientY - screenCanvas.offsetTop;
}

function keyDown(event) {
  var ck = event.keyCode;

  if(ck == 27) { run = false; }
}

function mouseDown(event) {
  fire = true;
}
