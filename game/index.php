<?php

// On importe le fichier functions pour pouvoir récupérer les scores et enregistrer les prochains
require('php/functions.php');

?>

<!DOCTYPE html>
<title>Memory</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="./css/main.css" rel="stylesheet">

<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="./js/functions.js"></script>
<script src="./js/game.js"></script>

<body>
    <div class="container">
        <h1>Cartes Mémoire</h1>
        <h2>Le jeu où il faut se souvenir des cartes</h2>
        <div class="intro">
            <p>Vous imaginez si encore aujourd'hui on avait gardé des cartes mémoires pour tout ? Un genre de "rétro-futur des années 80 cyberpunk" ? </p>
            <p>Recharger un iPhone en cartouches de mégaoctets en plus de sa batterie. </p>
            <p>Et démarrer une Tesla avec une disquette. </p>
            <p>Ah ça fait rêver non ? Non ? Ok ... 😅</p>
        </div>
        <div class="best-scores">
            <h3>Meilleurs scores</h3>
            <?php
            // On récupère les scores
            $scores = getScores();
            // On affiche les scores
            foreach($scores as $score) {
                echo '<p>#'.$score['id']. ' - ' . $score['timer'] . '</p>';
            }
            if(sizeof($scores) === 0) {
                echo '<p>Aucun score enregistré</p>';
            }
            ?>
        </div>
        <button id="start-button" class="btn btn-primary">Jouer</button>
        <!-- <button id="test-save" class="btn btn-primary">Test Save</button> -->
        <div class="inner-container">
            <div class="game-container">
                <div class="game-container-inner">
                    <div class="game-board">
                        <div class="game-board-inner">
                        </div>
                    </div>
                </div>
                <div class="game-progress-bar-timer">
                    <div class="game-bar-timer"></div>
                </div>
            </div>
        </div>
    </div>
</body>