<?php
require('../functions.php');

/*
Cette classe permet de gérer les requêtes Ajax provenant du fichier game.js et d'appeler les fonctions PHP du fichier functions.php
Cela permet une meilleure clarté du code et de centraliser les interactions entre les deux langages Javascript et PHP.
*/
class Router {

    private $function; // Appelle la fonction que l'on souhaite utiliser
    private $arguments = []; // Contiendra la liste des arguments de la fonction

    public function __construct($function, $arguments){
        $this->function = $function;
        $this->arguments = $arguments;
        
        if($this->function == 'setScore'){
            $this->setScore($arguments[0]);
        }
        elseif($this->function == 'getScores'){
            $this->getScores();
        }
    }

    public function setScore($time){
        $score = new Score();
        $score->setTime($time);

        $req = $this->db->prepare('INSERT INTO score(time) VALUES(:time)');
        $req->execute(array(
            'time' => $score
        ));

        return 1;
    }

    public function getScores(){
        $req = $this->db->query('SELECT * FROM score ORDER BY time ASC');

        return $req->fetchAll();
    }
}