class Slime extends Phaser.Physics.Matter.Sprite {
  slimeColors = ["red", "green", "yellow", "blue"];

  constructor(scene, x, y, key) {
    super(scene.matter.world, x, y, key);
    this.setScale(3);
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const playerCollider = Bodies.circle(this.x, this.y, 35, {
      isSensor: false,
      label: "playerCollider",
      friction: 120,
    });
    const playerSensor = Bodies.circle(this.x, this.y, 45, {
      isSensor: true,
      label: "playerSensor",
    });

    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
    });

    this.setExistingBody(compoundBody);

    scene.add.existing(this);

    this.setDepth(1);
    // this.setTint(0xff0000)
  }

  get randomSlimeColor() {
    return this.slimeColors[
      Math.floor(Math.random() * this.slimeColors.length)
    ];
  }

  update() {
    this.play("slimeGreenIdle", true);
  }
}

export default Slime;
