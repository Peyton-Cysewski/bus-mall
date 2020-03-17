'use strict';

// Global Variables
var allImages = [];

var imageNames = [];
var clickPercentages = [];
var dataColors = [];
var dataBorderColors = [];


var attempts = 25;
var timesClicked = 0;

// Constructor Function for the Image Objects
function Image(name, path) {
  this.name = name;
  this.path = path;
  this.timesShown = 0;
  this.timesClicked = 0;
  allImages.push(this);
}

//Declaring New Image Objects
new Image('bag','img/bag.jpg')
new Image('banana','img/banana.jpg')
new Image('bathroom','img/bathroom.jpg')
new Image('boots','img/boots.jpg')
new Image('breakfast','img/breakfast.jpg')
new Image('bubblegum','img/bubblegum.jpg')
new Image('chair','img/chair.jpg')
new Image('cthulhu','img/cthulhu.jpg')
new Image('dog-duck','img/dog-duck.jpg')
new Image('dragon','img/dragon.jpg')
new Image('pen','img/pen.jpg')
new Image('pet-sweep','img/pet-sweep.jpg')
new Image('scissors','img/scissors.jpg')
new Image('shark','img/shark.jpg')
new Image('sweep','img/sweep.png')
new Image('tauntaun','img/tauntaun.jpg')
new Image('unicorn','img/unicorn.jpg')
new Image('usb','img/usb.gif')
new Image('water-can','img/water-can.jpg')
new Image('wine-glass','img/wine-glass.jpg')


//Identifying and Rendering Image Functions
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

//Displaying the Text Results
function displayResults() {
  var list = document.getElementById('resultsList');
  for (var i = 0; i < allImages.length; i++) {
    var listItem = document.createElement('li');
    listItem.textContent = allImages[i].name + ' was clicked ' + allImages[i].timesClicked + ' times and was shown ' + allImages[i].timesShown + ' times for a click rate of ' + Math.floor(allImages[i].timesClicked * 100 / allImages[i].timesShown) + '%.'
    list.appendChild(listItem)
  }
}

// Functions for Clicking the Images
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
    renderChart();
    image1.removeEventListener('click', handleClick);
    image2.removeEventListener('click', handleClick);
    image3.removeEventListener('click', handleClick);
    var chartDiv = document.getElementById('chartContainer');
    chartDiv.style.display = 'block';
    var resultsDiv = document.getElementById('temp');
    resultsDiv.style.display = 'none'
  }
}

image1.addEventListener('click', handleClick);
image2.addEventListener('click', handleClick);
image3.addEventListener('click', handleClick);

// Functions for Creating the Chart
function fillChartArrays () {
  var colors = ['rgba(251, 255, 0, 0.2)','rgba(255, 60, 0, 0.2)','rgba(21, 255, 0, 0.2)','rgba(0, 38, 255, 0.2)','rgba(225, 0, 255, 0.2)'];
  var borderColors = ['rgba(251, 255, 0, 1)','rgba(255, 60, 0, 1)','rgba(21, 255, 0, 1)','rgba(0, 38, 255, 1)','rgba(225, 0, 255, 1)'];
  for (var i = 0; i < allImages.length; i++) {
    imageNames.push(allImages[i].name);
    clickPercentages.push(Math.floor(allImages[i].timesClicked * 100 / allImages[i].timesShown));
    dataColors.push(colors[i % (colors.length - 0)]);
    dataBorderColors.push(borderColors[i % (borderColors.length - 0)]);
  }
}

function renderChart() {
  fillChartArrays();
  var canvas = document.getElementById('chart');
  var ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: imageNames,
      datasets: [{
        label: 'Percentage of Votes per Times Shown',
        data: clickPercentages,
        backgroundColor: dataColors,
        borderColor: dataBorderColors,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

//Handling the Page Display
function controlPage() {
  var chartDiv = document.getElementById('chartContainer')
  chartDiv.style.display = 'none';
  renderImages();
}






//Calling the main Function
controlPage();
