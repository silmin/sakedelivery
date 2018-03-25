enchant();

let Player = Class.create(Sprite, {
  initialize: function(x, y, core, w1, w2) {
    this.core = core;
    this.w1 = w1;
    this.w2 = w2;
    Sprite.call(this, 50, 50);
    this.moveTo(x, y);
    this.nx = this.x;
    this.ny = this.y;
    this.speed = 5;

    this.sake = false;

    this.judgeSprite = new Sprite(30, 50);
    this.judgeSprite.moveTo(this.x+10, this.y);
  },

  onenterframe: function() {
    if(this.core.input.up) {
      this.y -= this.speed;
    }
    if(this.core.input.down) {
      this.y += this.speed;
    }
    if(this.core.input.left) {
      this.x -= this.speed;
    }
    if(this.core.input.right) {
      this.x += this.speed;
    }

    this.judgeSprite.moveTo(this.x+10, this.y);


    if(this.intersect(this.w1) || this.intersect(this.w2) ||
       this.x < 0 || SIZE_X < this.x+this.width) {
      this.x = this.bx;
    } else {
      if(this.bx < this.x) this.scaleX = -1;
      if(this.bx > this.x) this.scaleX = 1;
      this.bx = this.x;
    }

    if(this.intersect(this.w1) || this.intersect(this.w2) ||
       this.y < 0 || SIZE_Y < this.y+this.height) {
      this.y = this.by;
    } else {
      this.by = this.y;
    }
  },

  getSake: function() {
    this.sake = true;
  },

  giveSake: function() {
    this.sake = false;
  }
});
