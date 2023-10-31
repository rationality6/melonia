import PhaserSceneTool from "./PhaserSceneTool";

class Preload extends PhaserSceneTool {
  constructor() {
    super("PreloadScene");
  }

  preload() {
    this.loadLoadingScreen();
    this.preloadCharacters();
    this.preloadSlimes();
    this.preloadUi();
    this.preloadSounds();
  }

  preloadCharacters() {
    this.load.image("aris", "assets/characters/aris.png");
    this.load.image("momoi", "assets/characters/momoi.png");
  }

  preloadSlimes() {
    this.load.spritesheet("slimeGreen", "assets/slimes/slime_green_final.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    this.load.spritesheet("slimeRed", "assets/slimes/slime_red_final.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    this.load.spritesheet("slimeBlue", "assets/slimes/slime_blue_final.png", {
      frameWidth: 50,
      frameHeight: 50,
    });

    this.load.spritesheet(
      "slimeYellow",
      "assets/slimes/slime_yellow_final.png",
      {
        frameWidth: 50,
        frameHeight: 50,
      }
    );
  }

  preloadUi() {
    this.load.spritesheet("fullscreen", "assets/ui/fullscreen.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.image("backgroundMountain", "assets/ui/full-background.png");

    this.load.image("lineYellow", "assets/ui/line_yellow.png");
    this.load.image("lineGreen", "assets/ui/line_green.png");

    this.load.image("emptyJar", "assets/ui/empty_jar.png");

    this.load.spritesheet("doubleTouch", "assets/ui/double_touch.png", {
      frameWidth: 150,
      frameHeight: 190,
    });

    this.load.image("backButton", "assets/ui/back_button.png");

    // particles
    this.load.image("red", "assets/particles/red.png");
    this.load.image("green", "assets/particles/green.png");
    this.load.image("blue", "assets/particles/blue.png");
  }

  preloadSounds() {
    // system
    this.load.audio("metgedSound", "assets/sounds/merged_sound.mp3");

    // system voice
    this.load.audio("ready", "assets/sounds/ready_voice.mp3");

    // voice
    this.load.audio("toFather", "assets/sounds/to_father.mp3");
    this.load.audio("super", "assets/sounds/super.mp3");
    this.load.audio("tooMany", "assets/sounds/too_many.mp3");
    this.load.audio("afterbunnerOn", "assets/sounds/afterbunner_on.mp3");
    this.load.audio("tooMany", "assets/sounds/too_many.mp3");
    this.load.audio("yell", "assets/sounds/ruru_voice_yell.mp3");
    this.load.audio("blasphemy", "assets/sounds/blasphemy.mp3");
    this.load.audio("savePeace", "assets/sounds/save_peace_voice_korea.mp3");

    // bgm
    this.load.audio("happySong", "assets/sounds/happy_theme.mp3");
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

  async create() {
    const logoExposeSetting: Number = this.isLocal ? 300 : 2000;

    this.cameras.main.fadeIn(1000, 255, 255, 255);

    const logo = this.add
      .image(this.gameWidth / 2, this.gameHeight / 2, "kbb")
      .setScale(0.3);
    await this.setDelay(logoExposeSetting);
    this.cameras.main.fadeOut(logoExposeSetting, 255, 255, 255);
    await this.setDelay(logoExposeSetting);
    logo.destroy();
    this.cameras.main.fadeIn(logoExposeSetting, 255, 255, 255);
    const logo2 = this.add.image(
      this.gameWidth / 2,
      this.gameHeight / 2,
      "interpretLogoWithCat"
    );
    await this.setDelay(logoExposeSetting);
    this.cameras.main.fadeOut(logoExposeSetting, 255, 255, 255);
    await this.setDelay(logoExposeSetting);
    this.scene.start("GameScene");
  }
}

export default Preload;
