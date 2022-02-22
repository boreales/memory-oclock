//Cette fonction va nous permettre d'enregistrer les scores dans la base de données en faisant une requête Ajax vers notre controller.php
function saveScore(time){
    console.log('Save score');
    $.ajax({
        type: "POST", //On précise que c'est une requête de type POST car on envoie des données à notre serveur
        url: 'php/controller/controller.php', //On donne l'url vers laquelle envoyer les données
        dataType: 'json', //On précise que le type de données envoyées au serveur sera du json
        data: {function: 'setScore', arguments: [time]}, //On souhaite utiliser la fonction setScore du controller et lui passer comme argument le temps du joueur
        success:function(data){ //En cas de succès de notre fonction AJAX on récupère le retour du controller
            if(data == 1) { //Si la réponse côté serveur vaut 1 alors tout s'est bien passé
                console.log('Score enregistré');
            }
            else{
                console.log('Erreur lors de l\'enregistrement du score');
            }
        },
        error: function(data){ //En cas d'erreur de notre fonction AJAX on récupère le retour du controller
            console.log('Erreur AJAX', data.responseText);
        }
    }); 
}