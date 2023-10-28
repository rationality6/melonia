import Slime from "./Slime";

class Slimes {
  nextSlimeColor: string;
  nextSlimeDisplayed: Phaser.GameObjects.Sprite;

  slimes: any = [];
  scene: Phaser.Scene;

  playerType;

  constructor(scene: Phaser.Scene, playerType = "player") {
    this.scene = scene;

    this.nextSlimeColor = Slime.randomSlimeColor;

    this.playerType = playerType;

    if (this.playerType === "player") {
      this.nextSlimeDisplayed = this.scene.add
        .sprite(50, 100, this.nextSlimeColor)
        .play(`slime${this.nextSlimeColor}Idle`)
        .setScale(2);
    } else {
      this.nextSlimeDisplayed = this.scene.add
        .sprite(970, 100, this.nextSlimeColor)
        .play(`slime${this.nextSlimeColor}Idle`)
        .setScale(2);
    }
  }

  updateNextSlimeDisplay() {
    if (this.playerType === "player") {
      this.nextSlimeDisplayed.destroy();
      this.nextSlimeDisplayed = this.scene.add
        .sprite(50, 100, this.nextSlimeColor)
        .play(`slime${this.nextSlimeColor}Idle`)
        .setScale(2);
    } else {
      this.nextSlimeDisplayed.destroy();
      this.nextSlimeDisplayed = this.scene.add
        .sprite(970, 100, this.nextSlimeColor)
        .play(`slime${this.nextSlimeColor}Idle`)
        .setScale(2);
    }
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

            this.spawnObsticleSlimes(gameObjectA.name);
          }

          this.removeObjectFromCatGroupArray(gameObjectA);
          this.removeObjectFromCatGroupArray(gameObjectB);
        }
      },
      context: this,
    });
  }

  spawnObsticleSlime(toPlayerType, slimeColor) {
    let randomX;
    if (toPlayerType === "player") {
      randomX = Phaser.Math.Between(600, 900);
    } else {
      randomX = Phaser.Math.Between(100, 400);
    }

    const randomY = Phaser.Math.Between(10, 20);
    new Slime(this.scene, randomX, 80 + randomY, slimeColor).obsticleSlime();
  }

  async spawnObsticleSlimes(slimeColor) {
    if (this.playerType === "player") {
      this.scene.player.middleOfDrop = true;
      this.scene.catmull.emitting = true;

      [...Array(5).keys()].forEach((i) => {
        this.spawnObsticleSlime("player", slimeColor);
      });

      await this.scene.setDelay(300);

      this.scene.player.middleOfDrop = false;
      this.scene.catmull.emitting = false;
    } else {
      // this.scene.player2.middleOfDrop = true;
      this.scene.catmullReverse.emitting = true;

      [...Array(7).keys()].forEach((i) => {
        this.spawnObsticleSlime("opponent", slimeColor);
      });

      await this.scene.setDelay(300);

      // this.scene.player2.middleOfDrop = false;
      this.scene.catmullReverse.emitting = false;
    }
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
