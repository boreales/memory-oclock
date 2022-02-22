let cardsVisible = [];
let cardsWon = [];
let timeLeft = 180;
let interval;

/*
Grâce au selecteur $ de jQuery on se place sur le document c'est-à-dire notre page. 
Avec l'événement ready, dès que la page est chargée, on se prépare à écouter les événements qui vont se produire.
Oui ready, ça veut dire que la page est prête. Et vous ? Aussi ? Alors voyons comment lancer le jeu.
*/
$(document).ready(function(){
    /*
    Ici on écoute l'évenement click sur le bouton "Jouer" ayant l'id # "start-button" dans le HTML
    et lorsqu'il est actionné, on lance notre fonction initialize().
    */
    $('#start-button').click(function() {
        initialize();
    });
});

/*
Ici la subtilité avec .on vient du fait que les cartes ne sont pas existantes au chargement de la page. 
On dit qu'elles ne font pas partie du DOM (Document Object Model), une interface créée automatiquement 
par le navigateur lors du chargement d’une page HTML. 
.on crée donc un nouveau listener qui va écouter le click sur les cartes ayant la classe .card.
Cet événement click fonctionnant de la même manière que celui utilisé précédemment sur le bouton "Jouer".
*/
$(document).on('click', '.card', function() {
    /*
    On change la classe CSS de la carte pour qu'elle ne soit plus cliquable via la classe .card utilisée ici.
    addClass() permet d'ajouter une classe à un élément.
    removeClass() permet de supprimer une classe d'un élément.
    */
    $(this).addClass('flipped').removeClass('card');
    /*
    On récupère l'id de la carte cliquée par son attribut data-id.
    */
    let id = $(this).attr('data-id');
    /*
    On affiche la face cachée de la carte cliquée en changeant l'attribut src de la balise HTML img.
    On récupère alors le fichier image correspondant à l'id de la carte cliquée.
    Les photos que l'on souhaite afficher sont disponibles dans notre dossier img.
    */
    $(this).attr('src', 'img/'+id+'.jpg');
    /*
    On récupère la longueur du tableau de cartes visible grâce à length.
    Si elle est supérieure à 0 c'est qu'il y a déjà une carte visible sur le jeu.
    Dans ce cas, on compare alors les deux cartes désormais visibles grâce à notre fonction checkCards().
    */
    if(cardsVisible.length > 0){
        /*
        Avec la fonction native de Javascript setInterval, 
        on prévoit d'attendre 5s avant de comparer les cartes 
        pour montrer la face visible au joueur même s'il perd.
        setInterval permet d'ajouter un délai entre chaque exécution d'une fonction.
        Dans notre cas checkCards() sera exécutée qu'une seule fois car elle vide elle-même le tableau de cartes visible.
        */
        interval = setInterval(checkCards, 500, cardsVisible[0], id);
    }
    else{
        /*
        Si c'est la première carte que l'on clique alors on l'ajoute à notre tableau de cartes visibles
        via la fonction native de Javascript push() qui permet d'insérer un élément dans un tableau.
        */
        cardsVisible.push(id);
    }
});

function initialize(){
    /*
    Ici on initialise le plateau de jeu avec toutes les images différentes de nos cartes 
    en les plaçant dans un tableau
    */
    let cards = [
        {id: 1, src: './img/1.jpg'},
        {id: 2, src: './img/2.jpg'},
        {id: 3, src: './img/3.jpg'},
        {id: 4, src: './img/4.jpg'},
        {id: 5, src: './img/5.jpg'},
        {id: 6, src: './img/6.jpg'},
        {id: 7, src: './img/7.jpg'},
    ];
    /*
    On va maintenant doubler le nombre de cartes pour créer nos paires.
    On utilise tout d'abord la fonction native de Javascript concat() pour doubler le tableau de cartes.
    concat() permet de concatener deux tableaux, c'est à dire de rajouter les éléments d'un tableau à un autre.
    Puis la fonction native de Javascript reduce() pour que l'ensemble des 14 cartes ne soit qu'un seul tableau.
    */
    let cardsArray = cards.reduce(function (res, current) {
        return res.concat([current, current]);
    }, []);
    /*
    On mélange le tableau de cartes grâce à la fonction native sort() qui permet de trier des éléments d'un tableau.
    Ici le tri va se baser sur un nombre aléatoire défini par la fonction Math.random 
    pour qu'elles soient classées au hasard à chaque partie.
    */
    cardsArray.sort(() => 0.5 - Math.random());
    /*
    On crée une boucle for pour parcourir toutes les cartes en fonction de la valeur length du cardsArray
    et on crée un élement html <img> pour les afficher face cachée.
    */
    for(let i = 0; i < cardsArray.length; i++){
        /*
        On donne à chaque carte un id pour pouvoir les identifier séparément ainsi qu'un data-id 
        que se partage chaque paire
        */
        $('.game-board-inner').append('<img class="card" id="'+i+'" src="img/card-back.jpg" data-id="' + cardsArray[i].id + '">');
    }
    //On affiche le tableau de jeu avec les cartes et on masque le petit texte d'introduction pour plus de clarté
    $('.inner-container').show();
    $('.intro').hide();
    //On lance notre décompte de 3 minutes pour démarrer la partie
    countDownTimer();
}

