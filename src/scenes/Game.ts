import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";
import initAnims from "./anims";

import Aris from "../entities/Aris";

import Slimes from "../entities/Slimes";

class GameScene extends PhaserSceneTool {
  player: Player;
  player2;
  playerSlimes: any;
  opponentSlimes: any;

  playerCharacter;
  playerCharacter2;

  endPair;

  blackA;
  blackB;

  gameEnded: boolean = false;

  constructor() {
    super("GameScene");
  }

  create() {
    initAnims(this.anims);
    this.setLayouts();

    this.sound.play("ready");

    // this.playerWinCountText = this.add.text(460, 100, "0", {
    //   color: "#fff",
    //   fontSize: 50,
    // });
    // this.opponentWinCountText = this.add.text(530, 100, "0", {
    //   color: "#fff",
    //   fontSize: 50,
    // });

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

    this.blockA = this.matter.add
      .image(775, 210, "lineGreen", null, {
        isSensor: true,
        label: "blockA",
      })
      .setScale(0.6);
    this.blockA.setStatic(true);

    this.blockB = this.matter.add
      .image(250, 210, "lineYellow", null, {
        isSensor: true,
        label: "blockB",
      })
      .setScale(0.6);
    this.blockB.setStatic(true);

    this.matter.world.on("collisionactive", (event, o1, o2) => {
      if (
        event.pairs.some(
          (pair) =>
            (pair.bodyA.label == "blockB" &&
              pair.bodyB.label == "slimeSensor") ||
            (pair.bodyA.label == "blockA" && pair.bodyB.label == "slimeSensor")
        )
      ) {
        if (this.afterCollideTime == undefined) {
          this.afterCollideTime = this.getTimestamp();
          this.afterCollideTime += 3000;
        }
        if (
          this.afterCollideTime &&
          this.afterCollideTime < this.getTimestamp()
        ) {
          if (this.gameEnded) {
            return;
          }
          this.gameEnded = true;
          clearInterval(this.opponentInterbal);
          this.scene.pause();

          this.sound.play("happySong");
          setTimeout(() => {
            this.afterCollideTime = undefined;
            this.gameEnded = false;

            this.scene.restart();
            this.game.sound.stopAll();
          }, 4000);
        }
      } else {
        this.afterCollideTime = undefined;
      }
    });

    this.opponentInterbal = setInterval(() => {
      const randomLocation = Phaser.Math.Between(650, 950);
      this.opponentSlimes.spawnSlime(randomLocation);
      this.opponentSlimes.updateNextSlimeDisplay();
    }, 1200);
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
