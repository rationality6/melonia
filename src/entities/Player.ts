class Player extends Phaser.Physics.Arcade.Sprite {
  playerSpeed: number = 4;
  firstClickTime: number = 0;

  constructor(scene, x, y, key) {
    super(scene, x, y, key);

    scene.add.existing(this);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    // this.scene.inputKeys = this.scene.input.keyboard.addKeys({
    //   up: Phaser.Input.Keyboard.KeyCodes.W,
    //   down: Phaser.Input.Keyboard.KeyCodes.S,
    //   left: Phaser.Input.Keyboard.KeyCodes.A,
    //   right: Phaser.Input.Keyboard.KeyCodes.D,
    // });

    // const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    // const playerCollider = Bodies.circle(this.x, this.y, 12, {
    //   isSensor: false,
    //   label: "playerCollider",
    // });
    // const playerSensor = Bodies.circle(this.x, this.y, 24, {
    //   isSensor: true,
    //   label: "playerSensor",
    // });

    // const compoundBody = Body.create({
    //   parts: [playerCollider, playerSensor],
    //   frictionAir: 0.35,
    // });

    // this.setExistingBody(compoundBody);

    this.setScale(0.1);
    this.setDepth(1);
    // this.setFixedRotation();
    
    // this.setIgnoreGravity(true);

    this.setInputs();
  }

  get velocity() {
    return this.body.velocity;
  }

  update() {
    // let playerVelocity = new Phaser.Math.Vector2();

    // if (this.scene.inputKeys.left.isDown) {
    //   playerVelocity.x = -1;
    //   this.setFlipX(false);
    // } else if (this.scene.inputKeys.right.isDown) {
    //   playerVelocity.x = 1;
    //   this.setFlipX(true);
    // }

    // if (this.scene.inputKeys.up.isDown) {
    //   playerVelocity.y = -1;
    // } else if (this.scene.inputKeys.down.isDown) {
    //   playerVelocity.y = 1;
    // }

    // playerVelocity.normalize();
    // playerVelocity.scale(this.playerSpeed);
    // this.setVelocity(playerVelocity.x, playerVelocity.y);

    // if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
    //   this.anims.play("leeMoving", true);
    // } else {
    //   this.anims.play("leeMoving", true);
    // }
  }

  setInputs() {
    this.setMoveInputs();
    this.setdoubleClickInputs();
  }

  setMoveInputs() {
    this.scene.input.on("pointermove", (pointer) => {
      this.x = pointer.worldX;
    });
  }

  getTime() {
    let d = new Date();
    return d.getTime();
  }

  setdoubleClickInputs() {
    this.scene.input.on("pointerdown", (pointer) => {
      this.scene.spawnCat(pointer.worldX);

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
