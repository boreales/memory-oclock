<?php
require('../model/Score.php'); //On importe notre classe Score pour pouvoir créer en un objet
require('../functions.php'); //On importe nos fonctions utiles au traitement des données

/*
Tout d'abord on vérifie si la méthode POST est bien utilisée en utilisant 
la fonction $_SERVER['REQUEST_METHOD'] de PHP.
Cette fonction renvoie la méthode HTTP utilisée pour accéder à la page (GET, POST, ...)
*/
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    /*
    On vérifie ensuite avec la fonction isset si les données que l'on attend sont bien présentes dans le tableau $_POST.
    function correspondant au nom de la fonction et les arguments correspondant au score envoyé par la partie Javascript.
    */
    if(isset($_POST['function']) && isset($_POST['arguments'])){
        //On vérifie si le nom de la fonction est bien setScore
        if($_POST['function'] === 'setScore'){
            //On récupère le temps du joueur passé dans le tableau d'arguments
            $time = $_POST['arguments'][0]; 
            //On vérifie si le temps est bien de type timestamp avec notre fonction isValidTimeStamp
            if(isValidTimeStamp($time)){
                /*
                Par précaution on convertit le temps dans un type string (chaîne de caractères) 
                avant de l'envoyer dans notre base de données.
                */
                $time = (string) $time;
                /*On crée un nouvel objet Score à partir de notre classe Score.php 
                et on lui donne la valeur du temps de la partie.
                */
                $score = new Score($time); 
                //On enregistre le score dans la base de données via notre fonction setScore du fichier functions.php
                if(setScore($score)){
                    //On renvoie 1 pour indiquer que la requête a été effectuée et que tout s'est bien passé
                    echo json_encode(1);
                }
                else{
                    //On renvoie 0 pour indiquer que la requête n'a pas été effectuée ou qu'une erreur est survenue
                    echo json_encode(0);
                }
            }
            else{
                //On renvoie 0 pour indiquer que la requête n'a pas été effectuée ou qu'une erreur est survenue
                echo json_encode(0);
            }
        }
    }
}
