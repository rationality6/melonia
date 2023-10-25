import Slime from "./Slime";

class Slimes {
  slimes: any = [];
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  spawnSlime(x) {
    let slime = new Slime(this.scene, x, 100, "slime");
    this.slimes.push(slime);

    this.setSlimesCollides(slime, 3);
  }

  setSlimesCollides(slime, count) {
    if (count === 0) {
      return;
    }
    this.scene.matterCollision.addOnCollideStart({
      objectA: slime,
      objectB: this.slimes,
      callback: (eventData) => {
        const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;

        if (gameObjectA.scale === gameObjectB.scale) {
          this.scene.sound.play("metgedSound");

          if (gameObjectA.scale < 5) {
            let biggerSlime = new Slime(
              this.scene,
              gameObjectA.x,
              gameObjectA.y,
              "slime",
              5
            );
            biggerSlime.setScale(gameObjectA.scale + 1);
            this.slimes.push(biggerSlime);
            this.setSlimesCollides(biggerSlime, count - 1);
          } else {
            console.log("gone");
            new Slime(this.scene, gameObjectA.x, gameObjectA.y, "slime").obsticleSlime()
            new Slime(this.scene, 600, 100, "slime").obsticleSlime()
          }

          this.removeObjectFromCatGroupArray(gameObjectA);
          this.removeObjectFromCatGroupArray(gameObjectB);

        }
      },
      context: this,
    });
  }

  removeObjectFromCatGroupArray(targetObject) {
    let foundSlime = this.slimes.findIndex((slime) => {
      return slime.body.id == targetObject.body.id;
    });

    this.slimes.splice(foundSlime, 1);

    this.scene.matter.world.remove(targetObject);

    targetObject.destroy();
  }
}

export default Slimes;
