class PhaserSceneTool extends Phaser.Scene {
  get gameHeight() {
    return this.game.config.height as number;
  }

  get gameWidth() {
    return this.game.config.width as number;
  }

  constructor(key: string) {
    super(key);
  }

  get isLocal() {
    return location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
      ? true
      : false;
  }

  setDelay(time: number) {
    return new Promise<void>((resolve) =>
      setTimeout(() => {
        resolve();
      }, time)
    );
  }

  getTimestamp() {
    let newdate = new Date();
    return newdate.getTime();
  };

  cloneSprite(sprite) {
    // 원본의 텍스처 키, 위치, 크기, 알파값 등을 복사하여 새 스프라이트 생성
    const clone = this.add.sprite(sprite.x, sprite.y, sprite.texture.key, sprite.frame.name);

    clone.setScale(sprite.scaleX, sprite.scaleY);
    clone.setRotation(sprite.rotation);
    clone.setAlpha(sprite.alpha);
    clone.setTint(sprite.tintTopLeft); // 틴트 색상 복사

    // 필요에 따라 인터랙티브 속성도 복사
    clone.setInteractive();

    return clone;
  }
}

export default PhaserSceneTool;
