import * as Phaser from 'phaser';
import FallingFlower from '../classes/fallingFlower';
import MageAttack from '../classes/mageAttack';

/// THE PHASER ENGINE LIKE MANY ENGINE OUT THERE USE OBJECT ORIENTED PROGRAMMING FOR IT STRUCTURE

// The very first scene of the game
export default class PlatForm extends Phaser.Scene {
  // Game object that we want in the game
  private megaman1: any;
  private backGround: any;
  private hero: any;
  protected fallPetal: any;
  protected projectiles: any;
  private powerCan: any;
  private player: any;
  private keyboardKey: any;
  // you super to inherited all attribute and method of phaser scene (the parent class)
  constructor() {
    super('platform');
  }

  // THIS Method use to load ALL asset into the scene
  preload() {
    // this.load.atlas(
    //   'megamanRun',
    //   'assets/sprite-sheet/megamanRun.png',
    //   'assets/sprite-sheet/megamanRun.json'
    // );
    //=================================================================================================

    this.load.atlas(
      'megamanRun',
      'assets/sprite-sheet/megamanRun.png',
      'assets/sprite-sheet/megamanRun.json'
    );
    //=================================================================================================

    this.load.atlas(
      'heroWalk',
      'assets/sprite-sheet/heroWalk.png',
      'assets/sprite-sheet/heroWalk.json'
    );
    this.load.image('background', 'assets/menuBG.jpg');
    //=================================================================================================
    this.load.image('sakuraFlower', 'assets/effect/sakuraArt.png');
    //=================================================================================================
    this.load.atlas(
      'player',
      'assets/sprite-sheet/blueMage.png',
      'assets/sprite-sheet/blueMage.json'
    );
    this.load.image('background', 'assets/menuBG.jpg');
    //=================================================================================================
    this.load.atlas(
      'powerCan',
      'assets/sprite-sheet/powerUp.png',
      'assets/sprite-sheet/powerUp.json'
    );
    //=================================================================================================
    this.load.atlas(
      'sakura',
      'assets/sprite-sheet/flowerPetal.png',
      'assets/sprite-sheet/flowerPetal.json'
    );
    //=================================================================================================
    this.load.atlas(
      'fireBall',
      'assets/sprite-sheet/mageFireBall.png',
      'assets/sprite-sheet/mageFireBall.json'
    );
    //=================================================================================================
    this.load.image('mountainBg', 'assets/tileSprite/parallax-mountain-bg.png');
  }

