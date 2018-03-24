enchant();

let speedItem = Class.create(Sprite, {
  initialize: function() {
    Sprite.call(this, 30, 30);
    this.moveTo(
      SAFE_X+Math.random()*(PND_X-this.width), 
      Math.random()*(SIZE_Y-this.height)
    );
  }
});