function countDownTimer(){
    /*
    On définit la durée maximale du jeu et donc de notre compte à rebours (ici 180 secondes) que l'on stocke dans une
    constante.
    */
    const timeLimit = "180s";

    //On ajoute la durée de l'animation CSS de la barre du timer pour qu'il arrive à la fin au bout des 180 secondes
    $('.game-bar-timer').css('animation-duration', timeLimit);

    /*
    Cette fonction va permettre de "faire avancer" la barre du timer en répétant l'animation CSS avec 1 seconde 
    de moins à chaque passage
    */
    this.setInterval(() => {
        //On décrémente également en toute logique la valeur de notre timeLeft de 1 seconde à chaque passage
        timeLeft -= 1;

        /*
        Ici on récupère les minutes en arrondissant avec Math.floor le temps restant divisé par 60.
        La fonction Math.floor() renvoie le plus grand entier qui est inférieur ou égal à un nombre x.
        */
        var minutes = Math.floor(timeLeft / 60);
        //Ensuite on récupère les secondes en soustrayant le temps restant au nombre de minutes multiplié par 60.
        var seconds = timeLeft - minutes * 60;
        //Si jamais le nombre de secondes est inférieur à 10, on ajoute un 0 devant pour un meilleur affichage
        if(seconds < 10){
            seconds = "0" + seconds;
        }
        /*
        Le temps total étant de 3 minutes on ajoute de toute façon un 0 devant l'unité des minutes.
        Puis on affiche ce temps restant au bon format dans le HTML grâce à la fonction text() 
        qui permet de modifier le texte d'un élément.
        */
        $('.game-timer-text').text('0'+minutes + ":" + seconds);

        //Si le temps est écoulé et donc égal à 0, le joueur a perdu
        if(timeLeft === 0){
            //On affiche une alerte pour prévenir le joueur qu'il manque de mémoire
            alert("Malheureusement votre mémoire semble saturée ... (Vous avez perdu !)");

            //On rafraîchit la page afin que le joueur recommence une partie.
            window.location.reload();
        }
    }, 1000);
}

function checkCards(first, second){
    //On vérifie si le premier id de la carte visible est égal à celui de la carte qu'on vient de cliquer
    if(first == second){
        /*
        Dans ce cas c'est gagné et on ajoute l'id des cartes au tableau des cartes réussies
        Toujours grâce à notre fonction push() utilisée précédemment avec les cartes visibles.
        */
        cardsWon.push(first);
        /*
        Si la longueur vérifiée par length de ce tableau des cartes réussies est égal à 7 
        c'est que toutes les cartes ont été découvertes, le joueur a gagné.
        */
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
        //On prend soin de vider le tableau des cartes visibles afin de ne pas conserver les précédents id des cartes désormais trouvées
        cardsVisible = [];
    }
    //Si les deux id sont différents c'est perdu
    else{
        //On prend soin de vider le tableau des cartes visibles afin de ne pas conserver les précédents id des cartes désormais trouvées
        cardsVisible = [];
        //On retourne de nouveau les cartes en affichant l'image servant pour le dos de chacune
        $('[data-id='+first+']').attr('src', 'img/card-back.jpg');
        $('[data-id='+second+']').attr('src', 'img/card-back.jpg');
        //Puis on réactive la possibilité qu'elles soient cliquables en leur rendant la classe card
        $('[data-id='+first+']').addClass('card').removeClass('flipped');
        $('[data-id='+second+']').addClass('card').removeClass('flipped');
    }
    //On réinitialise l'intervalle de 5 secondes permettant d'afficher les 2 cartes cliquées même en cas d'erreur
    clearInterval(interval);
}