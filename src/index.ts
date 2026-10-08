import Phaser from 'phaser';
import config from './config';

import PreloadLogo from './scenes/PreloadLogo';
import Preload from './scenes/Preload';
import GameScene from './scenes/GameScene';
import CharacterSelectScene from './scenes/CharacterSelectScene';

new Phaser.Game(
  Object.assign(config, {
    scene: [
      PreloadLogo,
      Preload,
      new GameScene(config),
      CharacterSelectScene,
    ]
  })
);
