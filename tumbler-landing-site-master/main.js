//Get the root element
const img = document.querySelector('.main-img img');
const toggleBtn = document.querySelector('.toggle');
const toggleText = document.querySelectorAll('.toggle-text');

//Toggle Variable
let bool = true;

toggleBtn.addEventListener('click', () => {
  
  //Change Image and Text content with toggle variable
  if(bool === true) {
    img.src = "./cup-light.png";
    
    toggleText.forEach(text => {
      text.innerText = "White ";
    });
    
    bool = false;
  } else {
    img.src = "./cup-dark.png";
    
    toggleText.forEach(text => {
      text.innerText = "Blvck ";
    });
   
    bool = true;
  }
  
  //Toggle Theme
  document.body.classList.toggle('light-theme');
  /*
    The classList property already has a pre-built 
    toggle method, so we don't need our 
    bool/toggle variable here
  */
  //Toggle Icon
  toggleBtn.firstElementChild.classList.toggle('fa-sun');
})

