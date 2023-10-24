class Slime extends Phaser.Physics.Matter.Sprite {
  slimeColors = ["red", "green", "yellow", "blue"];

  slimes: Array = [];
  matterOfCollision: any;

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

  spawn() {
    this.slimes.push(cat1);

    // this.matterCollision.addOnCollideStart({
    //   objectA: cat1,
    //   objectB: this.slimes,
    //   callback: function (eventData) {
    //     const { bodyA, bodyB, gameObjectA, gameObjectB, pair } = eventData;
    //     console.log(gameObjectA);
    //     console.log(bodyA);

    // if (gameObjectA.scale === gameObjectB.scale) {
    //   let cat1 = this.matter.add
    //     .sprite(gameObjectA.x, gameObjectA.y, "catLaying")
    //     .play("catLaying");
    //   cat1.setScale(gameObjectA.scale + 1);
    //   const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    //   const playerCollider = Bodies.circle(cat1.x, cat1.y, 35, {
    //     isSensor: false,
    //     label: "catCollider",
    //   });
    //   const playerSensor = Bodies.circle(cat1.x, cat1.y, 45, {
    //     isSensor: true,
    //     label: "catSensor",
    //   });

    //   const compoundBody = Body.create({
    //     parts: [playerCollider, playerSensor],
    //   });

    //   cat1.setExistingBody(compoundBody);
    //   this.slimes.push(cat1);

    //   this.matterCollision.addOnCollideStart({
    //     objectA: cat1,
    //     objectB: this.slimes,
    //     callback: function (eventData) {
    //       const { bodyA, bodyB, gameObjectA, gameObjectB, pair } =
    //         eventData;
    //       console.log(gameObjectA);
    //       console.log(bodyA);
    //       if (gameObjectA.scale === gameObjectB.scale) {
    //         let cat1 = this.matter.add
    //           .sprite(gameObjectA.x, gameObjectA.y, "catLaying")
    //           .play("catLaying");
    //         cat1.setScale(gameObjectA.scale + 1);
    //         const { Body, Bodies } = Phaser.Physics.Matter.Matter;
    //         const playerCollider = Bodies.circle(cat1.x, cat1.y, 45, {
    //           isSensor: false,
    //           label: "catCollider",
    //         });
    //         const playerSensor = Bodies.circle(cat1.x, cat1.y, 55, {
    //           isSensor: true,
    //           label: "catSensor",
    //         });

    //         const compoundBody = Body.create({
    //           parts: [playerCollider, playerSensor],
    //         });

    //         cat1.setExistingBody(compoundBody);
    //         this.slimes.push(cat1);

    //         this.sound.play("metgedSound");
    //         this.removeObjectFromCatGroupArray(gameObjectA);
    //         this.removeObjectFromCatGroupArray(gameObjectB);
    //       }
    //     },
    //     context: this,
    //   });

    //   this.sound.play("metgedSound");
    //   this.removeObjectFromCatGroupArray(gameObjectA);
    //   this.removeObjectFromCatGroupArray(gameObjectB);
    // }
    // },
    // context: this,
    // });
  }

  update() {
    this.play("slimeGreenIdle", true);
  }
}

export default Slime;
