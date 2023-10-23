class CatBubble extends Phaser.Physics.Matter.Sprite {
  playerSpeed: number = 4;
  firstClickTime: number = 0;

  constructor(scene, x, y, key) {
    super(scene.matter.world, x, y, key);

    // scene.add.existing(this);

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

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
  }

  update() {}
}

export default CatBubble;
