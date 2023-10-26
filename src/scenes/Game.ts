import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";
import initAnims from "./anims";

import Aris from "../entities/Aris";

import Slimes from "../entities/Slimes";

class GameScene extends PhaserSceneTool {
  player: Player;
  player2;
  slimes: any;

  playerCharacter;
  playerCharacter2;

  endPair;

  constructor() {
    super("GameScene");
  }

  create() {
    initAnims(this.anims);
    this.setLayouts();

    this.sound.play("ready");

    this.add.text(460, 100, "0", { color: "#fff", fontSize: 50 });
    this.add.text(530, 100, "0", { color: "#fff", fontSize: 50 });

    this.slimes = new Slimes(this, 0, 0, "slimes");

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

    this.blockB = this.matter.add.image(250, 270, "block", null, {
      isSensor: true,
      label: "blockB",
    });
    this.blockB.setStatic(true);
    this.blockB = this.matter.add.image(150, 270, "block", null, {
      isSensor: true,
      label: "blockB",
    });
    this.blockB.setStatic(true);

    this.blockB = this.matter.add.image(350, 270, "block", null, {
      isSensor: true,
      label: "blockB",
    });
    this.blockB.setStatic(true);

    this.matter.world.on("collisionactive", (event, o1, o2) => {
      if (
        event.pairs.some(
          (pair) =>
            pair.bodyA.label == "blockB" && pair.bodyB.label == "slimeSensor"
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
          console.log("game ended");
          this.scene.pause();
        }
      } else {
        this.afterCollideTime = undefined;
      }
    });

    this.rayGraphics = this.add.graphics({
      lineStyle: {
        width: 3,
        color: 0xff0000,
      },
    });

    const line = new Phaser.Geom.Line();
    line.x1 = 70;
    line.y1 = 270;
    line.x2 = 450;
    line.y2 = 270;

    this.rayGraphics.strokeLineShape(line);

    this.rayGraphics2 = this.add.graphics({
      lineStyle: {
        width: 2,
        color: 0xff0000,
      },
    });

    const line2 = new Phaser.Geom.Line();
    line.x1 = 570;
    line.y1 = 270;
    line.x2 = 950;
    line.y2 = 270;

    this.rayGraphics.strokeLineShape(line);
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

  update() {
    // console.log(this.endPair)
  }
}

export default GameScene;