  // THIS method use to add ALL GAME OBJECT THAT WILL BE DISPLAY ONCE THE SCENE IS CREATED
  create() {
    //REMEMBER: Add image order does matter because the engine will stacking image on to each other
    //that mean  the first image will be back ground or low priority image that doesn`t want to be render all the time
    //and the last image should be the character or thing that need to render on top of other game object
    this.backGround = this.add
      .tileSprite(0, 0, 1920, 1080, 'mountainBg')
      .setOrigin(0);

    //=================================================================================================
    // also we have to create the animation for the sprite sheet
    this.anims.create({
      key: 'running',
      frames: this.anims.generateFrameNames('megamanRun', {
        start: 0,
        end: 9,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png',
      }),
      frameRate: 9,
      repeat: -1,
    });

    this.megaman1 = this.add.sprite(400, 300, 'megamanRun');
    this.megaman1.play('running');
    //=================================================================================================

    //HERO NPC Object
    this.anims.create({
      key: 'walking',
      frames: this.anims.generateFrameNames('heroWalk', {
        start: 78,
        end: 80,
        zeroPad: 3,
        prefix: 'tile',
        suffix: '.png',
      }),
      frameRate: 14,
      repeat: -1,
    });

    this.hero = this.add.sprite(400, 300, 'heroWalk');

    this.hero.play('walking');
    //=================================================================================================
    //THE PowerUp Energy Can
    // add physics group
    this.powerCan = this.physics.add.group();
    // Create Animation for powerUp Can
    this.anims.create({
      key: 'powerDisco',
      frames: this.anims.generateFrameNames('powerCan', {
        start: 1,
        end: 3,
        zeroPad: 2,
        prefix: 'can-',
        suffix: '.png',
      }),
      frameRate: 3,
      repeat: -1,
    });
    // use the loop to assign object to the physics group
    for (let index = 0; index < 5; index++) {
      const element = this.physics.add.sprite(16, 0, 'powerCan');
      this.powerCan.add(element);
      element.play('powerDisco');
      element.setRandomPosition(0, 6);
      element.setScale(1);
      element.setVelocity(200, 200);
      element.setCollideWorldBounds(true);
      element.setBounce(1);
    }
    //=================================================================================================
    //Create Player Object
    this.player = this.physics.add.sprite(600, 700, 'player');
    this.player.setScale(4);
    this.anims.create({
      key: 'playerStand',
      frames: this.anims.generateFrameNames('player', {
        start: 0,
        end: 10,
        zeroPad: 0,
        prefix: 'mage_guardian-blue-',
        suffix: '.png',
      }),
      frameRate: 14,
      repeat: -1,
    });
    this.player.play('playerStand');
    this.player.setCollideWorldBounds(true);
    //===================================================================================================
    //Register key listener for cursorKey
    this.keyboardKey = this.input.keyboard.createCursorKeys();
    //===================================================================================================
    this.anims.create({
      key: 'fallingFlower',
      frames: this.anims.generateFrameNames('sakura', {
        start: 0,
        end: 2,
        zeroPad: 1,
        prefix: 'flower-',
        suffix: '.png',
      }),
      frameRate: 14,
      repeat: -1,
    });
    //===================================================================================================
    //Prepare sakura gameObject
    //Group is the array of the engine. A Group is a way for you to create, manipulate, or recycle similar Game Objects.
    this.fallPetal = this.add.group();
    for (let index = 0; index < 6; index++) {
      new FallingFlower(this);
    }
    //===================================================================================================
    this.projectiles = this.add.group();
    // The projectile that the player will shoot out animation
    this.anims.create({
      key: 'fireBallFly',
      frames: this.anims.generateFrameNames('fireBall', {
        start: 1,
        end: 60,
        zeroPad: 0,
        prefix: '',
        suffix: '.png',
      }),
      frameRate: 60,
      repeat: -1,
    });
  }

  //=================================================================================================
  // Function to make the game object move And re position when out of bound
  moveMegaMan(gameObject: any, speed: number): void {
    // random speed of the object
    gameObject.x += speed;
    // check if object is out of bound
    if (gameObject.x >= window.innerWidth) {
      // re position the object
      gameObject.x = 0;
      gameObject.y = Phaser.Math.Between(1, window.innerHeight);
    }
  }

  // function to move player base on key
  movePlayer(): integer {
    if (this.keyboardKey.left.isDown) {
      this.player.setVelocityX(-500);
      return 1;
    }
    if (this.keyboardKey.right.isDown) {
      this.player.setVelocityX(500);
      return 1;
    }
    if (this.keyboardKey.up.isDown) {
      this.player.setVelocityY(-500);
      return 1;
    }
    if (this.keyboardKey.down.isDown) {
      this.player.setVelocityY(500);
      return 1;
    }
    this.player.setVelocity(0);
  }

  //shoot function
  shoot(): void {
    if (Phaser.Input.Keyboard.JustDown(this.keyboardKey.space)) {
      console.log('shoot');
      const ball = new MageAttack(this);
      this.projectiles.add(ball);
    }
  }

  update() {
    // this.moveMegaMan(this.megaman1, 20);
    this.moveMegaMan(this.hero, 3);
    this.moveMegaMan(this.megaman1, 9);
    this.movePlayer();
    this.shoot();
    // Because scene just call one update function per frame so we have to invoke the update of child object from here
    for (let index = 0; index < this.fallPetal.getChildren().length; index++) {
      const element = this.fallPetal.getChildren()[index];
      element.update();
    }
    for (
      let index = 0;
      index < this.projectiles.getChildren().length;
      index++
    ) {
      const element = this.projectiles.getChildren()[index];
      element.update();
    }

    //we will have background auto scroll
    this.backGround.tilePositionX += 0.5;
  }
}
