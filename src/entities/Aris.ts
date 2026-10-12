// import DashDusts from "../effects/DashDusts";

// import BustShot from "../effects/BustShot";

class Aris extends Phaser.Physics.Arcade.Sprite {
  private cursors: any;
  lastDirection: number = Phaser.Physics.Arcade.FACING_RIGHT;
  moveSpeed: number = 200;
  // dashdusts: any;
  // bustShot: any;
  middleOfAction: boolean = false;

  constructor(scene: any, x: number, y: number) {
    super(scene, x, y, "aris");

    this.scene.add.existing(this);
    // scene.physics.add.existing(this);

    this.setScale(0.4);
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    // this.dashdusts = new DashDusts(this.scene, this);

    this.scene.tweens.add({
      targets: this,
      y: this.y + 50,
      duration: 1300,
      ease: "Sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // this.bustShot = new BustShot(this.scene, this);
  }

}

export default Aris;
