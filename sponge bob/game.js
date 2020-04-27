var game;

var gameOptions = {
  zıplamaheigth: 300,
  boxgravity: 600,
  obstaclevelocity: 0,
  obstacledist: [120, 440],
  obstaclehight: 250,
  pipespace: 134,
  score: 0,
  velocity: -150,
  eks: 0,
  a: 0,
  highscore: 0,
  ///bundan iki önce ye kadar geri al//
  // isCollide:0
};

window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x87ceeb,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 750,
      height: 500,
      parent: "thegame",
    },
    physics: {
      default: "arcade",
      arcade: {
        debug: false,
      },
    },
    scene: playGame,
  };
  game = new Phaser.Game(gameConfig);
  window.focus();
};
var anim;
var sprite;
var conf;

class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
    // this.gameOver = false ;
  }

  preload() {
    this.load.spritesheet("sponge", "assets/sponge.png", {
      frameWidth: 31.3,
      frameHeight: 40,
    });
    this.load.image("ground", "assets/bg.PNG");
    // this.load.image("box", "sung.png");
    this.load.image("obstacle1", "assets/pipe.png");
    this.load.image("obstacle2", "assets/pipe2.png");
    this.load.image("healthbar", "assets/clipart-3-25-2-5-38.png");
    this.load.image("h", "assets/clipart-3-25-2-38-49.png");
    this.load.audio("hurt", "assets/hurt.mp3");
    /*
    this.load.image('cat1', 'cat1.png');
    this.load.image('cat2', 'cat2.png');
    this.load.image('cat3', 'cat3.png');
    this.load.image('cat4', 'cat4.png'); 
                                          */

    this.load.spritesheet("deadsponge", "assets/desp.png", {
      frameWidth: 44,
      frameHeight: 48,
    });
  }
  create() {
    this.isCollide = 0;

    this.hurt = this.sound.add("hurt");

    this.zemin = this.physics.add.sprite(game.config.width / 2, 250, "ground");

    this.healthbar = this.physics.add.sprite(
      42 - this.isCollide,
      120,
      "healthbar"
    );
    this.health = this.physics.add.sprite(64, 120, "h");

    ///////// HAREKETli  SÜNGER BOB/////////////
    this.box = this.physics.add
      .sprite(
        (game.config.width / 10) * 2,
        (game.config.height / 4) * 3 - gameOptions.zıplamaheigth,
        "sponge"
      )
      .setScale(1.1);
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("sponge", { start: 0, end: 8 }),
      frameRate: 12,
      //   yoyo: true,
      repeat: -1,
    });

    this.box.anims.load("walk");
    this.box.anims.play("walk");
    ///////// HAREKETli  SÜNGER BOB/////////////

    //  console.log("CREATE");
    //

    /*
     this.anims.create({
      key: 'snooze',
      frames: [
          { key: 'cat1' },
          { key: 'cat2' },
          { key: 'cat3' },
          { key: 'cat4', duration: 50 }
      ],
      frameRate: 8,
      repeat: -1
  });

  this.add.sprite(400, 300, 'cat1').play('snooze');


  //////""""""   TUŞLAR VE ATANMASI ******** ///////////////////                                         */

    this.keyBosluk = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    this.keyDur = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    this.keyDevam = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.R
    );
    ///

    this.obstacleGrup = this.physics.add.group();
    this.obstacleGrup1 = this.physics.add.group();

    let obstaclex = game.config.width / 2;
    let obstacley = 0;

    for (let i = 0; i < 10; i++) {
      obstaclex += Phaser.Math.Between(260, 400);
      obstacley = Phaser.Math.Between(-95, 125);

      this.obstacle = this.obstacleGrup.create(
        obstaclex,
        gameOptions.obstaclehight + gameOptions.pipespace + obstacley,
        "obstacle1"
      );
      this.obstacle.setImmovable(true);

      this.obstacle = this.obstacleGrup1.create(
        obstaclex,
        obstacley,
        "obstacle2"
      );

      this.obstacle.setImmovable(true);
    }

    this.obstacleGrup.setVelocityX(gameOptions.velocity);
    this.obstacleGrup1.setVelocityX(gameOptions.velocity);

    ///////// HAREKETSİZ SÜNGER BOB/////////////
    /*   
   
   
   this.box = this.physics.add.sprite(
      (game.config.width / 10) * 2,
      (game.config.height / 4) * 3 - gameOptions.zıplamaheigth,
      "box"
    ); 
    
    */
    ///////// HAREKETSİZ SÜNGER BOB/////////////
    this.dead = this.physics.add
      .sprite(this.box.x, this.box.y, "deadsponge")
      .setScale(2);

    this.anims.create({
      key: "dead",
      frames: this.anims.generateFrameNumbers("deadsponge", {
        start: 0,
        end: 1,
      }),
      frameRate: 4,
      //   yoyo: true,
      repeat: -1,
    });
    this.dead.anims.load("dead");
    this.dead.anims.play("dead");
    this.dead.setActive(false).setVisible(false);

    ///

    this.zemin.setImmovable(true);

    this.box.body.gravity.y = gameOptions.boxgravity;
    this.box.setCircle(10);
    this.box.setCollideWorldBounds(true);
    // this.dead.setCollideWorldBounds(true);
    this.dead.body.gravity.y = gameOptions.boxgravity;
    this.dead.setCircle(15);
    this.dead.setCollideWorldBounds(true);

    // this.key = this.input.keyboard.addKey(Phaser.Input.Keyboard.SPACE);
    // this.zemin.setOrigin(100,100);
    //  this.box.setBounce(1, 1);
    // console.log(this.key.isDown)

    this.scoreText = this.add.text(0, 16, "Score: 0", {
      fontSize: "30px",
      fill: "white",
    });
  }

  getLastObstacle() {
    let LastObstacle = 0;

    this.obstacleGrup.getChildren().forEach((obstacle) => {
      LastObstacle = Math.max(LastObstacle, obstacle.x);
    });

    return LastObstacle;
  }

  update() {
    this.isAF = 1;
    //*** SÜNGER BOB UN ÖLME KOŞULLARI *****//
    if (this.box.y > game.config.height - 15 || this.box.y < 15) {
      this.hurt.play();
      this.isCollide += 1;
      this.isAF = 0;

      this.physics.moveTo(
        this.dead,
        (game.config.width / 10) * 2,
        (game.config.height / 4) * 3 - gameOptions.zıplamaheigth,
        400,
        750
      );
      this.physics.moveTo(
        this.box,
        (game.config.width / 10) * 2,
        (game.config.height / 4) * 3 - gameOptions.zıplamaheigth,
        400,
        750
      );

      /*
      localStorage.setItem(gameOptions.highscore,Math.max(
        gameOptions.score,
        localStorage.getItem(gameOptions.highscore)
      ));

      this.add.text(
        20,
        120,
        " GAME OVER\n Score = " + Phaser.Math.RoundTo(gameOptions.score, 0),
        { fontSize: "100px", fill: "blue" }
      );

      
    


      this.time.addEvent({
        delay: 2500,
        callback: () => {
          this.scene.start("PlayGame");
          this.isCollide += 1;
         // gameOptions.score = 0;
         // this.isCollide = 1;
          gameOptions.velocity = -150;
         // this.isCollide = 1;
        },
        loop: true,
      }); */
    }

    this.physics.collide(
      this.obstacleGrup,
      this.box,
      function () {
       // this.hurt.play();
        this.isCollide += 1;
        this.isAF = 0;
        /*
        localStorage.setItem(gameOptions.highscore,Math.max(
          gameOptions.score,
          localStorage.getItem(gameOptions.highscore)
        ));

        this.add.text(
          20,
          120,
          " GAME OVER\n Score = " + Phaser.Math.RoundTo(gameOptions.score, 0),
          { fontSize: "100px", fill: "blue" }
        );

        this.time.addEvent({
          delay: 2500,
          callback: () => {
            this.scene.start("PlayGame");

            this.isCollide += 1;
       //     gameOptions.score = 0;
            gameOptions.velocity = -150;
          },
          loop: true,
        });
        */
      },
      null,
      this
    );

    this.physics.collide(
      this.obstacleGrup1,
      this.box,
      function () {
       // this.hurt.play();
        this.isCollide += 1;
        this.isAF = 0;
        /*
        localStorage.setItem(gameOptions.highscore,Math.max(
          gameOptions.score,
          localStorage.getItem(gameOptions.highscore)
        ));
        
        this.add.text(
          20,
          120,
          " GAME OVER\n Score = " + Phaser.Math.RoundTo(gameOptions.score, 0),
          { fontSize: "100px", fill: "blue" }
        );

        this.time.addEvent({
          delay: 2500,
          callback: () => {
            this.scene.start("PlayGame");
            this.isCollide += 1;
           // gameOptions.score = 0;
            gameOptions.velocity = -150;
          },
          loop: true,
        });

        */
      },
      null,
      this
    );

    //*** SÜNGER BOB UN ÖLME KOŞULLARI ***//

    //////////////////////////////////******ENGELLERİN ÜRETİLMESİ ******////////////////////////////////////////////
    this.obstacleGrup.getChildren().forEach((obstacle) => {
      if (obstacle.getBounds().right < 0) {
        gameOptions.eks = Phaser.Math.Between(-95, 125);
        obstacle.x = this.getLastObstacle() + Phaser.Math.Between(260, 400);
        obstacle.y =
          gameOptions.eks + gameOptions.obstaclehight + gameOptions.pipespace;

        this.say = obstacle.x;
      }
    }, this);

    this.obstacleGrup1.getChildren().forEach((obstacle) => {
      if (obstacle.getBounds().right < 0) {
        obstacle.x = this.getLastObstacle();
        obstacle.y = gameOptions.eks;
      }
    }, this);
    //////////////////////////////////******ENGELLERİN ÜRETİLMESİ ******////////////////////////////////////////////

    ////ZIPLAMAK İÇİN ///////
    if (
      this.keyBosluk.isDown
      //  this.input.activePointer.isDown
    ) {
     // this.hurt.play();
      this.box.setVelocity(0, (-1.5 * gameOptions.zıplamaheigth) / 2);
      this.dead.setVelocity(0, (-1.5 * gameOptions.zıplamaheigth) / 2);
    }
    ////ZIPLAMAK İÇİN ///////

    /////////////************************OYUN HIZINI HER UPTADE DE YÜKSELT*************//////////////////////////////////
    if (gameOptions.score > 0) {
      gameOptions.velocity += -0.07;

      this.obstacleGrup.setVelocityX(gameOptions.velocity);

      this.obstacleGrup1.setVelocityX(gameOptions.velocity);
    }
    /////////////************************OYUN HIZINI HER UPTADE DE YÜKSELT*************//////////////////////////////////

    // gameOptions.score+=1/10;

    if (localStorage.getItem(gameOptions.highscore) == null) {
      localStorage.getItem(gameOptions.highscore) == 0;
    }

    this.scoreText.setText(
      "Score: " +
        Phaser.Math.RoundTo(gameOptions.score, 0) +
        "\nHighScore:" +
        Phaser.Math.RoundTo(localStorage.getItem(gameOptions.highscore), 0) +
        "\nHealth:%" +
        Math.max(100 - this.isCollide, 0)
    );

    this.healthbar.x = 42 - this.isCollide;

    /// SCORE ARTTIRMAK BİTTİ
    if (this.keyDur.isDown) {
      // console.log("dur");
      this.scene.pause();
      ; // his.scene.launch('sceneB');
    }
    if (this.keyDevam.isDown) {
      // console.log("devam");
      this.scene.stop();
      this.scene.resume("PlayGame");
    }

    ////////////

    if (this.isCollide > 99) {
      this.box.setActive(false).setVisible(false);
      this.dead.setActive(true).setVisible(true);

      this.isAF = 0;
      localStorage.setItem(
        gameOptions.highscore,
        Math.max(gameOptions.score, localStorage.getItem(gameOptions.highscore))
      );

      this.add.text(
        20,
        120,
        " GAME OVER\n Score = " + Phaser.Math.RoundTo(gameOptions.score, 0),
        { fontSize: "100px", fill: "blue" }
      );

      this.time.addEvent({
        delay: 2500,
        callback: () => {
          this.scene.start("PlayGame");

          this.isCollide = 0;
          this.isAF = 1;
          gameOptions.score = 0;
          gameOptions.velocity = -150;
        },
        loop: true,
      });
    }

    ///////****SKOR ARTMA ŞARTI *****///////

    this.obstacleGrup1.getChildren().forEach((obstacle) => {
      if (this.isAF !== 0) {
        gameOptions.score += 1 / 100;
      }
    }, this);
    ///////****SKOR ARTMA ŞARTI *****///////
  }
}
