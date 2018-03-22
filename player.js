enchant();

let Player = Class.create(Sprite, {
  initialize: function(x, y, core) {
    this.core = core;
    this.moveTo(x, y);
    this.width = 50;
    this.height = 50;
    Sprite.call(this, this.width, this.height);
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
  }
});
