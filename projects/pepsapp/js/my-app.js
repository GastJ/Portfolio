// Initialize your app
var myApp = new Framework7();

// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});

// Callbacks to run specific code for specific pages, for example for About page:
myApp.onPageInit('about', function (page) {
    // run createContentPage func after link was clicked
    $$('.create-page').on('click', function () {
        createContentPage();
    });
});

// Now we need to run the code that will be executed only for About page.
myApp.onPageInit('about', function (page) {
  // Do something here for "about" page
  
})
 
// Generate dynamic page
var dynamicPageIndex = 0;
function createContentPage() {
    mainView.router.loadContent(
        '<!-- Top Navbar-->' +
        '<div class="navbar">' +
        '  <div class="navbar-inner">' +
        '    <div class="left"><a href="#" class="back link"><i class="icon icon-back"></i><span>Back</span></a></div>' +
        '    <div class="center sliding">Dynamic Page ' + (++dynamicPageIndex) + '</div>' +
        '  </div>' +
        '</div>' +
        '<div class="pages">' +
        '  <!-- Page, data-page contains page name-->' +
        '  <div data-page="dynamic-pages" class="page">' +
        '    <!-- Scrollable page content-->' +
        '    <div class="page-content">' +
        '      <div class="content-block">' +
        '        <div class="content-block-inner">' +
        '          <p>Here is a dynamic page created on ' + new Date() + ' !</p>' +
        '          <p>Go <a href="#" class="back">back</a> or go to <a href="services.html">Services</a>.</p>' +
        '        </div>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>'
    );
    return;
}


$(".btnliste").on("click",function(){

    var liste_repos = ["Lire un livre","Bricoler","Apprendre à jouer d'un instrument","Activité multimédia (films, jeux vidéo...etc)","Faire du rangement"];
    var liste_travail = ["Pause Café","Prendre l'air","Pause relax(films,musiques...etc)","(si fumeur) pause cigarette","regroupez vous avec quelques amis"];
    var liste_exterieur = ["Voyager","Pique-niquer","Faire du sport","Voir des amis","Aller dans un parc d'attraction"];

    var activites = [liste_repos, liste_travail, liste_exterieur];

    var id = 0;
    if (document.getElementById("travail").checked == true) id = 1;
    if (document.getElementById("loisirs").checked == true) id = 2;

    var liste_activite = [];
    var target_activite  = activites[id];
    var target_activite_copy = target_activite.slice(0);
    console.log(target_activite_copy);

    for (var i = 0; i < 3; i++) {
        var activite = Math.floor(Math.random()*(target_activite.length-1));
       console.log(activite);

        liste_activite.push(target_activite[activite]);
        target_activite.splice(activite,1);

    };

    target_activite = target_activite_copy;
    console.log(target_activite+" copy"+target_activite_copy)


    
    $(".listapp").empty();
    $(".listapp").append(
        '<div class="div_list"><ul><li>'
        +liste_activite[0]+'</li><li>'
        +liste_activite[1]+'</li><li>'
        +liste_activite[2]+'</li></ul></div>'
        +'<a type="submit" class="button button-big button-fill color-blue btncheckbox" href="#checkbox"  >Compte Rendu</a>'
        )

    $(".listapp2").empty();
    $(".listapp2").append(
        '<div class="list-block div_check_box"><ul><li>'
        +'<label class="label-checkbox item-content"><!-- Checked by default --><input type="checkbox" name="my-checkbox"  ><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">'+liste_activite[0]+'</div></div>'
        +'</label></li><li><label class="label-checkbox item-content"><!-- Checked by default --><input type="checkbox" name="my-checkbox" ><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">'+liste_activite[1]+'</div></div>'
        +'</label></li><li><label class="label-checkbox item-content"><!-- Checked by default --><input type="checkbox" name="my-checkbox" ><div class="item-media"><i class="icon icon-form-checkbox"></i></div><div class="item-inner"><div class="item-title">'+liste_activite[2]+'</div></div>'
        +'</label></li></ul><a type="submit" class="button button-big button-fill color-blue" href="#Resultat2"  >Ok</a>'
    )

    $(".div_list").show();
    $(".div_check_box").hide();

    $(".btnliste").on("click",function(){
        if($(".div_list").hide()){
            $(".div_list").show();
            console.log("show");
            $(".div_check_box").hide();
        }else if ($(".div_list").show()) {
            $(".div_list").hide();
            console.log("hide");
            $(".div_check_box").show();
        }
    });

    $(".btncheckbox").on("click",function(){
        //vérifie si le display de la div est en block
        if ($(".div_list").show()) {
            $(".div_list").hide();
            console.log("hide");
            $(".div_check_box").show();
        }else if($(".div_list").hide()){
            $(".div_list").show();
            console.log("show");
            $(".div_check_box").hide();
        }
    });
});




    $(document).ready(function(){
        $(".btnsub").on("click",function(e){
            email= $("#mail").val();
            password = $("#pass").val();
            e.preventDefault();
            firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            });
        });
        //var credential = firebase.auth.EmailPasswordAuthProvider.credential(email, password);

        $(".btnlog").on("click",function(e){
            email= $("#maillogin").val();
            password = $("#passlogin").val();
            console.log(email, password);
            e.preventDefault();
            var erreur = false;
            firebase.auth().signInWithEmailAndPassword(email,password).catch(function(error) {
                // Handle Errors here.
                console.log(error)
                var errorCode = error.code;
                var errorMessage = error.message;
                erreur = true;
                myApp.alert('Email ou mot de passe incorrect', 'Peps App');
                 

            }).then(function(rep) {
                // connecté
                console.log(rep);
                var user = firebase.auth().currentUser;
                console.log('user', user);
                if (erreur == false) {
                mainView.router.load({pageName: 'profil'})  
              }else{
                mainView.router.load({pageName: 'user'})
              }
                
            });
        });
           
        $(".btnoff").on("click",function(e){
            firebase.auth().signOut().then(function() {
            // Sign-out successful.
            mainView.router.load({pageName: 'user'})
            console.log("deconnexion reussie");
            myApp.alert('Déconnexion Réussie','Peps App');
            }, function(error) {
            console.log(error);
            
            });        
        });

    });
    
