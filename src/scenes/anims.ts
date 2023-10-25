export default (anims) => {
  anims.create({
    key: "catLaying",
    frames: anims.generateFrameNumbers("catLaying", {
      start: 0,
      end: 3,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "slimeGreenIdle",
    frames: anims.generateFrameNumbers("slimeGreen", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "slimeRedIdle",
    frames: anims.generateFrameNumbers("slimeRed", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "slimeBlueIdle",
    frames: anims.generateFrameNumbers("slimeBlue", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });

  anims.create({
    key: "slimeYellowIdle",
    frames: anims.generateFrameNumbers("slimeYellow", {
      start: 0,
      end: 9,
    }),
    frameRate: 10,
    repeat: -1,
  });
};
