import './style.css'

import Phaser, {Game} from 'phaser'

let frog;

let platforms; 
let grass; 
let spikes; 
let boxes; 
let trophy; 


let isRunning;
let cursors;

let bgImage;

let  jumpPlatform;
let starterPlatform;
let endPlatform;

let strawberry; 

let background1;

let score = 0;
let scoreText;
let newtext;

let camera; 

let trophyCollected = false;
let frogDead = false; 

let gameText;
let gameOverText;

let boxHit = false; 

let audio_gameover;
let audio_jumping;
let audio_trophySound; 

let winnerText;
let winnerGameText;

let jumpTimer = 0
let hasJumped = 0;


// function addPlatform(x,y, width) {
//   for (let i=0; i<width; i++){
//     platforms.create(x+(i*88), y, 'tile1', 0)
//     .setSize(0.5, 90)
//     .setScale(0.7)
//     // .setOffset(0.1, 0)
//   }
// }


function preload() {
  //LOADING FROG SPRITE AND ALL ITS POSITIONING
  this.load.spritesheet('idle', 'assets-2/Main Characters/Ninja Frog/Idle (32x32).png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('double-jump', 'assets-2/Main Characters/Ninja Frog/Double Jump (32x32).png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('fall', 'assets-2/Main Characters/Ninja Frog/Fall (32x32).png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('hit', 'assets-2/Main Characters/Ninja Frog/Hit (32x32).png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('jump', 'assets-2/Main Characters/Ninja Frog/Jump (32x32).png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('run', 'assets-2/Main Characters/Ninja Frog/Run (32x32).png', {frameWidth: 32, frameHeight: 32})
  this.load.spritesheet('wall-jump', 'assets-2/Main Characters/Ninja Frog/Wall Jump (32x32).png', {frameWidth: 32, frameHeight: 32})

  //LOADING BACKGROUND IMAGES 
  this.load.image('brown', 'assets-2/Background/Brown.png')

  this.load.image('tile1', 'assets-2/Terrain/tile1.png')
  this.load.image('tile2', 'assets-2/Terrain/tile2.png')
  this.load.image('starterPlatform', 'assets-2/Terrain/starterPlatform.png')

  this.load.spritesheet('strawberry', 'assets-2/Items/Fruits/Strawberry.png', {frameWidth:32, frameHeight:32})
  this.load.spritesheet('banana', 'assets-2/Items/Fruits/Bananas.png', {frameWidth:32, frameHeight:32})

  
  //LOADING TILES + TERRAIN 
  this.load.spritesheet('tile', 'assets-2/Terrain/Terrain (16x16).png', {frameWidth: 88, frameHeight: 58})

  //LOADING TILEMAP 
  

  this.load.image('sky', 'assets-2/Background/bluesky.png')
  this.load.image('spike', 'assets-2/Traps/Spikes/Idle.png')

  
  //LOADING TILESHEET VERSION 1
  // this.load.tilemapTiledJSON('map', 'newPlatformMap.json')
  // this.load.image('tileMapImage', 'assets-2/Terrain/Terrain (16x16).png')

  //LOADING TILESHEET VERSION 2
  // this.load.tilemapTiledJSON('map', 'mapVersion2.json')
  // this.load.image('tileMapImage', 'assets-2/Terrain/Terrain (16x16).png')

  //TILESHEET VERSION 3
  this.load.tilemapTiledJSON('map', 'mapVersion7.json')
  this.load.image('tileMapImage', 'assets-2/Terrain/Terrain (16x16).png')
  this.load.image('grass','assets-2/Background/Green.png' )
  this.load.image('spikes', 'assets-2/Traps/Spikes/Idle.png')
  this.load.image('boxes', 'assets-2/Terrain/Terrain (16x16).png')
  this.load.image('trophy', 'assets-2/Items/Checkpoints/End/End (Idle).png')
  this.load.image('hitBoxes', 'assets-2/orangeSquare2.png', {frameWidth: 32, frameHeight: 32})

  //AUDIO 
  this.load.audio('gameover', 'sounds/gameOver.ogg')
  this.load.audio('jumpingSound', 'sounds/mixkit-player-jumping-in-a-video-game-2043.ogg')
  this.load.audio('trophySound', 'sounds/mixkit-extra-bonus-in-a-video-game-2045.ogg')

}

function create() {
  
  this.add.image(400,300, 'sky')

  const map = this.make.tilemap({key: 'map'})
  // const tileset = map.addTilesetImage('Terrain (16x16)', 'tileMapImage')
  
//LAYER 1 
  const tileset2 = map.addTilesetImage('grass', 'grass')
  grass = map.createStaticLayer('grass', tileset2, 0, 0)
//LAYER 2
  const tileset = map.addTilesetImage('terrain', 'tileMapImage')
  platforms = map.createStaticLayer('blocks', tileset, 0, 0)
//LAYER 3 
  const tileset3 = map.addTilesetImage('spikes', 'spikes')
  spikes = map.createStaticLayer('spikes', tileset3, 0, 0)
//LAYER 4 
 
  const tileset5 = map.addTilesetImage('terrain', 'tileMapImage')
  boxes = map.createStaticLayer('boxes', tileset5, 0, 0)

  // const tileset4 = map.addTilesetImage('trophy', 'trophy')
  // trophy = map.createLayer('trophy', tileset4, 0, 0)

  audio_gameover = this.sound.add('gameover', {
    loop: false, 
    seek: 0, 
    volume: 0.2
  })

  audio_jumping = this.sound.add('jumpingSound')
  audio_trophySound = this.sound.add('trophySound')
  // audio_gameover.play()
  // console.log(audio_gameover)
 


  // platforms = map.createStaticLayer('Tile Layer 1', tileset, 0, 0)
  

  // this.world.setBounds(0, 0, 800, 600);
  // this.camera.follow(frog);


  // platforms = this.physics.add.staticGroup()


  // const spikes = this.physics.add.group({
  //   allowGravity: false,
  //   immovable: true
  // });
  // map.getObjectLayer('Spikes').objects.forEach((spike) => {
  //   const spikeSprite = spikes.create(spike.x, spike.y + 200 - spike.height, 'spike').setOrigin(0);
  //   spikeSprite.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
  // });
  // this.physics.add.collider(frog, spikes, null, this);

  // const secondLayer = map.createLayer('Tile Layer 3', tileset, 0, 0)
  

  // bgImage = myGame.add.sprite(0, 0, 800, 600,'brown')

  // platforms.create(1000, 850, 'tile1').setScale(1).refreshBody()

  // platforms.create(200, 850, 'tile1').setScale(1).refreshBody()
  // platforms.create(100, 850, 'tile1').setScale(1).refreshBody()
  // platforms.create(300, 850, 'tile1').setScale(1).refreshBody()
  // platforms.create(400, 850, 'tile1').setScale(1).refreshBody()

  // this.add.image(495, 300, 'brown')
  
  // jumpPlatform = this.add.image(495, 770, 'tile2').setScale(0.7)

  // jumpPlatform = this.physics.add.staticGroup()
  // jumpPlatform.create(495, 650, 'tile2').setScale(1)

  // starterPlatform = this.physics.add.staticGroup()
  // starterPlatform.create(85, 500, 'starterPlatform').setScale(1)

  // endPlatform = this.physics.add.staticGroup()
  // endPlatform.create(1120, 300, 'starterPlatform').setScale(1)

  // strawberry = this.physics.add.staticGroup()
  // strawberry.create(495, 770, 'strawberry').setScale(1)

  // background1 = this.add.tileSprite(300, 200, 1500, 1000, "sky");

  // platforms = this.physics.add.staticGroup()
  //addPlatform(x , y, width of tile)
  // addPlatform(45, 750, 75)
  // addPlatform(10, 590, 100)

  // platforms = this.physics.add.group({
  //   key: "tile1", 
  //   repeat: 10, 
  //   setXY: {x: 1, y:0, stepX: 70}
  // })


  frog = this.physics.add.sprite(90, 200, 'idle')
  // frog = this.physics.add.sprite(90, 500, 'idle')
  frog.setScale(2)
  frog.setBounce(0.2)
  //PREVENTS  frog FROM RUNNING OFF THE SCREEN 
  // frog.setCollideWorldBounds(true)

  // strawberry = this.physics.add.sprite(495, 300, 'strawberry')

  //ALLOWS US TO REFERENCE UP+DOWN+LEFT+RIGHT KEYBOARD BUTTONS 
  cursors = this.input.keyboard.createCursorKeys()

  // this.physics.add.collider(frog, platforms)
  // this.physics.add.collider(frog, jumpPlatform)
  // this.physics.add.collider(frog, starterPlatform)
  // this.physics.add.collider(frog, endPlatform)
  // this.physics.add.collider(strawberry, platforms)


//creating collisions with sprites in "Tiled" tilsheet
  platforms.setCollisionByExclusion(-1, true)
  this.physics.add.collider(frog, platforms)
  console.log(platforms)

  spikes.setCollisionByExclusion(-1, true)
  this.physics.add.collider(frog, spikes, frogDie)

  boxes.setCollisionByExclusion(-1, true)
  this.physics.add.collider(frog, boxes)



  // trophy.setCollisionByExclusion(-1, true)

  function frogDie(frog, spikes) {
    // frog.anims.play('hit', true)
    // frog.visible = false
    // frog.angle = 90
    // frog.anims.play("hit", true)
    // console.log(2)
    frogDead = true 
   
  }

  // this.physics.add.collider(frog, trophy)
  // this.physics.add.overlap(frog, trophy, collectTrophy, null, this);

  function collectTrophy(frog, trophy) {
    // trophy.disableBody(true, true)
    // this.scene.arcade.remove(trophy, true)
  
  
    // trophy.body.setOffset(1000, 1000)
    // trophy.setVisible(false)
    // trophy.disableBody(true, true)
    // console.log(trophy)
    trophyCollected = true 
    winnerText = "WINNER!!🏆"
    winnerGameText.setText(winnerText)
    trophy.destroy()
  }

  const trophies = this.physics.add.group({
    allowGravity: false, 
    immovable: true
  })
  map.getObjectLayer('trophy').objects.forEach((trophy) => {
    const trophySprite = trophies.create(trophy.x + 20, trophy.y - 32, 'trophy')
    trophySprite.body.setSize(trophy.width * 2, trophy.height)
  })
  this.physics.add.collider(frog, trophies, collectTrophy, null, this)

  function createStrawberry(hitBoxes){
    // strawberry = this.physics.add.sprite('strawberry')
    strawberry.create(hitBoxes.x, hitBoxes.y - 32, "strawberry")

  } 

  //REMOVING AN INDIVIDUAL BOX 
  function hitBox(frog, hitBoxes) {
    boxHit = true 
    // hitBoxes.visible = false 
    hitBoxes.destroy()
    createStrawberry(hitBoxes)

  }

  const hitBoxes = this.physics.add.group({
    allowGravity: false, 
    immovable: true
  })
  map.getObjectLayer('hitBoxes').objects.forEach((hitBox) => {
    const boxSprite = hitBoxes.create(hitBox.x, hitBox.y - 32, 'hitBoxes')
    // boxSprite.body.setSize(hitBox.width, hitBox.height)
     boxSprite.body.setSize(32, 32)
  })
  this.physics.add.collider(frog, hitBoxes, hitBox, null, this)




  // strawberry = this.physics.add.sprite(500,300, 'strawberry')
  // strawberry.setScale(2)
  // strawberry.setBounce(0.5)



  strawberry = this.physics.add.group({
    key: 'strawberry', 
    repeat: 8, 
    setXY: {x: 200, y:200, stepX: 70}
  })

  strawberry.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

});

  // strawberry.setCollideWorldBounds(true)


  this.physics.add.collider(strawberry, platforms)
  this.physics.add.overlap(frog, strawberry, collectItem, null, this);

  newtext = this.add.text(500,0,scoreText, {fontSize: '40px', color: "#199A3C"})

  function collectItem (frog, strawberry){
    strawberry.disableBody(true, true);

    //STEP 5 - ADDING A SCORE FEATURE 
    //10 POINTS ARE ADDED FOR EVERY STAR THAT IS COLLECTED, THIS IS APPENDED ONTO THE SCREEN AND UPDATES AS THEY ARE COLLECTED 
    score += 10;
    // scoreText.setText("Score: " + score)
    scoreText = "🍓count: " + score; 
    newtext.setText(scoreText)


    //ADDING TO THIS FUNCTION - BOMB FUNCTIONALITY 
      //checking to see how many stars are left alive 
      // if (strawberry.countActive(true) === 0){
        //if there are no stars left, we use the iterate function to re-enable all the stars and reset their y position to 0 
      //   strawberry.children.iterate(function (child) {
      //     child.enableBody(true, child.x, 0, true, true)
      //   })

      //   let x = (frog.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0,400);

      // }

    }

// strawberry.setCollideWorldBounds(true)


camera = this.cameras.main;
    camera.setBounds(0, 0, 1200, 0);
    camera.startFollow(frog, true, 0.05, 0.05);
    
 

  //GOING LEFT 
  this.anims.create({
    key: 'left', 
    frameRate: 20, 
    //as long as the key is down, it will loop around 
    repeat :-1, 
    // frames: this.anims.generateFrameNumbers('boy', {start:4, end: 6}),
    frames: this.anims.generateFrameNumbers('run', {start:0, end: 11})
})

  //GOING RIGHT 
  this.anims.create({
      key: 'right', 
      frameRate: 20, 
      //as long as the key is down, it will loop around 
      repeat :-1, 
      frames: this.anims.generateFrameNumbers('run', {start:0, end: 11 })
  })

  //DEFAULT IDLE POSITION
  this.anims.create({
    key:'idle', 
    frameRate: 20, 
    repeat: -1, 
    frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 10})
  })

  //JUMPING UP 
  this.anims.create({
    key: 'jump', 
    frameRate: 20,
    repeat: -1, 
    frames: [ { key: 'jump', frame: 0 } ],
    // frames: this.anims.generateFrameNumbers('jump', {start: })
  })

  //DOUBLE JUMP
  this.anims.create({
    key: 'double-jump', 
    frameRate: 10, 
    repeat: -1, 
    frames: this.anims.generateFrameNumbers('double-jump', {start:0, end:4})
  })

  //FALLING 
  this.anims.create({
    key: "fall", 
    frameRate: 10, 
    repeat: -1, 
    frames: [ { key: 'fall', frame: 0 } ]

  })


  //ANIMATION FOR JUST AN ITEM MOVING ON THE SCREEN 
  this.anims.create({
    key: 'strawberry', 
    frameRate: 10, 
    repeat: -1, 
    frames: this.anims.generateFrameNumbers('strawberry', {start:0, end:16})

  })

  //ANIMATION FOR BANANA
  this.anims.create({
    key: 'bananas', 
    frameRate: 10, 
    repeat: -1, 
    frames: this.anims.generateFrameNumbers('banana', {start:0, end:16})

  })

  //ANIMARTION TO DIE 
  this.anims.create({
    key: 'hit', 
    frameRate: 10,
    frames: this.anims.generateFrameNumbers('hit', {start: 2, end: 6})
  })

  //ANIMATION FOR BREAKING BOX 

  //EDITING GAME OVER TEXT 
  gameOverText = this.add.text(400, 250, gameText, {fontSize: '64px', color: '#FA0808', fontWeight: 'bold'})
  // gameOverText.setOrigin(2)
  // camera.startFollow(gameOverText)

  winnerGameText = this.add.text(500, 250, gameText, {fontSize: '96px', color: '#E2B80D', fontWeight: 'bold', textOutline: "#000000"})
  
  //PLAYING AUDIO
  audio_gameover.play()
  audio_gameover.pause()

  // audio_jumping.play()
  // audio_jumping.pause()

  audio_trophySound.play()
  audio_trophySound.pause()

}

