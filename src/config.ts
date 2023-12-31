import Phaser from "phaser";
import PhaserMatterCollisionPlugin from "phaser-matter-collision-plugin";

const SHARED_CONFIG = {
  arcadeDebug: false,
  matterDebug: false,
};

export default {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  parent: "game",
  backgroundColor: "transparent",
  scale: {
    width: 1024,
    height: 768,
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
      gravity: { y: 0.6 },
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
