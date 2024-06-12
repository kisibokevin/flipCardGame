
document.addEventListener('DOMContentLoaded', function () {
    const emojiCards = [
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

    let shuffledCards = emojiCards.sort(() => (Math.random() > .5 ? 1 : -1));

    function loadCards() {
        const gameArea = document.querySelector('.gameArea');
        shuffledCards.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.name = item.name;
            card.innerHTML = `<img src="images/${item.img}.png" alt="${item.img}">`;
            gameArea.appendChild(card);
        });
    }

    loadCards()
});