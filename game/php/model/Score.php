<?php
// On crée une classe Score correspondant à la table Score dans la base de données

class Score{
    public $timer; //On crée une propriété pour le temps du joueur

    /*
    Dans notre constructeur de classe on définit que la propriété timer de l'objet Score
    aura la valeur $timer qui lui sera donnée lors de sa création.
    */
    public function __construct($timer) {
        $this->timer = $timer;
    }
}