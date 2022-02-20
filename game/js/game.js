let cardsVisible = [];
let cardsWon = [];
let timeLeft = 180;
let interval;

$(document).ready(function(){
    $('#start-button').click(function() {
        initialize();
    });
    $('#test-save').click(function() {
        let time = Date.now();
        console.log(time);
        saveScore(time);
    });
});

$(document).on('click', '.card', function() {
    //On désactive la possibilité de cliquer sur une carte déjà visible
    $(this).addClass('flipped').removeClass('card');
    //On récupère l'id de la carte cliquée
    let id = $(this).attr('data-id');
    //On affiche la face visible de la carte cliquée
    $(this).attr('src', 'img/'+id+'.jpg');
    //S'il y a déjà une autre carte visible sur le plateau alors on compare les deux cartes 
    //grâce à notre fonction checkCards()
    if(cardsVisible.length > 0){
        //On attend 0.5s avant de comparer les cartes pour montrer la face visible au joueur même s'il perd
        interval = setInterval(checkCards, 500, cardsVisible[0], id);
    }
    else{
        //Si c'est la première carte que l'on clique alors on l'ajoute à notre tableau de cartes visibles
        cardsVisible.push(id);
        console.log("Premier clic",cardsVisible);
    }
});

$(document).on('click', '.flipped', function(e){
    e.preventDefault();
});

function initialize(){
    //Ici on initialise le plateau de jeu avec toutes les images différentes de nos cartes
    let cards = [
        {id: 1, src: './img/1.jpg'},
        {id: 2, src: './img/2.jpg'},
        {id: 3, src: './img/3.jpg'},
        {id: 4, src: './img/4.jpg'},
        {id: 5, src: './img/5.jpg'},
        {id: 6, src: './img/6.jpg'},
        {id: 7, src: './img/7.jpg'},
    ];
    //On double le nombre de cartes afin de faire deux lignes sur le plateau de jeu
    let cardsArray = cards.reduce(function (res, current) {
        return res.concat([current, current]);
    }, []);
    //On mélange le tableau de cartes pour qu'elles apparaissent aléatoirement
    cardsArray.sort(() => 0.5 - Math.random());
    //On crée une boucle pour parcourir toutes les cartes et on crée un élement html <img> pour les afficher face cachée
    for(let i = 0; i < cardsArray.length; i++){
        //On donne à chaque carte un id pour pouvoir les identifier séparément
        $('.game-board-inner').append('<img class="card" id="'+i+'" src="img/card-back.jpg" data-id="' + cardsArray[i].id + '">');
    }
    //On affiche le tableau de jeu avec les cartes et on masque le petit texte d'introduction pour plus de clarté
    $('.inner-container').show();
    $('.intro').hide();
    //On lance notre décompte de 3 minutes pour démarrer la partie
    countDownTimer();
}

function countDownTimer(){
    //On définit la durée maximale du jeu et donc de notre compte à rebours (ici 180 secondes)
    const timeLimit = "180s";

    //On ajoute la durée de l'animation de la barre du timer pour qu'il arrive à la fin au bout des 180 secondes
    $('.game-bar-timer').css('animation-duration', timeLimit);

    //Cette fonction va permettre de "faire avancer" la barre en répétant l'animation avec 1 seconde de moins à chaque passage
    this.setInterval(() => {
        //On décrémente également en toute logique la valeur de notre timeLeft de 1 seconde à chaque passage
        timeLeft -= 1;

        //Si le temps est écoulé et donc égal à 0, le joueur a perdu
        if(timeLeft === 0){
            //On affiche une alerte pour prévenir le joueur qu'il manque de mémoire
            alert("Malheureusement votre mémoire semble saturée ... (Vous avez perdu !)");

            //On rafraichît la page afin que le joueur recommence une partie.
            window.location.reload();
        }
    }, 1000);
}

function flipCard(){

}

function checkCards(first, second){
    console.log('Check', first + second);
    //On vérifie si le premier id de la carte visible est égal à celui de la carte qu'on vient de cliquer
    if(first == second){
        //Dans ce cas c'est gagné et on ajoute l'id des cartes au tableau des cartes réussies
        cardsWon.push(first);
        //Si ce tableau des cartes réussies est égal à 7 c'est que toutes les cartes ont été découvertes, le joueur a gagné
        if(cardsWon.length == 7){
            //On l'avertit donc avec une alerte comme dans le cas où il perd
            alert('Bravo, vous avez une superbe mémoire interne dans votre tête !');
            //Puis on sauvegarde le temps restant dans la base de données ce qui correspond au score du joueur
            let time = 180 - timeLeft;
            console.log('Temps total', time);
            saveScore(time);
            //On rafraichît la page afin que le joueur recommence une partie.
            window.location.reload();
        }
        console.log('Gagnées', cardsWon);
        //On prend soin de vider le tableau des cartes visibles afin de ne pas conserver les précédents id des cartes désormais trouvées
        cardsVisible = [];
    }
    //Si les deux id sont différents c'est perdu
    else{
        console.log('Perdu', first + ' ' + second);
        //On prend soin de vider le tableau des cartes visibles afin de ne pas conserver les précédents id des cartes désormais trouvées
        cardsVisible = [];
        //On retourne de nouveau les cartes en affichant l'image servant pour le dos de chacune
        $('[data-id='+first+']').attr('src', 'img/card-back.jpg');
        $('[data-id='+second+']').attr('src', 'img/card-back.jpg');
        //Puis on réactive la possibilité qu'elles soient cliquables grâce à l'événement "click"
        $('[data-id='+first+']').addClass('card').removeClass('flipped');
        $('[data-id='+second+']').addClass('card').removeClass('flipped');
    }
    //On réinitialise l'intervalle de 5 secondes permettant d'afficher les 2 cartes cliquées même en cas d'erreur
    clearInterval(interval);
}