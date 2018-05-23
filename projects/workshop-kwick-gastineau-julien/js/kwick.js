// Constante d'url de l'api
var api_url = "http://greenvelvet.alwaysdata.net/kwick/api/";
var pseudo = $('#pseudo').val();
var mdp = $('#password').val();
var token = "";
var id = "";
var message = $('#message').val();
$(document).ready(function(){
    // Inscription
    $('#inscription').on('click',function(e){
        pseudo= $('#pseudo').val();
        mdp= $('#password').val();
        request('signup/' + pseudo + '/' + mdp,function(e){
            if(e.result.status == "failure"){
                alert("Inscription ratée");
            }else{
                console.log(e);
                localStorage.setItem("token",e.result.token);
                console.log("token" + localStorage.getItem("token"));
                localStorage.setItem("id",e.result.id);

            }
        });
    });
    // Ping
     $('#ping').on('click',function(e){
        request('ping',function(e){
            console.log(e);
            $('#ping').next().remove()
            $('#ping').parent().append('<p>' + e.kwick.completed_in + 'ms</p>').css('color','#fff');
        });
    });
     // Connexion
    $('#connexion').on('click',function(){
        pseudo = $('#pseudo').val();
        mdp = $('#password').val();
        console.log(pseudo);
        console.log(mdp);
        request('login/' + pseudo + '/' + mdp,function(e){
            if(e.result.status == "failure"){
                console.log(e);
                alert("Connexion ratée");
            }else{
                console.log(e);
                console.log(e.result.token);
                localStorage.setItem("token",e.result.token);
                console.log("token"+localStorage.getItem("token"));
                localStorage.setItem("id",e.result.id);
                token = localStorage.getItem("token");
                id = localStorage.getItem("id");
                // Changer de page
                location.assign("tchat.html");
            }
        });
    });
    
     // Afficher les messages des autres utilisateurs
    $('#refreshmsg').on('click',function(){
        token = localStorage.getItem("token");
         request('talk/list/' + token +'/0', function(e){
            console.log(e);
             for(var i=0; i < e.result.talk.length; i++){
                 $('#addmessage ul').prepend('<li>' + e.result.talk[i].user_name + ' : ' + e.result.talk[i].content + '</li>')
                }
            });   
    }) 

     //Affichez les utilisateurs connectés
    $('#clickbtn').on('click',function(e){
            token=localStorage.getItem("token");
            request('user/logged/' + token,function(e){
                if (e.result.status == "failure"){
                    alert("Fail")
                    $('#userco').append('<li>Erreur de chargement</li>');
                } else {
                    alert("en cours");
                    console.log("token" + localStorage.getItem("token"));
                    $('#userco').empty();
                    for(var i=0; i<(e.result.user).length; i++){
                        $('#userco').append('<li>' + e.result.user[i] + '</li>')
                    }
                }
            console.log(e);
        });
    });
    // Poster un message
    $('#envoyer').on('click',function(e){
        token = localStorage.getItem("token");
        id = localStorage.getItem("id");
        message = encodeURI($('#message').val());
        request('say/' + token + '/' + id + '/' + message,function(e){
            console.log(e);
        });
    });
    
    // Déconnexion
    $('#deconnexion').on('click',function(e){
        token = localStorage.getItem("token");
        id = localStorage.getItem("id");
        request('logout/' + token + '/' + id, function(e){
           console.log(e);
          localStorage.removeItem("token");
          location.assign("kwick.html"); 
        });
    });
});

    function request(url, callback) {
        var request = $.ajax({

            method: 'GET',
            url: api_url + url,
            dataType:'jsonp'
        });
        // En cas de réussite
        request.done(callback)
        // En cas d'échec
        request.fail(function(e){
            alert('Error');
        });
    }


//Gestion des Utilisateurs connectés
/*setInterval(function(){
    if (connection==true){
        affiche_user_co();
        supprime_user_co();
        reception_message();
        }
    
},2000);*/