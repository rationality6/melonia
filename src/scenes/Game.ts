import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";
import initAnims from "./anims";

import Aris from "../entities/Aris";

class GameScene extends PhaserSceneTool {
  player: Player;

  constructor() {
    super("GameScene");
  }

  create() {
    initAnims(this.anims);
    this.setJarAndWallCollision()

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

  removeObjectFromCatGroupArray(targetObject) {
    let foundCat = this.cats.findIndex(
      (cat) => cat.body.id == targetObject.body.id
    );
    this.cats.splice(foundCat, 1);

    this.matter.world.remove(targetObject);

    targetObject.destroy();
  }
}

export default GameScene;
