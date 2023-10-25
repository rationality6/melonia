import Slime from "./Slime"

class Player extends Phaser.Physics.Arcade.Sprite {
  playerSpeed: number = 4;
  firstClickTime: number = 0;

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
    this.setdoubleClickInputs();
  }

  setMoveInputs() {
    this.scene.input.on("pointermove", (pointer) => {
      if(pointer.worldX > 410 || pointer.worldX < 90){
        return  
      }
      this.x = pointer.worldX;
    });
  }

  getTime() {
    let d = new Date();
    return d.getTime();
  }

  setdoubleClickInputs() {
    this.scene.input.on("pointerdown", (pointer) => {

      this.scene.slimes.spawnSlime(pointer.x);

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
}

export default Player;
