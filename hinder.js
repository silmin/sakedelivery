enchant();

let Reflecting = Class.create(Sprite, {
  initialize: function() {
    Sprite.call(this, 200, 200);

    this.moveTo(500, 700);
    this.speedx = Math.floor(3+Math.random() * 5);
    this.speedy = Math.floor(3+Math.random() * 5);

    this.judgeEntity = new Entity();
    this.judgeEntity.width = this.width * 0.6;
    this.judgeEntity.height = this.height * 0.6 ;
    this.judgeEntity.moveTo(this.x+this.width*0.2, this.y+this.height*0.2);
  },

  onenterframe: function() {
    this.x += this.speedx;
    this.y += this.speedy;

    this.judgeEntity.moveTo(this.x+this.width*0.2, this.y+this.height*0.2);

    if(this.x < SAFE_X || SAFE_X+PND_X-this.width < this.x) {
      this.speedx *= -1;
    }
    if(this.y < 0 || PND_Y-this.height < this.y) {
      this.speedy *= -1;
    }
  }
});
