import Slime from "./Slime";

class Slimes {
  nextSlimeColor: string;
  nextSlimeDisplayed: Phaser.GameObjects.Sprite;

  slimes: any = [];
  scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    this.nextSlimeColor = Slime.randomSlimeColor;

    this.nextSlimeDisplayed = this.scene.add
      .sprite(50, 100, this.nextSlimeColor)
      .play(`slime${this.nextSlimeColor}Idle`)
      .setScale(2);
  }

  updateSlimeDisplay(nextSlimeColor: string) {
    this.nextSlimeDisplayed.destroy();
    this.nextSlimeDisplayed = this.scene.add
      .sprite(50, 100, nextSlimeColor)
      .play(`slime${nextSlimeColor}Idle`)
      .setScale(2);
  }

  spawnSlime(x) {
    let slime = new Slime(this.scene, x, 100, `slime${this.nextSlimeColor}`);
    this.nextSlimeColor = Slime.randomSlimeColor;

    this.slimes.push(slime);

    this.setSlimesCollides(slime, 2);
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
        if (
          gameObjectA.scale === gameObjectB.scale &&
          gameObjectA.name === gameObjectB.name
        ) {
          this.scene.sound.play("metgedSound");

          if (gameObjectA.scale < 4) {
            let biggerSlime = new Slime(
              this.scene,
              gameObjectA.x,
              gameObjectA.y,
              gameObjectA.name,
              5
            );
            biggerSlime.setScale(gameObjectA.scale + 1);
            this.slimes.push(biggerSlime);
            this.setSlimesCollides(biggerSlime, count - 1);
          } else {
            this.scene.player.randomVoice();

            this.spawnObsticleSlime(gameObjectA.name);
          }

          this.removeObjectFromCatGroupArray(gameObjectA);
          this.removeObjectFromCatGroupArray(gameObjectB);
        }
      },
      context: this,
    });
  }

  spawnObsticleSlime(slimeName) {
    this.scene.player.middleOfDrop = true;
    this.scene.catmull.emitting = true;

    const randomX = Phaser.Math.Between(600, 900);
    const randomY = Phaser.Math.Between(10, 20);
    new Slime(this.scene, randomX, 80 + randomY, slimeName).obsticleSlime();
    const randomX2 = Phaser.Math.Between(600, 900);
    const randomY2 = Phaser.Math.Between(10, 20);
    new Slime(this.scene, randomX2, 80 + randomY2, slimeName).obsticleSlime();
    const randomX3 = Phaser.Math.Between(600, 900);
    const randomY3 = Phaser.Math.Between(10, 20);
    new Slime(this.scene, randomX3, 80 + randomY3, slimeName).obsticleSlime();
    const randomX4 = Phaser.Math.Between(600, 900);
    const randomY4 = Phaser.Math.Between(10, 20);
    new Slime(this.scene, randomX4, 80 + randomY4, slimeName).obsticleSlime();

    setTimeout(() => {
      this.scene.player.middleOfDrop = false;
      this.scene.catmull.emitting = false;
    }, 300);
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
