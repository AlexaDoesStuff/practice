var totals = document.getElementById('totals');
const defaultEnergy = 15;

// Set initial values 

window.addEventListener('DOMContentLoaded', (event) => {
  localStorage.setItem('total', defaultEnergy);
  localStorage.setItem('leftover', defaultEnergy);
  totals.innerText = localStorage.getItem('leftover') + ' / ' + localStorage.getItem('total');
  if(localStorage.getItem('location') == null) {
    localStorage.setItem('location', 'eki')
  } else {
    let localLoc = localStorage.getItem('location');
  }
});

/* This sets the primary position of the application
* SPA with menus, localStorage, Promises, Grid
* And DOM manipulation
*/

var menus = document.querySelectorAll('.menu');

/* This function calculates if we have enough energy to 
* visit the stores we are choosing 
*/

function resolveEnergy(leftover, cost) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      if(subtractEnergy(leftover, cost) >= 0) {
        resolve('alrighty')
      } else {
        reject(Error('no more energy'));
      }
    }, 1000);
  })
}

const energyMeter = document.getElementById('energy-meter');

// Syntax practice for arrow functions

function subtractEnergy(leftover, cost) {
  var subtractions = leftover - cost;
  var width = subtractions / defaultEnergy;
  if(subtractions >= 0) {
    localStorage.setItem('leftover', subtractions);
    totals.innerText = localStorage.getItem('leftover') + ' / ' + localStorage.getItem('total');
    energyMeter.style.width = `${width * 100}%`;
  }
  return subtractions;
}

/*
I'm going to create a Promise link that
Checks for appropriate energy 
Runs over to the store dependent on how much energy it takes
Loads the menu loader
Then transitions to the menu
*/

const restaurants = document.querySelectorAll('.shop');
const modalText = document.getElementById('modal-contents');
const modal = document.getElementById('modal');

// console.log(restaurants);

restaurants.forEach(function(shop) {
  // Event Listener for Mouse Over
  shop.addEventListener("mouseover", function(){
    shop.classList.add('visit')
  });
  // Event Listener for Mouse Out
  shop.addEventListener("mouseout", function(){
    shop.classList.remove('visit')
  });

  /* This is a long one. Ties the modal behavior and the
  * timeouts for energy logic once clicking on the shops, 
  * and updates of the status within a modal. 
  */

  shop.addEventListener("click", function() {
    localStorage.setItem('location', shop.classList[0]);
    modal.classList.remove('hidden');

    resolveEnergy(localStorage.getItem('leftover'), 5).then((result) => {
      modalText.innerText = "Running over...";
      setTimeout(function() {
        modalText.innerText = "Checking energy...";
        modal.classList.add('hidden');
      }, 1000)
    }, 
    function(error) {
      modalText.innerText = "You're too tired! Try again tomorrow.";
      setTimeout(function() {
        modal.classList.add('hidden');
      }, 1000)
    });

  });
})