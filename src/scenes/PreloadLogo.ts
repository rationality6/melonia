import PhaserSceneTool from "./PhaserSceneTool";

class PreloadLogo extends PhaserSceneTool {
  constructor() {
    super("PreloadLogoScene");
  }

  preload() {
    this.load.image(
      "interpretLogoWithCat",
      "assets/logo/interpret_logo_with_cat.png"
    );

    this.load.image("kbb", "assets/logo/kbb.jpg");

    this.load.spritesheet("catLaying", "assets/logo/cat_laying.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
  }
  create() {
    this.scene.start("PreloadScene");
  }
}

export default PreloadLogo;
