class Player extends Phaser.Physics.Arcade.Sprite {
  playerSpeed: number = 4;
  firstClickTime: number = 0;

  middleOfDrop: boolean = false;

  dropDelayLength = 600;

  superMoveCount: number = 0;
  superMove: boolean = false;

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
      if (this.firstClickTime == 0) {
        this.firstClickTime = this.getTime();
        return;
      }

      if (this.middleOfDrop) {
        return;
      }

      let elapsed = this.getTime() - this.firstClickTime;

      if (elapsed < 400) {
        this.scene.playerSlimes.spawnSlime(this.x);
        this.scene.playerSlimes.updateNextSlimeDisplay();

        this.middleOfDrop = true;

        setTimeout(() => {
          this.middleOfDrop = false;
        }, this.dropDelayLength);
      } else {
        this.firstClickTime = this.getTime();
        return;
      }
      this.firstClickTime = 0;
    });
  }

  playRandomVoice() {
    const voiceArray = ["toFather", "yell", "savePeace", "blasphemy"];

    const randomX = Phaser.Math.Between(1, voiceArray.length);

    this.scene.sound.play(voiceArray[randomX - 1]);
  }
}

export default Player;
