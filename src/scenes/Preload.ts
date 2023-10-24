import PhaserSceneTool from "./PhaserSceneTool";

class Preload extends PhaserSceneTool {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.loadLoadingScreen();

    this.load.spritesheet("catLaying", "assets/cat_laying.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("leeMoving", "assets/lee_move.png", {
      frameWidth: 320,
      frameHeight: 320,
    });

    this.load.spritesheet("slimeGreen", "assets/slime_green.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    this.load.image("aris", "assets/aris.png");

    this.load.image("emptyJar", "assets/empty_jar.png");

    this.load.image("leeIdle", "assets/lee_idle.png");

    this.load.tilemapTiledJSON("map", "assets/maps/icemap.json");
    this.load.image("iceTiles", "assets/maps/ice_tileset.png");

    // this.loadingImagesMockup();

    this.load.audio("metgedSound", "assets/sounds/merged_sound.mp3");
  }

  loadingImagesMockup() {
    [...Array(100).keys()].forEach((i) => {
      this.load.image(`catWalking${i}`, "assets/cat_walking.png");
    });
  }

  loadLoadingScreen() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    // progressBox.fillRect(240, 270, 320, 50);

    let width = this.cameras.main.width;
    let height = this.cameras.main.height;

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: "Loading...",
      style: {
        font: "20px monospace",
        fill: "#ffffff",
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: "0%",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    percentText.setOrigin(0.5, 0.5);

    let assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: "",
      style: {
        font: "18px monospace",
        fill: "#ffffff",
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on("progress", (value) => {
      percentText.setText(parseInt(value * 100) + "%");
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 0.8);
      progressBar.fillRect(this.gameWidth / 2 - 160, 280, 300 * value, 30);
    });

    this.load.on("fileprogress", (file) => {
      assetText.setText("Loading asset: " + file.key);
    });

    this.load.on("complete", () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });
  }

  create() {
    const logoExposeSetting: Number = this.isLocal ? 300 : 2000;

    this.cameras.main.fadeIn(1000, 255, 255, 255);

    const logo = this.add.image(
      this.gameWidth / 2,
      this.gameHeight / 2,
      "interpretLogoWithCat"
    );

    logo.setScale(0.5);

    setTimeout(() => {
      this.scene.start("GameScene");
    }, logoExposeSetting);
  }
}

export default Preload;
