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
