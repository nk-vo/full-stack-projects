//Select all images 
const images = document.querySelectorAll('.images img');

//Add a scroll event to the page
window.addEventListener('scroll', () => {
  /*
    Move the images to the top by adding the scrolled
    ammount and converting it to a negative number
  */
  /*
    Divide by a bigger number to make the effect more subtle.
    We apply this to make farther objects move slower, 
    and closer objects move faster
  */
  images[0].style.top = "-" + (window.scrollY / 2.5) + "px";
  images[1].style.top = "-" + (window.scrollY / 3.5) + "px";
  images[2].style.top = "-" + (window.scrollY / 4) + "px";
  images[3].style.top = "-" + (window.scrollY / 5) + "px";
  images[4].style.top = "-" + (window.scrollY / 6) + "px";
  images[5].style.top = "-" + (window.scrollY / 7) + "px";
  images[6].style.top = "-" + (window.scrollY / 9) + "px";
});

