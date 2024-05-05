// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,
    backgroundColor: '#008100',
    scene: [Global,Start,Level,CrabStart,Crab,End,Win]
}

const game = new Phaser.Game(config);