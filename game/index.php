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
<script src="./js/game.js"></script>

<body>
    <div class="container">
        <h1>Memory</h1>
        <button id="start-button" class="btn btn-primary">Start</button>
        <button id="test-save" class="btn btn-primary">Test Save</button>
        <div class="inner-container">
            <div class="game-container">
                <div class="game-container-inner">
                    <div class="game-board">
                        <div class="game-board-inner">
                            <div class="game-card">
                                <div class="game-card-inner">
                                    <div class="game-card-front">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                    <div class="game-card-back">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="game-card">
                                <div class="game-card-inner">
                                    <div class="game-card-front">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                    <div class="game-card-back">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="game-card">
                                <div class="game-card-inner">
                                    <div class="game-card-front">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                    <div class="game-card-back">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="game-card">
                                <div class="game-card-inner">
                                    <div class="game-card-front">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                    <div class="game-card-back">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="game-card">
                                <div class="game-card-inner">
                                    <div class="game-card-front">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                    <div class="game-card-back">
                                        <img src="img/card-back.png" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>