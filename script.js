
document.addEventListener('DOMContentLoaded', function () {
    const cardsArray = [
        { name: 'emoji1', img: '😊' },
        { name: 'emoji1', img: '😊' },
        { name: 'emoji2', img: '🚀' },
        { name: 'emoji2', img: '🚀' },
        { name: 'emoji3', img: '🐶' },
        { name: 'emoji3', img: '🐶' },
        { name: 'emoji4', img: '🍕' },
        { name: 'emoji4', img: '🍕' },
        { name: 'emoji5', img: '🎉' },
        { name: 'emoji5', img: '🎉' },
        { name: 'emoji6', img: '🌟' },
        { name: 'emoji6', img: '🌟' },
        { name: 'emoji7', img: '🏖️' },
        { name: 'emoji7', img: '🏖️' },
        { name: 'emoji8', img: '📚' },
        { name: 'emoji8', img: '📚' }
    ];

    shuffledCards = cardsArray.sort(() => (Math.random() > .5 ? 1 : -1));

    const gameBoard = document.querySelector('.gameArea');
    const score = document.querySelector('.score');
    const restart = document.querySelector('.restart');

    restart.addEventListener('click', () => {
        window.location.reload();
    });

    let chosenCards = [];
    let chosenCardsId = [];
    let cardsWon = [];

    const startTime = Date.now();

    function createBoard() {
        cardsArray.forEach((_, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.setAttribute('data-id', index);
            card.addEventListener('click', flipCard);

            const innerCard = document.createElement('div');
            innerCard.classList.add('innerCard');

            const frontCard = document.createElement('div');
            frontCard.classList.add('frontCard');
            frontCard.textContent = cardsArray[index].img;

            const backCard = document.createElement('div');
            backCard.classList.add('backCard');
            backCard.textContent = '♟️';


            card.appendChild(innerCard);
            innerCard.appendChild(frontCard);
            innerCard.appendChild(backCard);

            gameBoard.appendChild(card);
        });
    }
    

    function flipCard() {
        const cardId = this.getAttribute('data-id');
        chosenCards.push(cardsArray[cardId].name);
        chosenCardsId.push(cardId);
        this.classList.add('flip');
        if (chosenCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

function checkForMatch() {
        const cards = document.querySelectorAll('.card');
        const [optionOneId, optionTwoId] = chosenCardsId;
        if (chosenCards[0] === chosenCards[1] && optionOneId !== optionTwoId) {
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(chosenCards);
        } else {
            cards[optionOneId].classList.remove('flip');
            cards[optionTwoId].classList.remove('flip');
        }
        chosenCards = [];
        chosenCardsId = [];
        if (cardsWon.length === cardsArray.length / 2) {
            // alert('Congratulations! You found them all!');
            const endTime = Date.now();
            const elapsedTime = (endTime - startTime) / 1000; // in seconds
            const scores = calculateScore(elapsedTime);
            score.textContent = `Your score is ${Math.floor(scores)}`;
            //alert(`Congratulations! You found them all! Your score is ${scores}.`);
        }
    }


    function calculateScore(time) {
        const maxTime = 300;
        if (time > maxTime){
            return 0;
        } 
        return Math.max(0, 1000 - (time / maxTime) * 1000);
    }

    createBoard();
});