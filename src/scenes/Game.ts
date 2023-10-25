import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";
import initAnims from "./anims";

import Aris from "../entities/Aris";

import Slimes from "../entities/Slimes"

class GameScene extends PhaserSceneTool {
  player: Player;
  slimes: any;

  constructor() {
    super("GameScene");
  }

  create() {
    initAnims(this.anims);
    this.setJarAndWallCollision()

    this.slimes = new Slimes(this, 0, 0, "slimes");

    this.player = new Player(this, 350, 70, "aris");

    this.playerCharacter = new Aris(this, 512, 540, "aris")
      .setScale(0.3)
      .setOrigin(1, 0)
      .setDepth(2);
    this.playerCharacter2 = new Aris(this, 512, 540, "aris")
      .setScale(0.3)
      .setOrigin(0, 0)
      .setDepth(2)
      .setFlipX(true);
  }

  setJarAndWallCollision() {
    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);

    let jarPlayer = this.add.image(250, 330, "emptyJar").setScale(1.5);
    let jarPlayer2 = this.add.image(770, 330, "emptyJar").setScale(1.5);

    this.matter.add.rectangle(250, 720, 510, 60, {
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
