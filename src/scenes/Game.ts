import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";
import initAnims from "./anims";

class GameScene extends PhaserSceneTool {
  player: Player;
  inputKeys: any;

  constructor() {
    super("GameScene");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("IceTileset", "iceTiles", 32, 32, 0, 0);
    
    const layer1 = map.createLayer("fields", tileset, 0, 0);
    const layer2 = map.createLayer("trees", tileset, 0, 0);

    initAnims(this.anims);

    this.matter.world.setBounds(0, 0, 512, 512);

    [...Array(30).keys()].forEach((i) => {
      let cat1 = this.matter.add
        .sprite(150, i + 200, "catLaying")
        .play("catLaying");

      const { Body, Bodies } = Phaser.Physics.Matter.Matter;
      const playerCollider = Bodies.circle(cat1.x, cat1.y, 25, {
        isSensor: false,
        label: "catCollider",
      });
      const playerSensor = Bodies.circle(cat1.x, cat1.y, 35, {
        isSensor: true,
        label: "catSensor",
      });

      const compoundBody = Body.create({
        parts: [playerCollider, playerSensor],
        frictionAir: 0.35,
      });

      cat1.setExistingBody(compoundBody);
    });

    this.player = new Player(this, 400, 300, "leeIdle");
  }
}

export default GameScene;
