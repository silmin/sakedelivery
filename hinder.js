enchant();

let Reflecting = Class.create(Sprite, {
  initialize: function() {
    Sprite.call(this, 200, 200);

    this.moveTo(
      Math.floor(SAFE_X + Math.random() * (PND_X-this.width-1)),
      Math.floor(Math.random() * (PND_Y-this.height-1))
    );
    this.speedx = Math.floor(Math.random() * 7);
    this.speedy = Math.floor(Math.random() * 7);
    if(this.speedx < 2) this.speedx = 2;
    if(this.speedy < 2) this.speedy = 2;

    this.judgeEntity = new Entity();
    this.judgeEntity.width = this.width * 0.75;
    this.judgeEntity.height = this.height * 0.75 ;
    this.judgeEntity.moveTo(this.x+this.width*0.125, this.y+this.height*0.125);
  },

  onenterframe: function() {
    this.x += this.speedx;
    this.y += this.speedy;

    this.judgeEntity.moveTo(this.x+this.width*0.125, this.y+this.height*0.125);

    if(this.judgeEntity.x < SAFE_X || SAFE_X+PND_X-this.judgeEntity.width < this.judgeEntity.x) {
      this.speedx *= -1;
    }
    if(this.judgeEntity.y < 0 || PND_Y-this.judgeEntity.height < this.judgeEntity.y) {
      this.speedy *= -1;
    }
  }
});
