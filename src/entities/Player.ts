class Player extends Phaser.Physics.Arcade.Sprite {
  playerSpeed: number = 4;
  firstClickTime: number = 0;

  middleOfDrop: boolean = false;

  dropDelayLength = 600;

  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    this.setScale(0.2);
    this.setDepth(1);

    this.setInputs();
  }

  setInputs() {
    this.setMoveInputs();
    this.setClickInputs();
  }

  setMoveInputs() {
    this.scene.input.on("pointermove", (pointer) => {
      if (pointer.worldX > 410 || pointer.worldX < 90) {
        return;
      }
      this.x = pointer.worldX;
    });
  }

  getTime() {
    let d = new Date();
    return d.getTime();
  }

  setClickInputs() {
    this.scene.input.on("pointerdown", (pointer) => {
      if (this.middleOfDrop) {
        return;
      }

      this.scene.slimes.spawnSlime(this.x);
      this.scene.slimes.updateSlimeDisplay(this.scene.slimes.nextSlimeColor);

      this.middleOfDrop = true;

      setTimeout(() => {
        this.middleOfDrop = false;
      }, this.dropDelayLength);

      if (this.firstClickTime == 0) {
        this.firstClickTime = this.getTime();
        return;
      }

      let elapsed = this.getTime() - this.firstClickTime;

      if (elapsed < 350) {
        console.log("double click");
      }
      this.firstClickTime = 0;
    });
  }

  randomVoice() {
    const randomX = Phaser.Math.Between(1, 2);
    if (randomX === 1) {
      this.scene.sound.play("toFather");
    } else {
      this.scene.sound.play("super");
    }
  }
}

export default Player;
