var player;
var treats;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
let randomY;

export function preload ()
{
    this.load.image('sky', './assets/sky.png');
    this.load.image('ground', './assets/platform.png');
    this.load.image('treato', './assets/treato.png');
    this.load.spritesheet('obi', '../assets/obi.png', { frameWidth: 29, frameHeight: 48 });
    this.load.spritesheet('obi-walk-left', './assets/obi_walk_left.png', { frameWidth: 70, frameHeight: 48 });
    this.load.spritesheet('obi-walk-right', './assets/obi_walk_right.png', { frameWidth: 70, frameHeight: 48 });
}

// creates the game
export function create ()
{
    this.cameras.main.setBounds(0, 0, 800, 600, true);
    this.physics.world.setBounds(0, 0, 800, 600, true, true, false);
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 400, 'ground');
    platforms.create(40, 200, 'ground');
    platforms.create(750, 230, 'ground');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'obi');

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.1);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: 'obi-walk-left',
        frameRate: 12,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'obi', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: 'obi-walk-right',
        frameRate: 12,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    randomY = Math.random();
    if (randomY > 0.33) {
        randomY = 450;
    } else if (randomY < 0.33) {
        randomY = 215;
    } else {
        randomY = 180;
    }
    treats = this.physics.add.group();
    treats.create(
        Math.floor(Math.random() * 800),
        randomY,
        'treato')

    treats.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.3, 0.5));
    });

    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the treats with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(treats, platforms);

    //  Checks to see if the player overlaps with any of the treats
    this.physics.add.overlap(player, treats, collectTreat, null, this);

    this.cameras.main.startFollow(player, true, 200, 200);
    this.cameras.main.setZoom(3)
}
// the 'actions' a player takes
export function update ()
{
    if (gameOver)
    {
        return;
    }

    if (cursors.left.isDown)
    {
        player.setVelocityX(-170);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(170);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }
    // a 'jump' functionality
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-500);
    }
}

export function collectTreat (player, treat) {
    treats.clear(true, true);
    //  Add and update the score
    score += 10;
    scoreText.setText('Score: ' + score);

    if (treats.countActive(true) === 0) {
        randomY = Math.random();
        if (randomY > 0.33) {
            randomY = 450;
        } else if (randomY < 0.33) {
            randomY = 215;
        } else {
            randomY = 180;
        }
        treats.create(
            Math.floor(Math.random() * 800),
            randomY,
            'treato');
    }
}