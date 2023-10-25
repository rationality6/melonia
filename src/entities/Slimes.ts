import Slime from "./Slime";

class Slimes {
  slimes: Array = [];
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  spawnSlime(x) {
    let slime = new Slime(this.scene, x, 100, "slime");
    this.slimes.push(slime);

    this.setSlimesCollides(slime);
  }

  setSlimesCollides(slime) {
    this.scene.matterCollision.addOnCollideStart({
      objectA: slime,
      objectB: this.slimes,
      callback: (eventData) => {
        const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;

        if (gameObjectA.scale === gameObjectB.scale) {
          let slime = new Slime(
            this.scene,
            gameObjectA.x,
            gameObjectA.y,
            "slime"
          );
          slime.setScale(gameObjectA.scale + 1);

          const { Body, Bodies } = Phaser.Physics.Matter.Matter;
          const playerCollider = Bodies.circle(slime.x, slime.y, 35, {
            isSensor: false,
            label: "slimeCollider",
          });
          const playerSensor = Bodies.circle(slime.x, slime.y, 45, {
            isSensor: true,
            label: "slimeSensor",
          });
          const compoundBody = Body.create({
            parts: [playerCollider, playerSensor],
          });
          slime.setExistingBody(compoundBody);

          this.slimes.push(slime);

          this.scene.sound.play("metgedSound");
          // this.removeObjectFromCatGroupArray(gameObjectA);
          // this.removeObjectFromCatGroupArray(gameObjectB);
        }

        //   this.matterCollision.addOnCollideStart({
        //     objectA: slime,
        //     objectB: this.scene.slimes,
        //     callback: function (eventData) {
        //       const { bodyA, bodyB, gameObjectA, gameObjectB, pair } =
        //         eventData;
        //       console.log(gameObjectA);
        //       console.log(bodyA);
        //       if (gameObjectA.scale === gameObjectB.scale) {
        //         let slime = this.matter.add
        //           .sprite(gameObjectA.x, gameObjectA.y, "catLaying")
        //           .play("catLaying");
        //         slime.setScale(gameObjectA.scale + 1);
        //         const { Body, Bodies } = Phaser.Physics.Matter.Matter;
        //         const playerCollider = Bodies.circle(slime.x, slime.y, 45, {
        //           isSensor: false,
        //           label: "catCollider",
        //         });
        //         const playerSensor = Bodies.circle(slime.x, slime.y, 55, {
        //           isSensor: true,
        //           label: "catSensor",
        //         });

        //         const compoundBody = Body.create({
        //           parts: [playerCollider, playerSensor],
        //         });

        //         slime.setExistingBody(compoundBody);
        //         this.scene.slimes.push(slime);

        //         this.sound.play("metgedSound");
        //         this.removeObjectFromCatGroupArray(gameObjectA);
        //         this.removeObjectFromCatGroupArray(gameObjectB);
        //       }
        //     },
        //     context: this,
        //   });

        //   this.sound.play("metgedSound");
        //   this.removeObjectFromCatGroupArray(gameObjectA);
        //   this.removeObjectFromCatGroupArray(gameObjectB);
        // }
      },
      context: this,
    });
  }

  removeObjectFromCatGroupArray(targetObject) {
    let foundSlime = this.slimes.findIndex(
      (slime) => slime.body.id == targetObject.body.id
    );
    this.slimes.splice(foundSlime, 1);

    this.scene.matter.world.remove(targetObject);

    targetObject.destroy();
  }

}

export default Slimes;
