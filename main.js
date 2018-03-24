enchant();

window.onload = function() {
  var core = new Core(SIZE_X, SIZE_Y);
  core.fps = FPS;

  core.preload('./img/sake.png');
  core.preload('./img/hert.png');

  core.onload = function() {
    let scene = new Array();
    for(let i = 1; i <= SCENE; ++i) {
      scene[i] = new Scene();
    }

    let topLabel = new Label();
    topLabel.text = "top";
    topLabel.width = 300;
    topLabel.font = "15px 'meiryo'";
    topLabel.moveTo(0, 0);
    scene[TOP].addChild(topLabel);
    scene[TOP].addEventListener('touchstart', function() {
      core.replaceScene(scene[DESCRIPTION]);
    });

    core.pushScene(scene[TOP]);

    let descLabel = new Label();
    descLabel.text = "description";
    descLabel.width = 300;
    descLabel.font = "15px 'meiryo'";
    descLabel.moveTo(0, 0);
    scene[DESCRIPTION].addChild(descLabel);
    scene[DESCRIPTION].addEventListener('touchstart', function() {
      core.replaceScene(scene[GAME]);
    });

    let gameLabel = new Label();
    gameLabel.text = "game";
    gameLabel.width = 300;
    gameLabel.font = "15px 'meiryo'";
    gameLabel.moveTo(0, 0);
    scene[GAME].addChild(gameLabel);

    let leftWallSprite = new Sprite(SAFE_X, SIZE_Y-SAFE_Y);
    leftWallSprite.moveTo(0, 0);
    scene[GAME].addChild(leftWallSprite);

    let rightWallSprite = new Sprite(SAFE_X, SIZE_Y-SAFE_Y);
    rightWallSprite.moveTo(SAFE_X+PND_X, SAFE_Y);
    scene[GAME].addChild(rightWallSprite);

    let playerSprite = new Player(200, 200, core, leftWallSprite, rightWallSprite);
    scene[GAME].addChild(playerSprite);

    let stationSprite = new Sprite(SAFE_X, SAFE_Y);
    stationSprite.moveTo(0, SIZE_Y-SAFE_Y);
    scene[GAME].addChild(stationSprite);
    
    let chanmariSprite = new Sprite(SAFE_X, SAFE_Y);
    chanmariSprite.moveTo(SIZE_X-SAFE_X, 0);
    scene[GAME].addChild(chanmariSprite);

    let cntBackSprite = new Sprite(SAFE_X, SAFE_Y);
    cntBackSprite.moveTo(SIZE_X-SAFE_X, SAFE_Y);
    cntBackSprite.image = core.assets['./img/sake.png'];
    cntBackSprite.opacity = 0.5;
    scene[GAME].addChild(cntBackSprite);

    let cntLabel = new Label('0');
    cntLabel.font = "40px 'meiryo'";
    cntLabel.width = SAFE_X;
    cntLabel.moveTo(SIZE_X-SAFE_X+(SAFE_X-cntLabel._boundWidth)/2, SAFE_Y+40);
    scene[GAME].addChild(cntLabel);

    let moodBackSprite = new Sprite(SAFE_X, SAFE_Y);
    moodBackSprite.moveTo(SIZE_X-SAFE_X, SAFE_Y*2);
    moodBackSprite.image = core.assets['./img/hert.png'];
    moodBackSprite.opacity = 0.5;
    scene[GAME].addChild(moodBackSprite);

    let moodLabel = new Label('50');
    moodLabel.font = "40px 'meiryo'";
    moodLabel.width = SAFE_X;
    moodLabel.moveTo(SIZE_X-SAFE_X+(SAFE_X-moodLabel._boundWidth)/2, SAFE_Y*2+40);
    scene[GAME].addChild(moodLabel);

    let gaugeEntity = new Entity();
    gaugeEntity.width = 30;
    gaugeEntity.height = -500;
    gaugeEntity.moveTo(SIZE_X-SAFE_X+(SAFE_X-gaugeEntity.width)/2, SIZE_Y - 100);
    gaugeEntity.backgroundColor = '#adff2f';
    scene[GAME].addChild(gaugeEntity);

    let sakeCnt = 0;
    let mood = 50;
    let sakeGauge = FPS * 20;

    scene[GAME].addEventListener('enterframe', function() {
      
      if(0 < sakeGauge) {
        sakeGauge--;
      } else if(core.frame % FPS === 0 && 1 < mood) {
        mood--;
      }
      gaugeEntity.height = Math.floor(-500 * (sakeGauge / (FPS * 20)));
      moodLabel.text = '' + mood;


      if(playerSprite.intersect(stationSprite)){
        playerSprite.getSake();
        playerSprite.debugColor = 'blue';
      }
      if(playerSprite.intersect(chanmariSprite) && playerSprite.sake ){
        playerSprite.giveSake();
        playerSprite.debugColor = 'red';
        let pandySprite = new Reflecting();
        pandySprite.addEventListener('enterframe', function() {
          if(pandySprite.judgeEntity.intersect(playerSprite)){
            core.replaceScene(scene[RESULT]);
          }
        });
        scene[GAME].addChild(pandySprite);
        scene[GAME].addChild(pandySprite.judgeEntity);

        sakeCnt++;
        mood += 10;
        sakeGauge += Math.floor(FPS * 20 * 0.8);
        if( FPS * 20 < sakeGauge ) sakeGauge = FPS * 20;

        cntLabel.text = '' + sakeCnt;
      }
      //console.log(sakeCnt, mood, sakeGauge);
    });

    let resultLabel = new Label();
    resultLabel.text = "result";
    resultLabel.width = 300;
    resultLabel.font = "15px 'meiryo'";
    resultLabel.moveTo(0, 0);
    scene[RESULT].addChild(resultLabel);

    let scoreLabel = new Label();
    scoreLabel.width = 300;
    scoreLabel.font = "15px 'meiryo'";
    scoreLabel.moveTo(0, 100);
    scene[RESULT].addChild(scoreLabel);

    scene[RESULT].addEventListener('enter', function() {
        scoreLabel.text = '' + ((sakeCnt * sakeCnt) * mood);
        console.log(sakeCnt, mood);
    });

  };
  //core.start();
  core.debug();
};
