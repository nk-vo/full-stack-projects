//Get the elements & declare variables
const navbar = document.getElementById("navbar");
const navBtn = document.getElementById("navBtn");
let bol = false;
const offset = 90;

//Add scroll event listener to the page
window.addEventListener("scroll", () => {
  //If the page is scrolled by 90px
  if (pageYOffset > offset && bol === false) {
    //Add the classes to change the navbar to the light version
    navbar.classList.add("bg-light");
    navbar.classList.remove("navbar-dark");
    navbar.classList.add("navbar-light");
    navBtn.classList.add("btn-outline-dark");
    navbar.style.boxShadow = "0px 5px 15px rgba(0, 0, 0, 0.3)";
    /*Prevents the event from firing more than once*/
    bol = true;
    //Remove all classes when the page is scrolled back up
  } else if (pageYOffset <= offset && bol === true) {
    navbar.classList.remove("bg-light");
    navbar.classList.remove("navbar-light");
    navbar.classList.add("navbar-dark");
    navBtn.classList.remove("btn-outline-dark");
    navbar.style.boxShadow = "none";
    bol = false;
  }
});
