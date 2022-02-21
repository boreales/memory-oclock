<?php
// On crée une classe Score correspondant à la table Score dans la base de données

class Score{
    private $id; //On initialise l'identifiant unique de la table score pour la base de données
    private $timer; //On crée une variable pour le temps du joueur

    // On crée une fonction pour récupérer l'identifiant unique de la table score
    public function getId(){
        return $this->id;
    }

    // On crée une fonction pour récupérer le temps du joueur
    public function getTimer(){
        return $this->timer;
    }

    // On crée une fonction pour enregistrer le temps du joueur dans la base de données
    public function setTimer($timer){
        $this->timer = $timer;
    }
}