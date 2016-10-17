function Character() {
  this.position = new Point();
  this.size = 0;
}

Character.prototype.init = function(size) {
  this.size = size;
};



function CharacterShot() {
  this.position = new Point();
  this.size = 0;
  this.speed = 0;
  this.alive = false;
}

CharacterShot.prototype.set = function(p, size, speed) {
  this.position.x = p.x;
  this.position.y = p.y;

  this.size = size;
  this.speed = speed;

  this.alive = true;
};

CharacterShot.prototype.move = function() {
  this.position.y -= this.speed;

  if(this.position.y < -this.size) {
    this.alive = false;
  }
};



function Enemy() {
  this.position = new Point();
  this.size = 0;
  this.type = 0;
  this.param = 0;
  this.alive = false;
}

Enemy.prototype.set = function(p, size, type) {
  this.position.x = p.x;
  this.position.y = p.y;

  this.size = size;
  this.type = type;

  this.param = 0;

  this.alive = true;
};

Enemy.prototype.move = function() {
  this.param++;

  switch(this.type) {
    case 0:
      this.position.x +=2;
      if(this.position.x > this.size + screenCanvas.width) {
        this.alive = false;
      }
      break;
    case 1:
      this.position.x -= 2;
      if(this.position.x < -this.size) {
        this.alive = false;
      }
      break;
  }
};
