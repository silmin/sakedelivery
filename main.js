enchant();

const ASSETS = [
  './img/title2.png',
  './img/description.png',
  './img/player.png',
  './img/sake.png',
  './img/hert.png',
  './img/sakeIcon.png',
  './img/speedup.png',
  './img/pandy.png',
  './img/pandy2.png',
  './img/pandy3.png',
  './img/pandy4.png',
  './img/station.png',
  './img/chanmari.png',
  './img/wall.png',
  './img/wall2.png',
  './sound/start.mp3',
  './sound/title.mp3',
  './sound/game.mp3',
  './sound/speedup.mp3',
  './sound/get.mp3',
  './sound/drink.mp3',
];

window.onload = function() {
  var core = new Core(SIZE_X, SIZE_Y);
  core.fps = FPS;

  core.preload(ASSETS);

  core.onload = function() {

    let titleBgm = core.assets['./sound/title.mp3'];
    let startSound = core.assets['./sound/start.mp3'];
    let gameBgm = core.assets['./sound/game.mp3'];
    let speedSound = core.assets['./sound/speedup.mp3'];
    let getSound = core.assets['./sound/get.mp3'];
    let drinkSound = core.assets['./sound/drink.mp3'];

    let scene = new Array();
    for(let i = 1; i <= SCENE; ++i) {
      scene[i] = new Scene();
    }
    scene[TOP].addEventListener('touchstart', function() {
      startSound.play();
      startSound.volume -= 0.8;

      core.replaceScene(scene[DESCRIPTION]);
    });

    scene[TOP].addEventListener('enter', function() {
      titleBgm.play();
      titleBgm.volume -= 0.8;
    });

    scene[TOP].backgroundColor = '#f5deb3';
    scene[GAME].backgroundColor = '#f5deb3';
    scene[RESULT].backgroundColor = '#f5deb3';

    let titleSprite = new Sprite(600, 200);
    titleSprite.image = core.assets['./img/title2.png'];
    titleSprite.moveTo((SIZE_X-titleSprite.width)/2, (SIZE_Y-titleSprite.height)/2);
    scene[TOP].addChild(titleSprite);
    
    let clickStartLabel = new Label("click start");
    clickStartLabel.font = "30px 'meiryo'";
    clickStartLabel.moveTo((core.width - clickStartLabel._boundWidth) / 2, 700 );
    scene[TOP].addChild(clickStartLabel);

    clickStartLabel.addEventListener('enterframe', function() {
      clickStartLabel.opacity = (Math.cos(core.frame*2*Math.PI/180)+1)*0.5;
    });

    core.pushScene(scene[TOP]);
    

    let descSprite = new Sprite(SIZE_X, SIZE_Y);
    descSprite.moveTo(0, 0);
    descSprite.image = core.assets['./img/description.png'];
    scene[DESCRIPTION].addChild(descSprite);
    scene[DESCRIPTION].addEventListener('touchstart', function() {
      startSound.stop();
      core.replaceScene(scene[GAME]);
    });

    let backWall = new Sprite(SIZE_X, SIZE_Y);
    backWall.image = core.assets['./img/wall.png'];
    backWall.moveTo(0, 0);
    backWall.opacity = 0.2;
    scene[GAME].addChild(backWall);

    let leftWallSprite = new Sprite(SAFE_X, SIZE_Y-SAFE_Y);
    leftWallSprite.image = core.assets['./img/wall2.png'];
    leftWallSprite.moveTo(0, 0);
    scene[GAME].addChild(leftWallSprite);
    
    let rightWallSprite = new Sprite(SAFE_X, SIZE_Y-SAFE_Y);
    rightWallSprite.image = core.assets['./img/wall2.png'];
    rightWallSprite.moveTo(SAFE_X+PND_X, SAFE_Y);
    scene[GAME].addChild(rightWallSprite);
    
    let stationSprite = new Sprite(SAFE_X, SAFE_Y);
    stationSprite.image = core.assets['./img/station.png'];
    stationSprite.moveTo(0, SIZE_Y-SAFE_Y);
    scene[GAME].addChild(stationSprite);
    
    let chanmariSprite = new Sprite(SAFE_X, SAFE_Y);
    chanmariSprite.image = core.assets['./img/chanmari.png'];
    chanmariSprite.moveTo(SIZE_X-SAFE_X, 0);
    scene[GAME].addChild(chanmariSprite);

    let playerSprite = new Player(SAFE_X+100, SIZE_Y-70, core, leftWallSprite, rightWallSprite);
    playerSprite.image = core.assets['./img/player.png'];
    scene[GAME].addChild(playerSprite);
    scene[GAME].addChild(playerSprite.judgeSprite);

    let sakeIcon = new Sprite(30, 30);
    sakeIcon.moveTo(playerSprite.x+30, playerSprite.y-10);
    sakeIcon.image = core.assets['./img/sakeIcon.png'];
    sakeIcon.visible = false;
    scene[GAME].addChild(sakeIcon);

    let speedIcon = new Sprite(30, 30);
    speedIcon.moveTo(playerSprite.x-10, playerSprite.y-10);
    speedIcon.image = core.assets['./img/speedup.png'];
    speedIcon.visible = false;
    scene[GAME].addChild(speedIcon);

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
    gaugeEntity.backgroundColor = '#f0d001';
    scene[GAME].addChild(gaugeEntity);

    let sakeCnt = 0;
    let mood = 50;
    let sakeGauge = FPS * 20;

    let itemInterval = FPS * 30;
    let itemHold = FPS * 10;
    let itemFrame;

      
    scene[GAME].addEventListener('enter', function() {
      titleBgm.stop();
      gameBgm.play();
      gameBgm.volume -= 0.8;
    });

    scene[GAME].addEventListener('enterframe', function() {

      if(0 < sakeGauge) {
        sakeGauge--;
      } else if(core.frame % FPS === 0 && 1 < mood) {
        mood--;
      }
      gaugeEntity.height = Math.floor(-500 * (sakeGauge / (FPS * 20)));
      moodLabel.text = '' + mood;

      if(core.frame % itemInterval === 0) {
        let itemSprite = new speedItem();
        itemSprite.image = core.assets['./img/speedup.png'];
        itemSprite.addEventListener('enterframe', function() {
          if(itemSprite.intersect(playerSprite.judgeSprite)) {
            speedSound.play();
            speedSound.volume -= 0.8;
            itemFrame = core.frame;
            playerSprite.speed = 8;
            speedIcon.visible = true;
            scene[GAME].removeChild(itemSprite);
            itemSprite = null;
          }
        });
        scene[GAME].addChild(itemSprite);
      }

      if(core.frame-itemFrame === itemHold) {
        playerSprite.speed = 5;
        speedIcon.visible = false;
      }

      if(playerSprite.judgeSprite.intersect(stationSprite)) {
        if(!playerSprite.sake) getSound.play();
        playerSprite.getSake();
        sakeIcon.visible = true;
      }
      if(playerSprite.judgeSprite.intersect(chanmariSprite) && playerSprite.sake ) {
        drinkSound.play();
        playerSprite.giveSake();
        sakeIcon.visible = false;
        let pandySprite = new Reflecting();
        pandySprite.image = core.assets['./img/pandy.png'];
        pandySprite.addEventListener('enterframe', function() {
          if(pandySprite.judgeEntity.intersect(playerSprite.judgeSprite)) {
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

        cntLabel.moveTo(SIZE_X-SAFE_X+(SAFE_X-cntLabel._boundWidth)/2, SAFE_Y+40);
      }
      speedIcon.moveTo(playerSprite.x-10, playerSprite.y-10);
      moodLabel.moveTo(SIZE_X-SAFE_X+(SAFE_X-moodLabel._boundWidth)/2, SAFE_Y*2+40);
      sakeIcon.moveTo(playerSprite.x+30, playerSprite.y-10);
    });

    let resultLabel = new Label("りざると");
    resultLabel.font = "70px 'meiryo'";
    resultLabel.width = 400;
    resultLabel.moveTo((SIZE_X-resultLabel._boundWidth)/2, 250);

    let resultSprite = new Sprite(200, 200);
    resultSprite.moveTo((SIZE_X-resultSprite.width)/2, 500);

    let scoreLabel = new Label();
    scoreLabel.font = "50px 'meiryo'";
    scoreLabel.width = 350;

    let tweetLabel = new Label("ついーとする");
    tweetLabel.font = "35px 'meiryo'";
    tweetLabel.width = 220;
    tweetLabel.moveTo((SIZE_X-tweetLabel._boundWidth)/2, 750 );

    let returnLabel = new Label("もういっかいやる");
    returnLabel.font = "35px 'meiryo'";
    returnLabel.moveTo((SIZE_X-returnLabel._boundWidth)/2, 820 );

    let myInfo = new Label("製作者: mina(Twitter: @silmin_)<br>自機イラスト: ヒヂノさん(Twitter: @hidinoise)");
    myInfo.font = "20px 'meiryo'";
    myInfo.width = 500;
    myInfo.moveTo(10, SIZE_Y - 70);
    scene[TOP].addChild(myInfo);

    
    returnLabel.addEventListener('touchstart', function() {
      location.reload();
    });

    tweetLabel.addEventListener('touchstart', function() {
      let EUC = encodeURIComponent;
      let tweetUrl = "http://twitter.com/?status=";
      let message = "かしこまりちゃんのファンゲーム【酒でりばりー】あなたのスコアは"+(sakeCnt*mood)+"でした！プレイしてくれてありがとう！ https://silmin.github.io/sakedelivery/ #酒でりばりー";

      location.href = tweetUrl + EUC(message);
    });
    scene[RESULT].addEventListener('enter', function() {
      gameBgm.stop();
      titleBgm.play();
      scene[RESULT].addChild(tweetLabel);
      scene[RESULT].addChild(returnLabel);
      scene[RESULT].addChild(myInfo);
      scene[RESULT].addChild(scoreLabel);
      scene[RESULT].addChild(resultLabel);
      scene[RESULT].addChild(resultSprite);
      scoreLabel.text = 'Score: ' + (sakeCnt*mood);
      scoreLabel.moveTo((SIZE_X-scoreLabel._boundWidth)/2, 400);

      if(sakeCnt*mood < 400) {
        resultSprite.image = core.assets['./img/pandy.png'];
      } else if(sakeCnt*mood < 700) {
        resultSprite.image = core.assets['./img/pandy2.png'];
      } else if(sakeCnt*mood < 1000) {
        resultSprite.image = core.assets['./img/pandy3.png'];
      } else {
        resultSprite.image = core.assets['./img/pandy4.png'];
      }
    });
  };
  core.start();
  //core.debug();
};
