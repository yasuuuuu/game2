var screenCanvas, info;
var run = true;
var fps = 1000 / 30;
var mouse = new Point();
var ctx;
var fire = false;
var counter = 0;

var CHARA_COLOR = 'rgba(0, 0, 255, 0.75)';
var CHARA_SHOT_COLOR = 'rgba(0, 255, 0, 0.75)';
var CHARA_SHOT_MAX_COUNT = 10;
var ENEMY_COLOR = 'rgba(255, 0, 0, 0.75)';
var ENEMY_MAX_COUNT = 10;

window.onload = function() {

  var i, j;
  var p = new Point();

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

  var enemy = new Array(ENEMY_MAX_COUNT);
  for(i = 0; i < ENEMY_MAX_COUNT; i++) {
    enemy[i] = new Enemy();
  }

  (function(){
    counter ++;

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

    if(counter % 100 === 0) {
      for(i = 0; i < ENEMY_MAX_COUNT; i++) {
        if(!enemy[i].alive) {
          j = (counter % 200) / 100;

          var enemySize = 15;
          p.x = -enemySize + (screenCanvas.width + enemySize * 2) * j;
          p.y = screenCanvas.height / 2;

          enemy[i].set(p, enemySize, j);

          break;
        }
      }
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


    ctx.beginPath();
    for(i = 0; i < ENEMY_MAX_COUNT; i++){
      if(enemy[i].alive){
        enemy[i].move();

        ctx.arc(
          enemy[i].position.x,
          enemy[i].position.y,
          enemy[i].size,
          0, Math.PI * 2, false
        );
        ctx.closePath();
      }
    }
    ctx.fillStyle = ENEMY_COLOR;
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
