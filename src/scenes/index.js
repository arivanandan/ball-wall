import Phaser from "phaser";
import React from 'react';

import flamingBall from '../assets/flaming-ball.png';
import blueBrickWall from '../assets/blue-brick-wall.jpeg';
import brownBrick from '../assets/brown-brick.png';

const ballMaxScale = 0.105;
const ballMinScale = 0.95;

const velocityMultiplier = 300;

export default class GameScene extends Phaser.Scene {
  preload() {
    this.load.image("ball", flamingBall);
    this.load.image("blueBrickWall", blueBrickWall);
    this.load.image("brownBrick", brownBrick);
  }

  create() {
    const backgroundWall = this.add.image(400, 300, "blueBrickWall");
    backgroundWall.setScale(4, 3);
    backgroundWall.tint = 0x000090;

    const wall = this.physics.add.staticGroup();
    const xBlocks = 7;
    const yBlocks = 5;
    for (let i = 0; i <= xBlocks; i++)
      for (let j = 0; j <= yBlocks; j++) {
        if (!(i === 0 || j=== 0 || i === xBlocks || j === yBlocks)) continue;
        wall.create(100 * i, 100 * j, 'brownBrick').setOrigin(0, 0).setScale(0.2, 0.2).refreshBody();
      }

    this.ball = this.physics.add.image(400, 300, 'ball');
    this.ball.setScale(0.1, 0.1);
    this.ball.setBounce(0.2);
    this.ball.setCollideWorldBounds(true);
    this.stationaryTween = this.tweens.add({
      targets: this.ball,
      scale: { value: ballMaxScale, duration: 500, yoyo: true, ease: 'Quad.easeInOut' },
      repeat: -1,
    });

    this.physics.add.collider(this.ball, wall);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.tweens.add({
        targets: this.ball,
        angle: { value: -360, duration: 500, ease: 'Linear' },
        scale: { value: ballMaxScale, duration: 500, ease: 'Quad.easeInOut' },
        duration: 500,
      });
      this.ball.setVelocityX(-velocityMultiplier);
    } else if (this.cursors.right.isDown) {
      this.tweens.add({
        targets: this.ball,
        angle: { value: 360, duration: 500, ease: 'Linear' },
        scale: { value: ballMaxScale, duration: 500, ease: 'Quad.easeInOut' },
        duration: 500,
      });
      this.ball.setVelocityX(velocityMultiplier);
    } else {
        this.ball.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.ball.body.touching.down)
        this.ball.setVelocityY(-velocityMultiplier);
  }
}
