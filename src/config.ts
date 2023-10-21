import Phaser from "phaser";

const SHARED_CONFIG = {
  debug: true,
};

export default {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  parent: "game",
  backgroundColor: "transparent",
  scale: {
    width: 512,
    height: 512,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "matter",
    matter: {
      debug: SHARED_CONFIG.debug,
      gravity: { y: 0 },
    },
  },
};
