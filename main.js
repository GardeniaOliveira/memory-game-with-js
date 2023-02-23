const timer = document.querySelector('#timer');
const btnRestart = document.querySelector('#btn-restart');
const cardContainer = document.querySelector('.card-container');
const timeModal = document.querySelector('.time-modal');
const modal = document.querySelector('.modal');
let firstCard = "";
let secondCard = "";
let sec = 0;
let min = 0;
let hour = 0;
let chron;
let isGameStart = false;
let isMatch = false;
let counterMatch = 0;
const images = [
    "img01", "img02", "img03", "img04", "img05", "img06"
];
ImagesDuplicate = images.reduce((newArray, element) => {
    newArray.push(element);
    newArray.push(element);

    return newArray;
}, []);
console.log(ImagesDuplicate);
const randomImages = sortImages(ImagesDuplicate);

const showImages = () => {
    debugger
    const divCards = document.querySelectorAll('.card');
    const imgCardsFront = document.querySelectorAll('.card .front');

    divCards.forEach((div) => {
        div.addEventListener('click', () => {
            div.classList.add('turn');
            setTimeout(() => {
                div.classList.remove('turn');
            }, 1000)
            // turnRandomImages(div);
            // if clicked the game is not starting, so call startChronometer and start the game with true.this stop in the first click and don't enter in another cards because the game is already true (started);
            if (!isGameStart) {
                startChronometer();
                isGameStart = true;
            }

        });

    })
    imgCardsFront.forEach((img, index) => {
        img.src = `img/${randomImages[index]}.png`;
    })

    console.log(imgCardsFront)
}
// setTimeout(turnRandomImages, 1000);
function createCard() {
    const card = document.createElement('div');
    const cardFront = document.createElement('img');
    const cardBack = document.createElement('img');

    card.className = 'card';
    cardFront.className = 'face front';
    cardBack.className = 'face back';

    cardBack.src = 'img/card-back.png'


    card.appendChild(cardFront);
    card.appendChild(cardBack);

    return card;
}

function sortImages(ImagesDuplicate) {
    for (let i = ImagesDuplicate.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ImagesDuplicate[i], ImagesDuplicate[j]] = [ImagesDuplicate[j], ImagesDuplicate[i]];
    }
    return ImagesDuplicate;
}

const loadGame = () => {
    ImagesDuplicate.forEach(() => {
        const card = createCard();
        cardContainer.appendChild(card);



    })
    showImages();
};

loadGame()




// function matchImages(img) {

//     if (!firstCard) {
//         firstCard = img.src;
//         setTimeout(() => {
//             img.setAttribute('src', 'img/card-back.png');

//         }, 1000)
//         return false;

//     }
//     secondCard = img.src;

//     if (firstCard !== secondCard) {
//         setTimeout(() => {
//             img.setAttribute('src', 'img/card-back.png');
//         }, 1000)
//         firstCard = "";
//         secondCard = "";


//     } else if (firstCard === secondCard) {
//         console.log('test', firstCard, secondCard)
//         isMatch = true;
//         counterMatch = counterMatch + 1;
//         console.log(counterMatch)
//         if (counterMatch === ImagesDuplicate.length) {
//             alert('finished');
//             pauseChronometer()

//         }
//     }

//     console.log(firstCard)
//     console.log(secondCard)

// }


function startChronometer() {
    chron = setInterval(() => { tick(); }, 1000);
}
function pauseChronometer() {
    clearInterval(chron);
    showModal();
}
function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0
        min++;
    } else if (min >= 60) {
        min = 0;
        hour++;
    }
    const format = (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
    timer.innerText = `Time: ${format}`;
    timeModal.innerText = format;


}

function clearChronometer() {
    clearInterval(chron);
    timer.innerText = `Time: 00:00:00`;
    sec = 0;
    min = 0;
    hour = 0;

}

function showModal() {
    modal.classList.remove('hidden-modal');
    btnRestart.addEventListener("click", () => {

        clearChronometer();
        window.location.reload();
    });

}


