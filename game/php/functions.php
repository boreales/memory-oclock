<?php

//Cette fonction va vérifier si le paramètre $timestamp est au bon format
function isValidTimeStamp($timestamp)
{
    return ((string) (int) $timestamp === $timestamp) 
        && ($timestamp <= PHP_INT_MAX)
        && ($timestamp >= ~PHP_INT_MAX);
}

//Cette fonction sert à récupérer dans la base de données les différents scores déjà enregistrés
function getScores()
{
    //On importe notre connexion à la base de données
    require_once('db.php');
    require_once('model/Score.php');
    //On sélectionne tous les scores en les classant du plus petit au plus grand
    $sql = "SELECT * FROM score ORDER BY timer ASC";
    //On prépare notre requête SQL puis on l'exécute
    $stmt = $db->prepare($sql);
    $stmt->execute();
    //On stocke les résultats de notre requête dans une variable $results
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //On initialise une variable $html qui va stocker le code HTML affichant les scores
    $html = '';
    //On parcourt notre tableau $scores et on crée une ligne en html pour chacun avec le numéro et le temps
    for($i = 0; $i < count($results); $i++)
    {
        $rank = $i + 1;
        //On utilise la fonction PHP unserialize pour récupérer les données stockées dans la base de données sous forme d'objets
        $score = unserialize($results[$i]['timer']);
        //On crée une ligne par résultat en formatant le score en minutes et secondes grâce à la fonction gmdate()
        $html .= '<p>#'.$rank. ' - ' . gmdate("i:s", $score->timer) . '</p>';
    }
    //Si jamais la variable $scores est vide on inscrit un message indiquant qu'il n'y a pas de scores
    if(sizeof($results) === 0) {
        $html .= '<p>Aucun score enregistré</p>';
    }
    //Dans tous les cas on retourne le html précédemment construit pour qu'il puisse être affiché dans le fichier index.php
    return $html;
}

function setScore($score)
{
    //On importe notre connexion à la base de données
    require_once('db.php');
    //On sérialise notre objet score avant de l'insérer en base de données
    $serializedObject = serialize($score);
    //Insertion dans la base de données
    $sql = "INSERT INTO score (timer) VALUES (:serializedObject)"; //On crée la requête SQL
    $stmt = $db->prepare($sql); //On prépare la requête grâce à PDO
    $stmt->execute(array(
        ':serializedObject' => $serializedObject
    ));

    return true; //On retourne true pour indiquer que la requête a été effectuée
}