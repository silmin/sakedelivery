enchant();

window.onload = function() {
  var core = new Core(SIZE_X, SIZE_Y);
  core.fps = FPS;

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
    scene[GAME].addEventListener('touchstart', function() {
      core.replaceScene(scene[RESULT]);
    });


    let player = new playerSprite(50, 50, core);
    scene[GAME].addChild(player);

    let pandy = new reflectingSprite();
    console.log(pandy.width);
    console.log(pandy.speedx);
    console.log(pandy.speedy);
    scene[GAME].addChild(pandy);

    let resultLabel = new Label();
    resultLabel.text = "result";
    resultLabel.width = 300;
    resultLabel.font = "15px 'meiryo'";
    resultLabel.moveTo(0, 0);
    scene[RESULT].addChild(resultLabel);
  };
  //core.start();
  core.debug();
};
