class Slime extends Phaser.Physics.Matter.Sprite {
  static slimeColors = ["Red", "Green", "Yellow", "Blue"];
  name: string;

  constructor(scene, x, y, key, size = 0) {
    super(scene.matter.world, x, y, key);

    this.setScale(3);
    this.name = key
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    const playerCollider = Bodies.circle(this.x, this.y, 35 + size, {
      isSensor: false,
      label: "slimeCollider",
      friction: 10,
    });
    const playerSensor = Bodies.circle(this.x, this.y, 40 + size, {
      isSensor: true,
      label: "slimeSensor",
    });

    const compoundBody = Body.create({
      parts: [playerCollider, playerSensor],
    });

    this.setExistingBody(compoundBody);

    scene.add.existing(this);

    this.setDepth(1);
    // this.setTint(0xff0000)
    this.play(`${key}Idle`, true);
    this.setCollisionGroup(1)
  }

  static get randomSlimeColor() {
    return this.slimeColors[
      Math.floor(Math.random() * this.slimeColors.length)
    ];
  }

  obsticleSlime() {
    this.setTint(0xff0000);
  }
  
}

export default Slime;
