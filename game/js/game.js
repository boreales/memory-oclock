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
    let id = $(this).attr('data-id');
    $(this).attr('src', 'img/'+id+'.jpg');
    if(cardsVisible.length > 0){
        //setTimeout(checkCards(cardsVisible[0], id), 5000);
        interval = setInterval(checkCards, 500, cardsVisible[0], id);
    }
    else{
        cardsVisible.push(id);
        console.log("Premier clic",cardsVisible);
    }
});

function initialize(){
    let cards = [
        {id: 1, src: './img/1.jpg'},
        {id: 2, src: './img/2.jpg'},
        {id: 3, src: './img/3.jpg'},
        {id: 4, src: './img/4.jpg'},
        {id: 5, src: './img/5.jpg'},
        {id: 6, src: './img/6.jpg'},
        {id: 7, src: './img/7.jpg'},
    ];
    let cardsArray = cards.reduce(function (res, current) {
        return res.concat([current, current]);
    }, []);
    cardsArray.sort(() => 0.5 - Math.random());
    console.log(cardsArray);

    for(let i = 0; i < cardsArray.length; i++){
        $('.game-board-inner').append('<img class="card" src="img/card-back.jpg" data-id="' + cardsArray[i].id + '">');
    }
    $('.inner-container').show();
    $('.intro').hide();
    countDownTimer();
}

function countDownTimer() {
    // Nous selectionnons la dive qui contiendra notre bar de temps avec un .querySelector() en spécifiant sa class="memory__game-bar"
    const timeLimit = "180s";

    // Puis nous injectons au sein de sa class CSS la durée toatle de l'animation. Dans notre cas, 180 secondes.
    $('.game-bar-timer').css('animation-duration', timeLimit);

    // .setInterval() nous permet de répéter du code avec un intervale régulier en milisecondes.
    this.setInterval(() => {
        // Notre variable "timeLeft" déclarée en haut de notre script, verra sa valeur décrémenter de 1 toutes les secondes.
        timeLeft -= 1;

        // LA CONDITION //

        // SI notre variable timeLeft vient à être égale à 0, et que le joueur n'a pas terminé le plateau de jeu, alors la partie sera terminée, et il aura perdu.
        // Nous executons donc une alerte afin de le prévenir.
        if (timeLeft === 0) {
            // Message signant la fin de partie perdante
            alert("Malheureusement votre mémoire semble saturée ... (Vous avez perdu !)");

            // Nous rafraichissons la page afin que l'utilisateur reccommence une partie.
            window.location.reload();
        }
    }, 1000);
}


function checkCards(first, second){
    console.log('Check',first + second);
    if(first == second){
        cardsWon.push(first);
        if(cardsWon.length == 7){
            alert('Bravo, vous avez une superbe mémoire interne dans votre tête !');
            let time = 180 - timeLeft;
            console.log('Temps total', time);
            saveScore(time);
            window.location.reload();
        }
        console.log('Gagnées',cardsWon);
        cardsVisible = [];
    }
    else{
        console.log('Perdu', first + ' ' + second);
        cardsVisible = [];
        $('[data-id='+first+']').attr('src', 'img/card-back.jpg');
        $('[data-id='+second+']').attr('src', 'img/card-back.jpg');
    }
    clearInterval(interval);
}