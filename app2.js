'use strict';

// *** Global Variables *** //

// Image Objects Array
var allImages = [];

// Image Objects.name Array
var imageNames = [];

// Individual Result Arrays
var timesShownData = [];
var timesClickedData = [];
var clickPercentagesData = [];

// Unique Survey Results Array
var surveyData = [timesShownData,timesClickedData,clickPercentagesData];

// JSON Data
var localInfo = [];

// Survey Counters
var attempts = 25;
var votes = 0;

// Chart Color Schemes
var colors = ['rgba(251, 255, 0, 0.2)','rgba(255, 60, 0, 0.2)','rgba(21, 255, 0, 0.2)','rgba(0, 38, 255, 0.2)','rgba(225, 0, 255, 0.2)'];
var borderColors = ['rgba(251, 255, 0, 1)','rgba(255, 60, 0, 1)','rgba(21, 255, 0, 1)','rgba(0, 38, 255, 1)','rgba(225, 0, 255, 1)'];
var dataColors = [];
var dataBorderColors = [];

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

// Finding and setting specific DOM Elements
var chartContainer = document.getElementById('chartContainer');
var hiddenTempDiv = document.getElementById('temp');
chartContainer.style.display = 'none';
hiddenTempDiv.style.display = 'block';

// Identifying DOM Image Locations
var image1 = document.getElementById('image1')
var image2 = document.getElementById('image2')
var image3 = document.getElementById('image3')

// Placeholder Images
var oldImage1 = image1;
var oldImage2 = image2;
var oldImage3 = image3;

// *** Global Functions *** //

// Toggles CSS Display Styles between Block and None
function toggleDisplay(targetElement) {
  if (targetElement.style.display === 'none') {
    targetElement.style.display = 'block';
  } else {
    targetElement.style.display = 'none';
  }
}

// Safely Chooses 3 Brand New Images 
function chooseNewImage() {
  var i = Math.floor(Math.random() * allImages.length)
  while (
    allImages[i].name === image1.name ||
    allImages[i].name === image2.name ||
    allImages[i].name === image3.name ||
    allImages[i].name === oldImage1.name ||
    allImages[i].name === oldImage2.name ||
    allImages[i].name === oldImage3.name
    // Checking against an OldImage3 would be redundant
  ) {
    i = Math.floor(Math.random() * allImages.length)
  }
  return allImages[i];
}

// Puts Images onto the Page
function renderImages() {

  var newImage1 = chooseNewImage();
  image1.src = newImage1.path;
  image1.name = newImage1.name;
  newImage1.timesShown++;

  var newImage2 = chooseNewImage();
  image2.src = newImage2.path;
  image2.name = newImage2.name;
  newImage2.timesShown++;

  var newImage3 = chooseNewImage();
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
  if (votes < attempts) {
    for (var i = 0; i < allImages.length; i++) {
      if (e.target.name === allImages[i].name) {
        allImages[i].timesClicked++;
      }
    }
    renderImages();
  }
  votes++;
  if (votes === attempts) {
    displayResults();
    toggleDisplay(hiddenTempDiv);
    toggleDisplay(chartContainer);
    renderChart(clickPercentagesData);
    addToLocalData();
    image1.removeEventListener('click', handleClick);
    image2.removeEventListener('click', handleClick);
    image3.removeEventListener('click', handleClick);
  }
}

// Prepares the Chart Arrays
function fillChartPrereqArrays () {
  for (var i = 0; i < allImages.length; i++) {
    timesShownData.push(allImages[i].timesShown);
    timesClickedData.push(allImages[i].timesClicked)
    imageNames.push(allImages[i].name);
    clickPercentagesData.push(Math.floor(allImages[i].timesClicked * 100 / allImages[i].timesShown));
    dataColors.push(colors[i % (colors.length - 0)]);
    dataBorderColors.push(borderColors[i % (borderColors.length - 0)]);
  }
}
// Draws a New Chart
function renderChart(dataArray) {
  fillChartPrereqArrays();
  var canvas = document.getElementById('chart');
  canvas.innerHTML = 'null';
  var ctx = canvas.getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: imageNames,
      datasets: [{
        label: 'Percentage of Votes per Times Shown',
        data: dataArray,
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

// *** JSON Utility *** //

// Grab Local Storage Info (if there is any)
function grabLocalData() {
  if(localStorage.length > 0) {
    for (var i = 0; i < localStorage.length; i++) {
      localInfo.push(JSON.parse(localStorage.getItem(Object.keys(localStorage)[i])))
    }
  }
}

// Add Survey Results to Local Storage
function addToLocalData() {
  var keyName = "survey" + (Object.keys(localStorage).length + 1);
  localStorage.setItem(keyName, JSON.stringify(surveyData));
}



// *** Master Functions *** //

//Running the Page
function controlPage() {
  grabLocalData();
  renderImages();
  
  // Event Listeners
  image1.addEventListener('click', handleClick);
  image2.addEventListener('click', handleClick);
  image3.addEventListener('click', handleClick);
  
}






//Calling the main Function
controlPage();
