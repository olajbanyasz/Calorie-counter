'use strict'

var itemsArray;
var caloriesSum;
var selectedItemsArray =  [];
var addButton = document.getElementById('add');
var addNewMeal = document.getElementById('new-meal');
var addNewCalories = document.getElementById('new-calories');
var addNewDate = document.getElementById('new-date');
var summary = document.getElementById('summary');
var itemsContainer = document.querySelector('.items-container');
var dateFilter = document.getElementById('date-filter');
var url = 'http://localhost:3000/meals';
document.getElementById('new-date').valueAsDate = new Date();
addButton.addEventListener('click', callAddNewItem);
dateFilter.addEventListener('input', mealFilter);

function callAddNewItem() {
  if (addNewMeal.value !== '' && addNewCalories.value !== '') {
    addNewItem(addNewMeal.value.toUpperCase(), Math.abs(parseInt(addNewCalories.value)), addNewDate.value);
  }
  dateFilter.valueAsDate = null;
  summary.innerText = 0 + ' kcal';
  setTimeout(createRequest(displayItems),600);
  clearInputFields();
}

function mealFilter() {
  selectedItemsArray.length = 0;
  caloriesSum = 0;
  itemsArray.forEach(function(item) {
    if((new Date(item.date)).toLocaleDateString('hu-HU') === (new Date(event.target.value)).toLocaleDateString('hu-HU')) {
      selectedItemsArray.push(item);
      caloriesSum += item.calories;
      }
  });
  displayItems(selectedItemsArray);
  if (caloriesSum !== 0) {
    animatedCounter('summary', 0, caloriesSum, 120);
  } else {
    summary.innerText = caloriesSum + ' kcal';
  }
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
      itemsArray = JSON.parse(request.response);
      displayItems(itemsArray);
    }
  }
}

function createNewRow(item) {
  var newRow = document.createElement('div');
  newRow.setAttribute('id', item.id);
  newRow.setAttribute('class', 'item-row');
  itemsContainer.appendChild(newRow);
  newRow.addEventListener('dblclick', callDeleteItem);
  createSpans(newRow, item);
}

function createSpan(newRow, text, item, itemattribute) {
  var newspan = document.createElement('span');
  newRow.appendChild(newspan);
  newspan.innerText = item[itemattribute] + text;
}

function createSpans(newRow, item) {
  item.date = (new Date(item.date)).toLocaleDateString('hu-HU');
  createSpan(newRow, '', item, 'meal');
  createSpan(newRow, ' kcal', item, 'calories');
  createSpan(newRow, '', item, 'date');
}

function displayItems(itemsArray) {
  clearItemsFromDisplay();
  itemsArray.forEach(function(item) {
    createNewRow(item);
  });
}

function callDeleteItem() {
  deleteItem(event.target.parentNode.id);
}

function deleteItem(itemId) {
  var request = new  XMLHttpRequest();
  request.open('DELETE', url + '/' + itemId);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      createRequest(displayItems);
      summary.innerText = 0 + ' kcal';
    }
  }
  console.log(request);
}

function addNewItem (meal, calories, date) {
  var request = new  XMLHttpRequest();
  request.open('POST', url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(JSON.stringify({meal: meal, calories: calories, date: date}));
}

createRequest(displayItems);
