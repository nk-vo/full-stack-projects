//Get elements from the DOM
const input = document.querySelector('#tagInput');
const tagForm = document.querySelector('#tagForm');
const output = document.querySelector('.tags');
const max = document.querySelector('.max');

//Function for outputing the tags
function outputTag() {
  //Create the tag element, and insert the formated input value
  const tag = `
    <span class="tag">
      <b>${input.value}</b>
      <span class="material-icons-outlined remove-btn">
        close
      </span>
    </span>
  `;
  
  //Output the tag
  output.innerHTML += tag;
  
  //Make the input blank 
  input.value = "";
}

//Add a submit event to the form
tagForm.addEventListener('submit', e => {
  //Check if input is empty
  if(input.value === "") {
    //Prevent default form submit behavior
    e.preventDefault();
  }
  //Limit the ammount of tags to 5
  else if(output.children.length >= 4) {
    //Run the outputTag function
    outputTag();
    //Disable the input
    input.disabled = true;
    //Change placeholder text
    input.placeholder = "Max number of tags reached!";
  }
  else {
    //Run the outputTag function
    outputTag();
  }
  //Prevent default form submit behavior
  e.preventDefault();
});

//Add an input event on the input element
input.addEventListener('input', e => {
  //Block the user from adding spaces
  const rmvWhitespace = input.value.replace(/\s/g, '');
  //Block the user from typing special characters
  input.value = rmvWhitespace.replace(/\s[^a-zA-Z0-9]/g, "");
});

//Add a click event to the dynamically created 'remove-btn' elements
window.addEventListener('click', e => {
  if(e.target.classList.contains('remove-btn')) {
    e.target.parentElement.remove();
    //Disable the input
    input.disabled = false;
    //Change placeholder text
    input.placeholder = "Add a tag...";
  }
});