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

const imgBack = "img/card-back.png"
const images = [
    "img01", "img02", "img03", "img04", "img05", "img06"
];
ImagesDuplicate = images.reduce((newArray, element) => {
    newArray.push(element);
    newArray.push(element);

    return newArray;
}, []);
console.log(ImagesDuplicate)


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
    debugger
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
        secondCard = "";
        firstCard = "";

    }

    console.log(firstCard)
    console.log(secondCard)


}






const randomImages = sortImages(ImagesDuplicate);
function showImages() {
    cardImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            img.setAttribute('src', `img/${randomImages[index]}.png`);
            matchImages(img)

        })

    })
}
showImages()

