import PhaserSceneTool from "./PhaserSceneTool";

import Player from "../entities/Player";
import initAnims from "./anims";

class GameScene extends PhaserSceneTool {
  player: Player;
  inputKeys: any;

  matterCollision: any;
  cats: Array = [];

  constructor() {
    super("GameScene");
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("IceTileset", "iceTiles", 32, 32, 0, 0);

    const layer1 = map.createLayer("fields", tileset, 0, 200);
    const layer2 = map.createLayer("trees", tileset, 0, 200);

    layer1.setCollisionByProperty({ collide: true });
    this.matter.world.convertTilemapLayer(layer1);

    initAnims(this.anims);

    this.matter.world.setBounds(0, 0, this.gameWidth, this.gameHeight);

    this.player = new Player(this, 350, 150, "leeIdle");
  }

  spawnCats() {
    [...Array(10).keys()].forEach((i) => {
      this.spawnCat(i);
    });
  }

  spawnCat(x) {
    let cat1 = this.matter.add.sprite(x, 200, "catLaying").play("catLaying");
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
    });

    cat1.setExistingBody(compoundBody);
    this.cats.push(cat1);

    this.matterCollision.addOnCollideStart({
      objectA: cat1,
      objectB: this.cats,
      callback: function (eventData) {
        const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
        console.log(gameObjectA);
        console.log(bodyA);
        if (gameObjectA.scale === gameObjectB.scale) {

          let cat1 = this.matter.add
            .sprite(gameObjectA.x, gameObjectA.y, "catLaying")
            .play("catLaying");
          cat1.setScale(gameObjectA.scale + 0.5);
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
          });

          cat1.setExistingBody(compoundBody);
          this.cats.push(cat1);


          this.matterCollision.addOnCollideStart({
            objectA: cat1,
            objectB: this.cats,
            callback: function (eventData) {
              const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
              console.log(gameObjectA);
              console.log(bodyA);
              if (gameObjectA.scale === gameObjectB.scale) {
      
                let cat1 = this.matter.add
                  .sprite(gameObjectA.x, gameObjectA.y, "catLaying")
                  .play("catLaying");
                cat1.setScale(gameObjectA.scale + 0.5);
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
                });
      
                cat1.setExistingBody(compoundBody);
                this.cats.push(cat1);
      
      
                this.removeObjectFromCatGroupArray(gameObjectA);
                this.removeObjectFromCatGroupArray(gameObjectB);
      
              }
            },
            context: this,
          });


          this.removeObjectFromCatGroupArray(gameObjectA);
          this.removeObjectFromCatGroupArray(gameObjectB);

        }
      },
      context: this,
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
