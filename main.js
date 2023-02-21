const timer = document.querySelector('#timer');
const btnRestart = document.querySelector('#btn-restart');
const cardImages = document.querySelectorAll('.animals-img');
const img01 = document.querySelector('#animal-01');
const img02 = document.querySelector('#animal-02');
const img03 = document.querySelector('#animal-03');
const img04 = document.querySelector('#animal-04');
const img05 = document.querySelector('#animal-05');
const img06 = document.querySelector('#animal-06');
let firstCard = "";
let secondCard = "";
let sec = 0;
let min = 0;
let hour = 0;
let chron;
let isGameStart = false;
let isMatch = false;
let counterMatch = 0;

const imgBack = "img/card-back.png"
const images = [
    "img01", "img02", "img03", "img04", "img05", "img06"
];
ImagesDuplicate = images.reduce((newArray, element) => {
    newArray.push(element);
    newArray.push(element);

    return newArray;
}, []);

window.onload = function changeImages() {
    cardImages.forEach((img) => {
        img.setAttribute('src', 'img/card-back.png');

    })
}
function sortImages(ImagesDuplicate) {
    for (let i = ImagesDuplicate.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ImagesDuplicate[i], ImagesDuplicate[j]] = [ImagesDuplicate[j], ImagesDuplicate[i]];
    }
    return ImagesDuplicate;
}

function matchImages(img) {

    if (!firstCard) {
        firstCard = img.src;
        setTimeout(() => {
            img.setAttribute('src', 'img/card-back.png');

        }, 1000)
        return false;

    }
    secondCard = img.src;

    if (firstCard !== secondCard) {
        setTimeout(() => {
            img.setAttribute('src', 'img/card-back.png');
            // img.classList.add('transition');
        }, 1000)
        firstCard = "";
        secondCard = img.src;


    }
    //else if (firstCard === secondCard) {
    //     isMatch = true;
    //     counterMatch = counterMatch + 1;
    //     console.log(counterMatch)
    //     if (counterMatch === ImagesDuplicate.length) {
    //         alert('finished');
    //         pauseChronometer()

    //     }
    // }

    // console.log(firstCard)
    // console.log(secondCard)

}


const randomImages = sortImages(ImagesDuplicate);
function showImages() {
    cardImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            img.setAttribute('src', `img/${randomImages[index]}.png`);

            //if clicked the game is not starting, so call startChronometer and start the game with true. this stop in the first click and don't enter in another cards because the game is already true (started);
            if (!isGameStart) {
                startChronometer();
                isGameStart = true;
            }
            matchImages(img);
            if (firstCard === secondCard) {
                isMatch = true;
                counterMatch = counterMatch + 1;
                console.log(counterMatch)
                if (counterMatch === ImagesDuplicate.length) {
                    alert('finished');
                    pauseChronometer()

                }
            }

            console.log(firstCard)
            console.log(secondCard)
        })

    })
}
showImages()

function tick() {

    sec++;
    if (sec >= 60) {
        sec = 0
        min++;
    } else if (min >= 60) {
        min = 0;
        hour++;
    }
}

function startChronometer() {
    tick()

    const format = (hour < 10 ? '0' + hour : hour) + ':' + (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
    timer.innerText = `Time: ${format}`;
    incrementChronometer()
}

function incrementChronometer() {
    let chron = setTimeout(startChronometer, 1000);
}

function pauseChronometer() {
    let chron = setInterval(() => { tick(); }, 1000);
    clearInterval(chron);
}


// function clearChronometer(chron) {
//     clearInterval(chron);
//     timer.innerText = `Time: 00:00:00`;
//     let sec = 0;
//     let min = 0;
//     let hour = 0;

// }

btnRestart.addEventListener("click", () => {

    pauseChronometer();
    console.log('passou aqui')
});