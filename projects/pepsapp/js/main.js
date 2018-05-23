var list_activite = ["act1","act2","act3"];

$("grande_div_principale").append(
	'<div class="div_list"><ul><li>'
	+list_activite[0]+'</li><li>'
	+list_activite[1]+'</li><li>'
	+list_activite[2]+'</li><li></ul></div><div class="div_check_box"><label><input type="checkbox" id="cbox1">'
	+list_activite[0]+'</label><label><input type="checkbox" id="cbox2">'
	+list_activite[1]+'</label><label><input type="checkbox" id="cbox3">'
	+list_activite[2]+'</label><button>Validé</button></div>'
	)

//CSS
.div_list:{
	display:block;
}
.div_check_box:{
	display:none;
}

$(".bouton_changer_liste_checkbox").on("click",function(){
	//vérifie si le display de la div est en block
	if ($(".div_list").css("display")=="block") {
		$(".div_list").css("display","none");
		$(".div_check_box").css("display","block");
	};
});







var liste_repos = ["act1","act2","act3","act4","act5"];
var liste_travail = ["act6","act7","act8","act9","act10"];
var liste_exterieur = ["act11","act12","act13","act14","act15"];
$(".btnliste").on("click",function(){
    if (document.getElementById("travail").checked == true) {
        var liste_activite = [];
        for (var i = 0; i < 3; i++) {
            var activite = Math.floor(Math.random()*(liste_travail.length-1));
           
            liste_activite.push(liste_travail[activite]);
            liste_travail.splice(activite,1)
        };
        var liste_travail = ["act6","act7","act8","act9","act10"];
        console.log(liste_activite);
    }else if (document.getElementById("repos").checked == true) {

    }else if (document.getElementById("loisirs").checked == true) {

    }
})