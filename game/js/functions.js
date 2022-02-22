/*
Cette fonction va nous permettre d'enregistrer les scores dans la base de données
en faisant une requête Ajax vers notre controller.php.
Ajax est une méthode qui permet de faire des requêtes HTTP sans rafraichir la page.
Nous allons donc faire une requête HTTP de type POST sur notre fichier controller.php
qui va en récupérer et traiter la donnée "time" envoyée.
*/
function saveScore(time){
    $.ajax({
        //On précise que c'est une requête de type POST car on envoie des données à notre serveur
        type: "POST",
        //On donne l'url vers laquelle envoyer les données, ici le chemin relatif vers le fichier controller.php
        url: 'php/controller/controller.php',
        /*
        On précise que le type de données envoyées au serveur sera du json, 
        un format de données correspondant à un objet JavaScript.
        */
        dataType: 'json', 
        /*
        On souhaite utiliser la fonction setScore du controller et lui passer comme argument 
        le temps du joueur stocké dans la variable time.
        */
        data: {function: 'setScore', arguments: [time]},
        //En cas de succès de notre fonction AJAX on récupère le retour du fichier controller.php
        success:function(data){ 
            //Si la réponse côté serveur vaut 1 alors tout s'est bien passé
            if(data == 1){ 
                console.log('Score enregistré');
            }
            //Sinon on affiche un message d'erreur
            else{
                console.log('Erreur lors de l\'enregistrement du score');
            }
        },
        //En cas d'erreur de notre fonction AJAX on récupère le retour du controller
        error: function(data){
            console.log('Erreur AJAX', data.responseText);
        }
    }); 
}