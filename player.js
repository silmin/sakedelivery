enchant();

let Player = Class.create(Sprite, {
  initialize: function(x, y, core, w1, w2) {
    this.core = core;
    this.w1 = w1;
    this.w2 = w2;
    this.width = 50;
    this.height = 50;
    Sprite.call(this, this.width, this.height);
    this.moveTo(x, y);
    this.nx = this.x;
    this.ny = this.y;
    this.speed = 3;
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

    if(this.intersect(this.w1) || this.intersect(this.w2)) {
      this.x = this.bx;
      this.y = this.by;
    } else {
      this.bx = this.x;
      this.by = this.y;
    }
  }
});
