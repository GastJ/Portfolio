var game = new Phaser.Game(1366, 768, Phaser.AUTO, 'game',{preload:preload, create: create, update: update, render: render}); 
var player = 0;
var w = 1366;
var h = 768;
var niveau = 0;
var plateform='';
var levelTab = [];
var sky = null;
var gameWin;
var teleport;
var text;
function preload(){
	var locations =["assets/spacebg.png",
	"assets/PlayerSprite1.png",
	"assets/plateformtest.png",
	"assets/gameover2.png",
	"assets/petitwin.png",
	"assets/acidie.png",
    "assets/retry.png",
    "assets/menu.png",
    "assets/gamewin.png"
    ]; 

    names = ["gameBg",
    "player",
    "plateform",
    "gameover",
    "gamewin",
    "teleport",
    "retry",
    "menu",
    "youwin"
    ]; 

    for ( var i =0; i<locations.length; i++){
      game.load.image(names[i], locations[i]);  
  }; 

  game.load.image(); 
  game.load.image("gameBg","assets/spacebg.png", 1366, 768);
  game.load.spritesheet("player", "assets/PlayerSprite1.png", 64, 65, 8);
  game.load.image("plateform", "assets/plateformtest.png", 100, 800);
  game.load.image('gameover', 'assets/gameover2.png');
  game.load.image('gamewin', 'assets/petitwin.png');
  game.load.spritesheet('teleport', 'assets/acidie.png', 100, 100, 11);
  game.load.image('retry','assets/retry.png');
  game.load.image('menu','assets/menu.png');
  game.load.image('youwin','assets/gamewin.png');
  game.load.audio('win', 'son/tada.ogg');
  game.load.audio('death','son/death2.ogg');
  game.load.audio('playerspawn','son/spawn.ogg');
};
function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE); 
	game.renderer.clearBeforeRender = false;
	game.renderer.roundPixels = true;
	game.physics.enable([player, plateform], Phaser.Physics.ARCADE);
	game.world.setBounds(0, -200, 1366, 1736);
    // fond
    sky = game.add.tileSprite(0,0,1366,768,'gameBg'); 
    sky.fixedToCamera = true;
    // sons
    death = game.add.audio('death');
    win = game.add.audio('win');
    // Images Victoire 
    gameWin = game.add.sprite(690,-115,"gamewin");
    gameWin.anchor.set(0.5,0.5);
    gameWin.visible = false;
    // Bouton Retry
    gameRetry = game.add.sprite(-1600, game.camera.y+400, "retry");
    gameRetry.anchor.set(0.5,0.5);
    gameRetry.visible = false;
    // Bouton Menu
    gameMenu = game.add.sprite(-1600, game.camera.y+400, 'menu');
    gameMenu.anchor.set(0.5,0.5);
    gameMenu.visible = false;
    // Text
    text = game.add.text(20, 1368, "Niveau 1", { font: '34px Helvetica', fill: '#CB1A1E' })
    game.add.tween(text).to({alpha: 0}, 2000, "Linear", true);
    // Joueur
    teleport = game.add.sprite(2190,2990,'teleport');
    player = createplayer();
    // Plateforms
    niveau_atteint= JSON.parse(localStorage.getItem("niveau"));
    if (niveau_atteint!==null) {
    	niveau= niveau_atteint;
    }
    if (niveau==0) {
    	plateformsTab = [
    	createPlateform(500,700,80,-500,1275),
    	createPlateform(650,600,80,-1200,1195),
    	createPlateform(850,500,80,-2000,1115),
    	createPlateform(750,400,80,-2300,1035),
    	createPlateform(500,300,80,-1600,955),
    	createPlateform(300,200,80,-1000,875)
    	]
    	plateformsTab1 = [
    	createPlateform(-750,700,80,6100,795),
    	createPlateform(-650,600,80,5800,715),
    	createPlateform(-500,500,80,4900,635),
    	createPlateform(-400,400,80,4300,555),
    	createPlateform(-700,300,80,7100,475),
    	createPlateform(-750,200,80,7800,395)
    	]
    	plateformsTab2 = [
    	createPlateform(700,700,80,-7200,315),
    	createPlateform(700,600,80,-7450,235),
    	createPlateform(750,500,80,-8150,155),
    	createPlateform(500,400,80,-5500,75),
    	createPlateform(800,300,80,-9550,-5),
    	createPlateform(900,200,80,-11400,-85)
    	]
    }else if(niveau==1) {

    	plateformsTab = [
    	createPlateform(0,700,80,w*0.5,1275),
    	createPlateform(0,600,80,w*0.5,1195),
    	createPlateform(0,500,80,w*0.5,1115),
    	createPlateform(0,400,80,w*0.5,1035),
    	createPlateform(0,300,80,w*0.5,955),
    	createPlateform(0,200,80,w*0.5,875)
    	]
    	plateformsTab1 = [
    	createPlateform(-750,700,80,2000,795),
    	createPlateform(-650,600,80,2300,715),
    	createPlateform(-500,500,80,2300,635),
    	createPlateform(-400,400,80,2200,555),
    	createPlateform(-700,300,80,3400,475),
    	createPlateform(-750,200,80,3800,395)
    	]
    	plateformsTab2 = [
    	createPlateform(700,700,80,-3500,315),
    	createPlateform(700,600,80,-3750,235),
    	createPlateform(750,500,80,-4200,155),
    	createPlateform(500,400,80,-2800,75),
    	createPlateform(800,300,80,-5300,-5),
    	createPlateform(900,200,80,-6400,-85)
    	]
    }else if(niveau==2){
    	plateformsTab = [
    	createPlateform(0,700,80,w*0.5,1275),
    	createPlateform(0,600,80,w*0.5,1195),
    	createPlateform(0,500,80,w*0.5,1115),
    	createPlateform(0,400,80,w*0.5,1035),
    	createPlateform(0,300,80,w*0.5,955),
    	createPlateform(0,200,80,w*0.5,875)
    	]
    	plateformsTab1 = [
    	createPlateform(0,700,80,w*0.5,795),
    	createPlateform(0,600,80,w*0.5,715),
    	createPlateform(0,500,80,w*0.5,635),
    	createPlateform(0,400,80,w*0.5,555),
    	createPlateform(0,300,80,w*0.5,475),
    	createPlateform(0,200,80,w*0.5,395)
    	]
    	plateformsTab2 = [
    	createPlateform(700,700,80,-500,315),
    	createPlateform(700,600,80,-700,235),
    	createPlateform(750,500,80,-950,155),
    	createPlateform(500,400,80,-675,75),
    	createPlateform(800,300,80,-1800,-5),
    	createPlateform(900,200,80,-2700,-85)
    	]
    }
    var levelTab = [
    plateformsTab
    ,
    plateformsTab1,
    plateformsTab2
    ];
    plateform = createPlateform(0,800,80,700,1355);
};

