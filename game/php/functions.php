<?php

//On importe notre connexion à la base de données afin d'y accéder
require('db.php');
//On importe également notre classe Score pour en créer un objet
require('score.php');

function getScores(){
    $req = $this->db->query('SELECT * FROM score ORDER BY time ASC');

    return $req->fetchAll();
}

function setScore($time){
    $score = new Score();
    $score->setTime($time);
    
    $req = $this->db->prepare('INSERT INTO score(time) VALUES(:time)');
    $req->execute(array(
        'time' => $score
    ));

    return 1;
}
