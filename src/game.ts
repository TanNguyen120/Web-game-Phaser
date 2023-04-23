import * as Phaser from 'phaser';

// The very first scene of the game
export default class GameGate extends Phaser.Scene {
  constructor() {
    super('menu');
  }

  preload() {
    this.load.image('logo', 'assets/phaser3-logo.png');
    this.load.image('libs', 'assets/libs.png');
    this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
    this.load.glsl('stars', 'assets/starfields.glsl.js');
  }

  create() {
    this.add
      .shader('RGB Shift Field', 0, 0, window.innerWidth, window.innerHeight)
      .setOrigin(0);

    this.add.shader('Plasma', 0, 412, 1800, 172).setOrigin(0);

    this.add.image(400, 300, 'libs');

    const logo = this.add.image(400, 70, 'logo');

    this.tweens.add({
      targets: logo,
      y: 350,
      duration: 1500,
      ease: 'Sine.inOut',
      yoyo: true,
      repeat: -1,
    });
  }
}

// config object of the game
const config = {
  type: Phaser.AUTO,
  backgroundColor: '#425555',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: window.innerWidth,
    height: window.innerHeight,
  },
  scene: GameGate,
};

// this line is just to load the phaser game controller
const game = new Phaser.Game(config);
