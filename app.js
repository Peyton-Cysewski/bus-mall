'use strict';

var allImages = [];
var attempts = 25;
var timesClicked = 0;

function Image(name, path) {
  this.name = name;
  this.path = path;
  this.timesShown = 0;
  this.timesClicked = 0;
  this.percentClicked = (this.timesClicked)/ (this.timesShown) * 100;
  allImages.push(this);
}

new Image('bag.jpg','img/bag.jpg')
new Image('banana.jpg','img/banana.jpg')
new Image('bathroom.jpg','img/bathroom.jpg')
new Image('boots.jpg','img/boots.jpg')
new Image('breakfast.jpg','img/breakfast.jpg')
new Image('bubblegum.jpg','img/bubblegum.jpg')
new Image('chair.jpg','img/chair.jpg')
new Image('cthulhu.jpg','img/cthulhu.jpg')
new Image('dog-duck.jpg','img/dog-duck.jpg')
new Image('dragon.jpg','img/dragon.jpg')
new Image('pen.jpg','img/pen.jpg')
new Image('pet-sweep.jpg','img/pet-sweep.jpg')
new Image('scissors.jpg','img/scissors.jpg')
new Image('shark.jpg','img/shark.jpg')
new Image('sweep.png','img/sweep.png')
new Image('tauntaun.jpg','img/tauntaun.jpg')
new Image('unicorn.jpg','img/unicorn.jpg')
new Image('usb.gif','img/usb.gif')
new Image('water-can.jpg','img/water-can.jpg')
new Image('wine-glass.jpg','img/wine-glass.jpg')

var image1 = document.getElementById('image1')
var image2 = document.getElementById('image2')
var image3 = document.getElementById('image3')

function chooseImage() {
  var i = Math.floor(Math.random() * allImages.length)
  while (
    allImages[i].name === image1.name ||
    allImages[i].name === image2.name ||
    allImages[i].name === image3.name
  ) {
    i = Math.floor(Math.random() * allImages.length)
  }
  return allImages[i];
}

function renderImages() {
  var newImage1 = chooseImage();
  image1.src = newImage1.path;
  image1.name = newImage1.name;
  newImage1.timesShown++;

  var newImage2 = chooseImage();
  image2.src = newImage2.path;
  image2.name = newImage2.name;
  newImage2.timesShown++;

  var newImage3 = chooseImage();
  image3.src = newImage3.path;
  image3.name = newImage3.name;
  newImage3.timesShown++;
}
function displayResults() {
  var list = document.getElementById('resultsList');
  for (var i = 0; i < allImages.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = 'The ' + allImages[i].name + ' image was clicked ' + allImages[i].timesClicked + ' times and was shown ' + allImages[i].timesShown + ' times to get a click rate of ' + allImages[i].percentClicked + ' percent.'
    list.appendChild(listItem)
  }
}

function handleClick(e) {
  // console.log(timesClicked);
  if (timesClicked < attempts) {
    for (var i = 0; i < allImages.length; i++) {
      if (e.target.name === allImages[i].name) {
        allImages[i].timesClicked++;
        // console.log(allImages[i].timesClicked);
      }
    }
    renderImages();
  }
  timesClicked++;
  if (timesClicked === attempts) {
    displayResults();
  }
}


image1.addEventListener('click', handleClick);
image2.addEventListener('click', handleClick);
image3.addEventListener('click', handleClick);

renderImages();