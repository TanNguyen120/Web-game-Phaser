import * as Phaser from 'phaser';

//define a class that is a child of phaser gameobject class
class Enemy1 extends Phaser.GameObjects.Sprite {
  //Constructor use to do the new object statement and create an interface of a class
  // This Constructor took the scene object because the parent class need it
  constructor(scene) {
    //super keyword use to call the parrent constructor
    //the super long second argument is for indicate the x y value to be random on top of the screen
    //the last argument is magically reference to the sprite with the same name in the parent scene
    super(scene, 0, Math.floor(Math.random() * 500), 'enemy1');
    scene.add.existing(this);
    //and again the animation can be play here too
    //add physics to this object
    scene.physics.world.enableBody(this);
    this.setScale(2);
    this.body.velocity.x = Math.floor(Math.random() * 400) + 1;
    this.play('enemy1Idle');
    scene.enemy.add(this);
  }

  update(...args: any[]): void {
    if (this.y >= window.innerHeight - 120) {
      this.destroy();
    }
  }
}

export default Enemy1;
