'use strict'

var addButton = document.getElementById('add');
var addNewMeal = document.getElementById('new-meal');
var addNewCalories = document.getElementById('new-calories');
var addNewDate = document.getElementById('new-date');
var itemsContainer = document.querySelector('.items-container');
var filter = document.getElementById('date-filter');
var url = 'http://localhost:3000/meals';
document.getElementById('new-date').valueAsDate = new Date();
addButton.addEventListener('click', callAddNewItem);
filter.addEventListener('select', callItemFilter);

function callAddNewItem() {
  if (addNewMeal.value !== '' && addNewCalories.value !== '') {
    addNewItem(addNewMeal.value, addNewCalories.value, addNewDate.value);
  }
  setTimeout(createRequest(displayItems),600);
  clearInputFields();
}

function callItemFilter() {

}

function clearItemsFromDisplay() {
  while (itemsContainer.firstChild) {
    itemsContainer.removeChild(itemsContainer.firstChild);
  }
}

function clearInputFields() {
  addNewMeal.value = '';
  addNewCalories.value = '';
}

function createRequest(cb) {
  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      displayItems(request.response);
    }
  }
}

function displayItems(response) {
  clearItemsFromDisplay();
  var itemsArray = JSON.parse(response);

  itemsArray.forEach(function(item) {
    var newItem = document.createElement('div');
    var newMeal = document.createElement('span');
    var newCalories = document.createElement('span');
    var newDate = document.createElement('span');
    newItem.setAttribute('id', item.id);
    newItem.setAttribute('class', 'item-row');
    itemsContainer.appendChild(newItem);
    newItem.addEventListener('click', function() {
      console.log(event.target);
    });
    newItem.appendChild(newMeal);
    newItem.appendChild(newCalories);
    newItem.appendChild(newDate);
    newMeal.innerText = item.meal;
    newCalories.innerText = item.calories;
    newDate.innerText = (new Date(item.date)).toLocaleDateString('hu-HU');
  });
}

function addNewItem (meal, calories, date) {
  var request = new  XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({meal: meal, calories: calories, date: date}));
}

createRequest("2016-01-24", displayItems);
