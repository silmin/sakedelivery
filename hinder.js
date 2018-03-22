enchant();

let Reflecting = Class.create(Sprite, {
  initialize: function() {
    this.width = this.height = Math.floor(Math.random() * 300);

    if(this.width < 50 || this.height < 50) {
      this.width = 50;
      this.height = 50;
    }
    Sprite.call(this, this.width, this.height);

    this.moveTo(
      Math.floor(SAFE_X + Math.random() * (PND_X-this.width-1)),
      Math.floor(Math.random() * (PND_Y-this.height-1))
    );
    this.speedx = Math.floor(Math.random() * 2 + (200 - this.width) * 0.05);
    this.speedy = Math.floor(Math.random() * 2 + (200 - this.height) * 0.05);
    if(this.speedx <= 0) this.speedx = 2;
    if(this.speedy <= 0) this.speedy = 2;

    this.judgeEntity = new Entity();
    this.judgeEntity.width = this.width / 2;
    this.judgeEntity.height = this.height / 2;
    this.judgeEntity.moveTo(this.x+this.width/4, this.y+this.height/4);
  },

  onenterframe: function() {
    this.x += this.speedx;
    this.y += this.speedy;

    this.judgeEntity.moveTo(this.x+this.width/4, this.y+this.height/4);

    if( this.x < SAFE_X || SAFE_X+PND_X-this.width < this.x ) {
      this.speedx *= -1;
    }
    if( this.y < 0 || PND_Y-this.height < this.y ) {
      this.speedy *= -1;
    }
  }
});
