function createplayer(){
    var playerPos = JSON.parse(localStorage.getItem("mygame-player-y"));
    if (playerPos === null) {
        player = game.add.sprite(690,1268,"player");
    }else{
        player = game.add.sprite(690,playerPos,"player");
    }
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.drag.set(100);
    player.body.maxVelocity.set(1000);
    player.body.setSize(60,55, 0, 0 );
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 3600;
    player.allowjump = false;
    player.jumppower = -880;
    player.anchor.set(0.5,0.5);
    game.camera.follow(player);
    playerspawn = game.add.audio('playerspawn');
    playerspawn.play()
    player.scale.x=1;
    var jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // animation player
    var move = player.animations.add('move');
    
    player.update = function(){
        
        if(jump.isDown && player.allowjump){
            player.allowjump = false;
            player.body.velocity.y = player.jumppower
            player.animations.play('move', 8, true);
        }
        if (player.body.touching.down) {
            player.allowjump = true;
            player.animations.stop('move', 8);
        }
    };
    // text niveaux
    if(player.body.y < 875){
        text = game.add.text(20, 775, "Niveau 2", { font: '34px Helvetica', fill: '#CB1A1E' });
        game.add.tween(text).to({alpha: 0}, 2000, "Linear", true);
    };
    if(player.body.y < 395){
        text = game.add.text(20, 355, "Niveau 3", { font: '34px Helvetica', fill: '#CB1A1E' });
        game.add.tween(text).to({alpha: 0}, 2000, "Linear", true);
    }
    return player; 
};