function collisionHandler (player, plateform) {
	player.body.x -= plateform.body.x - plateform.body.prev.x; 
	if(player.x != 690){
		player.kill();
        death.play();
	   // Animation mort
       teleport = game.add.sprite(player.body.x+15, player.body.y+20, "teleport");
       teleport.anchor.setTo(0.5,0.5);
       teleport.animations.add("teleportation");
       teleport.animations.play("teleportation", 20, false, true);
	// Game Over
	gameOver = game.add.sprite(w/2, game.camera.y+200, 'gameover');
	gameOver.anchor.setTo(0.5, 0.5);
	gameOver.visible = true;
    // Boutons Retry et Menu
    game.add.button(230, game.camera.y+400,'retry', restart);
    gameRetry.visible = true;
    gameMenu = game.add.button(750, game.camera.y+400, 'menu', callMenu);
    gameMenu.visible = true;
};
};

function update(){
	gameWin.angle += 3;
	game.physics.arcade.collide(player, plateform);
	game.physics.arcade.collide(player, plateformsTab, collisionHandler, null, this);
	game.physics.arcade.collide(player, plateformsTab1, collisionHandler, null, this);
	game.physics.arcade.collide(player, plateformsTab2, collisionHandler, null, this);
    // Stop les plateformes
    for(var i=0; i<plateformsTab.length && i<plateformsTab1.length && i<plateformsTab2.length; i++ ){
      if(plateformsTab[i].x >= w/2){
         plateformsTab[i].body.velocity.x = 0;
     };
     if(plateformsTab1[i].x <= w/2){
         plateformsTab1[i].body.velocity.x = 0;
     };
     if(plateformsTab2[i].x >= w/2){
         plateformsTab2[i].body.velocity.x = 0;
     };
 };
    // Camera fond
    sky.tilePosition.y = -(game.camera.y * 0.7);
    // Sauvegarde des niveaux
    if(player.body.y < plateformsTab1[5].y-85){
      saveGame();
      niveau=2;
  };
  if(player.body.y < plateformsTab[5].y-85){
      saveGame();
      niveau=1;
  };
    // Orientation du joueur gauche / droite
    if(player.body.y < 815){
        player.scale.x =-1;
    };
    if(player.body.y < 315){
        player.scale.x =1;
    }
    // GameWin
    if(player.body.y < plateformsTab2[5].y-90){
      win.play();
      gameWin.visible = true;
      youWin = game.add.sprite(w/2, game.camera.y+200, 'youwin');
      youWin.anchor.setTo(0.5, 0.5);
      youWin.visible = true;
      // Bouton Retry et Menu
      game.add.button(230, game.camera.y+400,'retry', restart);
      gameRetry.visible = true;
      gameMenu = game.add.button(750, game.camera.y+400, 'menu', callMenu);
      gameMenu.visible = true;
      localStorage.clear();
    }
};
function render(){
	/*game.debug.body(player);*/
};
function restart () {
	game.state.start(game.state.current);
    // Cache le game over, le game win et l'animation de fin
    gameOver.visible = false;
    youWin.visible = false;
    gameWin.visible = false; 
};
function saveGame(){
	playerPosition=player.y;
	localStorage.setItem("niveau", JSON.stringify(niveau));
	localStorage.setItem("mygame-player-y", JSON.stringify(playerPosition));
}
function callMenu(){
    document.location.href="menu.html"
};