function update() {
 
  // background1.tilePositionX += 0.5;
    // console.log(myGame.sound.context.state)

  if (frogDead === false) {
    if (cursors.left.isDown){
      isRunning = true 
      frog.flipX = true 
      frog.setVelocityX(-290)
      frog.anims.play('left', true)
  
    } else if (cursors.right.isDown) {
      isRunning = true 
      frog.flipX = false 
      frog.setVelocityX(500)
      frog.anims.play('right', true)

    } 

    // else {
    //   frog.setVelocityX(0)
    //   if (frog.body.onFloor()) {
    //     if (cursors.space)
    //   }
    // }
    //JUMPING SOUND EFFECT + ANIMATION  cursors.up.isDown & frog.body.onFloor()
    else if (cursors.up.isDown & frog.body.onFloor()){


      frog.setVelocityY(-720)
      frog.anims.play('jump', true)
      audio_jumping.play()
      // hasJumped = true
 
  } 
    else if (cursors.space.isDown) {
      // isRunning=false;
      // frog.setVeloctyX(0)
      frog.setVelocityY(-600)
      frog.anims.play('jump', true)
      audio_jumping.play()
    }
    // else if (cursors.up.isDown & !frog.body.onFloor()) {
    //     frog.setVelocityY(-800)
    //     frog.anims.play('double-jump', true)
    //     audio_jumping.play()
    // }
      else {
      frog.setVelocityX(0)
      frog.anims.play('idle', true)
      // strawberry.anims.play('strawberry', true)
  
  
    }
  
    if (cursors.up.isDown && frog.body.touching.down)
  {
      frog.setVelocityY(-330);
      frog.anims.play('jump', true )
  }

  if (trophyCollected === true) {
    // trophy.body.disableBody(true)
    audio_trophySound.resume()

  }
  } 
  else {
  
    
    // if (myGame.sound.context.state === 'suspended' || myGame.sound.context.state==="running") {
    //   myGame.sound.context.resume();
    //  
    //   }
    
    frog.anims.play("hit", true)
    audio_gameover.resume()
    gameText =  "GAME OVER ❌"
    gameOverText.setText(gameText)
   


  }

  
  //remove cursors
  // cursors.
  // frog.destroy()


}

// function render() {

//   this.debug.cameraInfo(game.camera, 32, 32);
//   this.debug.spriteCoords(player, 32, 500);

// }


const myGame = new Game ({
  type: Phaser.AUTO, 
  width: 800, 
  height: 640, 
  backgroundColor: "#85B88B",
  // autoCenter: true,
  physics: {
    default: 'arcade', 
    arcade: {
      gravity: { y: 1000 },
      debug: false,
    }
  }, 
  scene: {preload: preload, 
    create: create, 
    update: update}

})