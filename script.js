
document.addEventListener('DOMContentLoaded', function () {

    // holds the cards
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

    // ensures the cards are randomized
    shuffledCards = cardsArray.sort(() => (Math.random() > .5 ? 1 : -1));

    // creates the game board
    const gameBoard = document.querySelector('.gameArea');

    // creates the score
    const score = document.querySelector('.score');

    // restart button
    const restart = document.querySelector('.restart');

    // restarts the game
    restart.addEventListener('click', () => {
        window.location.reload();
    });

    let chosenCards = []; // stores the chosen cards
    let chosenCardsId = [];// stores the id of the chosen cards
    let cardsWon = [];// stores the cards that have been found

    const startTime = Date.now(); // in milliseconds

    // creates the game board
    function createBoard() {
        cardsArray.forEach((_, index) => {
            const card = document.createElement('div'); // creates the card
            card.classList.add('card'); // adds the 'card' class to the card
            card.setAttribute('data-id', index); // sets the 'data-id' attribute to the card
            card.addEventListener('click', flipCard);// adds the 'click' event listener to the card

            const innerCard = document.createElement('div');// creates the inner card
            innerCard.classList.add('innerCard');// adds the 'innerCard' class to the inner card

            const frontCard = document.createElement('div');// creates the front card
            frontCard.classList.add('frontCard');// adds the 'frontCard' class to the front card
            frontCard.textContent = cardsArray[index].img; // sets the image of the front card

            const backCard = document.createElement('div'); // creates the back card
            backCard.classList.add('backCard');// adds the 'backCard' class to the back card
            backCard.textContent = '♟️';// sets the image of the back card


            card.appendChild(innerCard); // adds the inner card to the card
            innerCard.appendChild(frontCard); // adds the front card to the inner card
            innerCard.appendChild(backCard); // adds the back card to the inner card

            gameBoard.appendChild(card); // adds the card to the game board
        });
    }
    
    // flips the card
    function flipCard() {
        const cardId = this.getAttribute('data-id'); // gets the id of the clicked card
        chosenCards.push(cardsArray[cardId].name); // adds the name of the card to the chosenCards array
        chosenCardsId.push(cardId); // adds the id of the card to the chosenCardsId array
        this.classList.add('flip'); // adds the 'flip' class to the clicked card

        // if two cards are chosen, check for match
        if (chosenCards.length === 2) {
            setTimeout(checkForMatch, 500);
        }
    }

    // checks for a match
function checkForMatch() {
        const cards = document.querySelectorAll('.card'); // gets all the cards
        const [optionOneId, optionTwoId] = chosenCardsId; // gets the id of the chosen cards

        // if two cards are chosen and match, remove the 'flip' class from both cards
        if (chosenCards[0] === chosenCards[1] && optionOneId !== optionTwoId) {
            cards[optionOneId].removeEventListener('click', flipCard);
            cards[optionTwoId].removeEventListener('click', flipCard);
            cardsWon.push(chosenCards);
        } else {

            // if two cards are chosen and don't match, remove the 'flip' class from both cards
            cards[optionOneId].classList.remove('flip');
            cards[optionTwoId].classList.remove('flip');
        }

        // resets the chosenCards and chosenCardsId arrays
        chosenCards = [];
        chosenCardsId = [];

        // if cardsWon length is equal to cardsArray length / 2, display the score in rounded format
        if (cardsWon.length === cardsArray.length / 2) {
            const endTime = Date.now(); // in milliseconds
            const elapsedTime = (endTime - startTime) / 1000; // in seconds
            const scores = calculateScore(elapsedTime); // calculates the score

            // displays the score in rounded format
            score.textContent = `Your score is ${Math.floor(scores)}`;
        }
    }

    // calculates the score
    function calculateScore(time) {
        const maxTime = 300; // maximum time allowed in seconds
        if (time > maxTime){

            // if time exceeds the maximum time, return 0
            return 0;
        } 
        // return the score as a percentage of the maximum time
        return Math.max(0, 1000 - (time / maxTime) * 1000);
    }

    createBoard(); // creates the game board
});