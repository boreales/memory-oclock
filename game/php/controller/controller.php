<?php
require('../db.php');
require('../model/Score.php');
require('../functions.php');

//Tout d'abord on vérifie si la méthode POST est bien utilisée
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    //On vérifie ensuite si les données que l'on attend sont bien présentes dans le tableau $_POST
    if(isset($_POST['function']) && isset($_POST['arguments'])) {
        //On vérifie si le nom de la fonction est bien setScore
        if($_POST['function'] === 'setScore') {
            $time = $_POST['arguments'][0]; //On récupère le temps du joueur passé dans le tableau d'arguments
            if(isValidTimeStamp($time)){ //On vérifie si le temps est bien de type timestamp
                $score = new Score(); //On crée un nouvel objet Score
                $time = (string) $time; //On convertit le temps en string pour pouvoir l'enregistrer dans la base de données
                $score->setTimer($time); //On enregistre le temps du joueur dans l'objet Score

                //Insertion dans la base de données
                $sql = "INSERT INTO score (timer) VALUES (:timer)"; //On crée la requête SQL
                $stmt = $db->prepare($sql); //On prépare la requête grâce à PDO
                $stmt->bindValue(':timer', $time, PDO::PARAM_STR); //On lie la valeur du temps du joueur à la requête en obligeant le type de la valeur à string
                $stmt->execute(); //On exécute la requête

                echo json_encode(1); //On renvoie 1 pour indiquer que la requête a été effectuée et que tout s'est bien passé
            }
            else {
                echo json_encode(0); //On renvoie 0 pour indiquer que la requête n'a pas été effectuée ou qu'une erreur est survenue
            }
        }
    }
}
