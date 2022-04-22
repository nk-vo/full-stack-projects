const slider = document.querySelector('.image-slider');
const arrLeft = document.querySelector('.arrow-left');
const arrRight = document.querySelector('.arrow-right');
const heading = document.querySelector('.caption h1');
const description = document.querySelector('.caption p');


//Data
const images = [
  "bg1.jpg", "bg2.jpg", "bg3.jpg"
];

const headings = [
  "New York City", "Tokyo Japan", "Dubai Emirates"
];

const descriptions = [
  "The city that never sleeps",
  "The modern metropolis",
  "The sand paradise",
];

//Slider ID
let id = 0;

//The slider function
function slide(id) {
  //Set the background image
  slider.style.backgroundImage = `url(img/${images[id]})`;
  //Add image fade animation
  slider.classList.add('image-fade');
  /*Remove animation after it's done, 
  so it can be used again*/
  setTimeout(() => {
    slider.classList.remove('image-fade');
  }, 550);
  //Change heading
  heading.innerText = headings[id];
  //Change Description
  description.innerText = descriptions[id];
}

//Add click event to left arrow
arrLeft.addEventListener('click', () => {
  //Decrement img id
  id--;
  /*Check if id is smaller than 
  the number of available slides*/
  if(id < 0) {
    id = images.length - 1;
  } 
  //Run the slider function
  slide(id);
});

//Add click event to right arrow
arrRight.addEventListener('click', () => {
  //Increment img id
  id++;
  /*Check if id is greater than 
  the number of available slides*/
  if (id > images.length - 1) {
    id = 0;
  }
  //Run the slider function
  slide(id);  
});