import React from "react";
import Phaser from "phaser";

import GameScene from './scenes';

export default class App extends React.Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      parent: "phaser",
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      width: 800,
      height: 600,
      scene: [GameScene],
    };

    new Phaser.Game(config);
  }

  render() {
    return (
      <div className="phaserContainer" id="phaser">
      </div>
    );
  }
}
