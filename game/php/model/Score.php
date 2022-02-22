<?php
// On crée une classe Score correspondant à la table Score dans la base de données

class Score{
    public $timer; //On crée une variable pour le temps du joueur

    public function __construct($timer) {
        $this->timer = $timer;
    }
}