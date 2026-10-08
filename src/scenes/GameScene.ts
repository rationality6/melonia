import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";
import initAnims from "./anims";

import Aris from "../entities/Aris";

import Slimes from "../entities/Slimes";

import tutorialMixin from "../mixins/tutorialMixin";

class GameScene extends PhaserSceneTool {
  player: Player;
  player2;
  playerSlimes: any;
  opponentSlimes: any;

  playerCharacter;
  playerCharacter2;

  playerCharge = 0;
  opponentCharge = 0;

  playerWinCount = 0;
  playerWinCountText
  opponentWinCount = 0;
  opponentWinCountText

  endPair;

  blackA;
  blackB;

  gameEnded: boolean = false;

  afterCollideTime;
  collideLine;

  constructor(config) {
    super("GameScene");

    this.config = config;
  }

  create() {
    initAnims(this.anims);
    Object.assign(this, tutorialMixin);

    this.setLayouts();

    this.sound.play("ready");

    this.playerWinCountText = this.add.text(460, 100, this.playerWinCount, {
      color: "#fff",
      fontSize: 50,
    });
    this.opponentWinCountText = this.add.text(530, 100, this.opponentWinCount, {
      color: "#fff",
      fontSize: 50,
    });

    this.playerSlimes = new Slimes(this);
    this.opponentSlimes = new Slimes(this, "opponent");

    this.player = new Player(this, 350, 70, "aris");
    this.player2 = this.add.image(850, 70, "momoi").setScale(0.18);

    this.playerCharacter = new Aris(this, 512, 540, "aris")
      .setScale(0.3)
      .setOrigin(1, 0)
      .setDepth(2);

    this.playerCharacter2 = this.add
      .image(492, 570, "momoi")
      .setScale(0.25)
      .setOrigin(0, 0)
      .setDepth(2);

    this.tweens.add({
      targets: this.playerCharacter2,
      x: 502,
      duration: 1300,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    this.setGameEndCheckBlock();

    this.setOpponentActionInterval();
    this.setObsticleSlimeEffect();
    this.setFullscreenButton();
    this.setBackGround();

    // const superButton = this.add
    //   .image(100, 200, "fullscreen", 1)
    //   .setOrigin(1, 1)
    //   .setScale(0.5)
    //   .setInteractive()
    //   .setDepth(4);

    // superButton.on("pointerup", () => {
    //   this.playerSlimes.activateSuperMove();
    // });

    this.secretDebugComboKey();

    this.restartButton = this.add
      .image(this.gameWidth - 72, this.gameHeight - 12, "backButton")
      .setOrigin(1, 1)
      .setScale(2)
      .setInteractive();

    this.restartButton.on("pointerdown", () => {
      console.log("restart");
      this.restartGame();
    });
  }

  setObsticleSlimeEffect() {
    this.catmull = this.add.particles(300, 500, "blue", {
      x: { values: [0, 500], interpolation: "catmull" },
      lifespan: 2000,
      gravityY: -120,
      speed: 136,
      scale: 0.65,
      emitting: false,
      blendMode: "ADD",
    });
    this.catmull.setDepth(3);

    this.catmullReverse = this.add.particles(800, 500, "red", {
      x: { values: [0, -500], interpolation: "catmull" },
      lifespan: 2000,
      gravityY: -120,
      speed: 136,
      scale: 0.65,
      emitting: false,
      blendMode: "ADD",
    });
    this.catmullReverse.setDepth(3);
  }

  setOpponentActionInterval() {
    this.opponentInterbal = setInterval(() => {
      const randomLocation = Phaser.Math.Between(650, 950);
      this.opponentSlimes.spawnSlime(randomLocation);
      this.opponentSlimes.updateNextSlimeDisplay();
    }, 1200);
  }

  setGameEndCheckBlock() {
    this.lineA = this.matter.add
      .image(250, 195, "lineGreen", null, {
        isSensor: true,
        label: "lineA",
      })
      .setScale(0.6);
    this.lineA.setStatic(true);

    this.lineB = this.matter.add
      .image(775, 195, "lineYellow", null, {
        isSensor: true,
        label: "lineB",
      })
      .setScale(0.6);
    this.lineB.setStatic(true);

    this.matter.world.on("collisionactive", (event, o1, o2) => {
      if (
        event.pairs.some(
          (pair) =>
            pair.bodyA.label == "lineA" && pair.bodyB.label == "slimeSensor"
        )
      ) {
        if (
          this.afterCollideTime == undefined &&
          this.collideLine == undefined
        ) {
          this.afterCollideTime = this.getTimestamp();
          this.afterCollideTime += 3500;
          this.collideLine = "lineA";
        }
        if (
          this.afterCollideTime &&
          this.afterCollideTime < this.getTimestamp()
        ) {
          if (this.gameEnded) {
            return;
          }
          this.gameEnded = true;
          this.lineA.setTint(0xff0000)
          clearInterval(this.opponentInterbal);
          this.matter.pause();

          this.add.text(350, 300, "opponent Win!", {
            color: "#fff",
            fontSize: 50,
          }).setDepth(5)
          this.opponentWinCount += 1
          this.opponentWinCountText.setText(`${this.opponentWinCount}`);

          this.sound.play("happySong");
        }
      } else if (
        event.pairs.some(
          (pair) =>
            pair.bodyA.label == "lineB" && pair.bodyB.label == "slimeSensor"
        )
      ) {
        if (
          this.afterCollideTime == undefined &&
          this.collideLine == undefined
        ) {
          this.afterCollideTime = this.getTimestamp();
          this.afterCollideTime += 3500;
          this.collideLine = "lineB";
        }
        if (
          this.afterCollideTime &&
          this.afterCollideTime < this.getTimestamp()
        ) {
          if (this.gameEnded) {
            return;
          }
          this.gameEnded = true;
          this.lineB.setTint(0xff0000)
          clearInterval(this.opponentInterbal);
          this.matter.pause();

          this.add.text(400, 300, "You Win!", {
            color: "#fff",
            fontSize: 50,
          }).setDepth(5)
          this.playerWinCount += 1
          this.playerWinCountText.setText(`${this.playerWinCount}`);

          this.sound.play("happySong");
        }
      } else {
        this.collideLine = undefined;
        this.afterCollideTime = undefined;
      }

    });
  }

  restartGame() {
    this.matter.resume();
    clearInterval(this.opponentInterbal);
    this.afterCollideTime = undefined;
    this.collideLine == undefined
    this.gameEnded = false;

    this.scene.restart();
    this.game.sound.stopAll();
  }

  secretDebugComboKey() {
    // type debug and debug mode on
    this.input.keyboard.createCombo([68, 69, 66, 85, 71], {
      resetOnMatch: true,
    });

    this.input.keyboard.on(
      "keycombomatch",
      function (event) {
        // debugger;
      },
      this
    );
  }

  setBackGround() {
    let bgImage = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "backgroundMountain"
    );
    let scaleX = this.cameras.main.width / bgImage.width;
    let scaleY = this.cameras.main.height / bgImage.height + 0.13;
    let scale = Math.max(scaleX, scaleY);
    bgImage.setScale(scale).setScrollFactor(0).setDepth(-1);
  }

  setFullscreenButton() {
    const fullscreenButton = this.add
      .image(this.gameWidth - 20, this.gameHeight - 20, "fullscreen", 1)
      .setOrigin(1, 1)
      .setScale(0.5)
      .setInteractive()
      .setDepth(4);

    fullscreenButton.on("pointerup", () => {
      if (this.scale.isFullscreen) {
        fullscreenButton.setFrame(0);
        this.scale.stopFullscreen();
      } else {
        fullscreenButton.setFrame(1);
        this.scale.startFullscreen();
      }
    });
  }

  setLayouts() {
    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);

    let jarPlayer = this.add.image(250, 330, "emptyJar").setScale(1.5);
    let jarPlayer2 = this.add.image(770, 330, "emptyJar").setScale(1.5);

    let leftWall = this.matter.add.rectangle(250, 720, 510, 60, {
      chamfer: { radius: 20 },
      isStatic: true,
    });

    this.matter.add.rectangle(510, 410, 80, 800, {
      chamfer: { radius: 20 },
      isStatic: true,
    });

    this.matter.add.rectangle(0, 410, 50, 800, {
      chamfer: { radius: 20 },
      isStatic: true,
    });

    this.matter.add.rectangle(1010, 410, 50, 800, {
      chamfer: { radius: 20 },
      isStatic: true,
    });

    this.matter.add.rectangle(770, 720, 510, 60, {
      chamfer: { radius: 20 },
      isStatic: true,
    });
  }
}

export default GameScene;
