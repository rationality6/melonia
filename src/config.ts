import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

const SHARED_CONFIG = {
  arcadeDebug: true,
  matterDebug: true,
};

export default {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  parent: "game",
  backgroundColor: "transparent",
  scale: {
    width: 512,
    height: 662,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "matter",
    arcade: {
      debug: SHARED_CONFIG.arcadeDebug,
    },
    matter: {
      debug: SHARED_CONFIG.matterDebug,
      gravity: { y: 0.5 },
    },
  },
  plugins: {
    scene: [
      {
        plugin: PhaserMatterCollisionPlugin,
        key: "matterCollision",
        mapping: "matterCollision",
      },
    ],
  },
};
