import * as Phaser from 'phaser';

//define a class that is a child of phaser gameobject class
class FallingFlower extends Phaser.GameObjects.Sprite {
  //Constructor use to do the new object statement and create an interface of a class
  // This Constructor took the scene object because the parent class need it
  constructor(scene) {
    //super keyword use to call the parrent constructor
    //the super long second argument is for indicate the x y value to be random on top of the screen
    //the last argument is magically reference to the sprite with the same name in the parent scene
    super(
      scene,
      Math.floor(Math.random() * window.innerWidth) + 1,
      0,
      'sakuraFlower'
    );
    scene.add.existing(this);
    //and again the animation can be play here too
    this.play('fallingFlower');
  }
}
