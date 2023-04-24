import * as Phaser from 'phaser';
import PlatForm from './scenes/platformScene';

/// THE PHASER ENGINE LIKE MANY ENGINE OUT THERE USE OBJECT ORIENTED PROGRAMMING FOR IT STRUCTURE

// The very first scene of the game
export default class GameGate extends Phaser.Scene {
  // you super to inherited all attribute and method of phaser scene (the parent class)
  constructor() {
    super('menu');
  }

  // THIS Method use to load ALL asset into the scene
  preload() {
    // this.load.image('logo', 'assets/phaser3-logo.png');
    // this.load.image('libs', 'assets/libs.png');
    // this.load.glsl('bundle', 'assets/plasma-bundle.glsl.js');
    // this.load.glsl('stars', 'assets/starfields.glsl.js');

    this.load.image('megaman', 'assets/Mega-Man-Sprite.png');
  }

  // THIS method use to add ALL GAME OBJECT THAT WILL BE DISPLAY ONCE THE SCENE IS CREATED
  create() {
    //REMEMBER: Add image order does matter because the engine will stacking image on to each other
    //that mean  the first image will be back ground or low priority image that doesn`t want to be render all the time
    //and the last image should be the character or thing that need to render on top of other game object

    this.scene.start('platform');
  }

  l;
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
  scene: [GameGate, PlatForm],
};

// this line is just to load the phaser game controller
const game = new Phaser.Game(config);
