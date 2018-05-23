function createPlateform(vitesse, longueur, hauteur, positionX, positionY){
	plateforms = game.add.sprite(positionX, positionY, "plateform");
	game.physics.enable(plateforms, Phaser.Physics.ARCADE);
	plateforms.enableBody = true;
	plateforms.body.immovable = true;
	plateforms.body.allowGravity = false;
	plateforms.body.velocity.x = vitesse;
	plateforms.width = longueur;
	plateforms.height = hauteur;
	plateforms.anchor.set(0.5,0);

	return plateforms;
}
function restoreLvl(tableau_platforms){
	for (var i = 0; i < tableau_platforms.length; i++) {
		console.log(tableau_platforms[i])
		createPlateform(0,tableau_platforms[i].width,tableau_platforms[i].height,w/2,tableau_platforms[i].position.y);	
	}
}