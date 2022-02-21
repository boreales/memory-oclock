<?php
require('../model/Score.php'); //On importe notre classe Score pour pouvoir créer en un objet
require('../functions.php'); //On importe nos fonctions utiles au traitement des données

//Tout d'abord on vérifie si la méthode POST est bien utilisée
if ($_SERVER['REQUEST_METHOD'] === 'POST'){
    //On vérifie ensuite si les données que l'on attend sont bien présentes dans le tableau $_POST
    if(isset($_POST['function']) && isset($_POST['arguments'])){
        //On vérifie si le nom de la fonction est bien setScore
        if($_POST['function'] === 'setScore'){
            $time = $_POST['arguments'][0]; //On récupère le temps du joueur passé dans le tableau d'arguments
            if(isValidTimeStamp($time)){ //On vérifie si le temps est bien de type timestamp
                $score = new Score(); //On crée un nouvel objet Score
                $time = (string) $time; //On convertit le temps en string pour pouvoir l'enregistrer dans la base de données
                $score->setTimer($time); //On enregistre le temps du joueur dans l'objet Score
                if(setScore($time)){ //On enregistre le score dans la base de données via notre fonction setScore du fichier functions.php
                    echo json_encode(1); //On renvoie 1 pour indiquer que la requête a été effectuée et que tout s'est bien passé
                }
                else{
                    echo json_encode(0); //On renvoie 0 pour indiquer que la requête n'a pas été effectuée ou qu'une erreur est survenue
                }
            }
            else{
                echo json_encode(0); //On renvoie 0 pour indiquer que la requête n'a pas été effectuée ou qu'une erreur est survenue
            }
        }
    }
}
