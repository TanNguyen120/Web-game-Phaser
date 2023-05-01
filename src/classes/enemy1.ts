import * as Phaser from 'phaser';
import Bomb from './bomb';

//define a class that is a child of phaser gameobject class
class Enemy1 extends Phaser.GameObjects.Sprite {
  private lastAttacked: integer;
  //Constructor use to do the new object statement and create an interface of a class
  // This Constructor took the scene object because the parent class need it
  constructor(scene) {
    //super keyword use to call the parrent constructor
    //the super long second argument is for indicate the x y value to be random on top of the screen
    //the last argument is magically reference to the sprite with the same name in the parent scene
    super(scene, 0, Math.floor(Math.random() * 240), 'enemy1');
    scene.add.existing(this);

    //and again the animation can be play here too
    //add physics to this object
    scene.physics.world.enableBody(this);
    this.setScale(2);
    this.body.velocity.x = Math.random() * (300 - 100) + 100;
    this.play('enemy1Idle');
    scene.enemy.add(this);
    this.lastAttacked = 0;
  }

  update(scene): void {
    if (this.x >= window.innerWidth - 120) {
      this.destroy();
    }
    this.lastAttacked += 1;
    if (this.lastAttacked >= 100) {
      const bomb = new Bomb(scene, this.x, this.y);
      this.lastAttacked = 0;
    }
  }
}

export default Enemy1;
