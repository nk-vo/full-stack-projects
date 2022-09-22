//Get elements from the DOM
const artistInput = document.querySelector('#artistName');
const songInput = document.querySelector('#songName');
const form = document.querySelector('#lyricsForm');
const output = document.querySelector('.lyrics-output pre');
const btn = document.querySelector('.fetchBtn');
const loading = document.querySelector('.loading');

//Add a click event to the button
btn.addEventListener('click', () => {
  //Check if the fields are NOT empty
  if(artistInput.value !== "" && songInput.value !== "") {
    //Show the loading div
    loading.style.opacity = "1";
    /*Fetch the API data using the 
    artist and song name from the input fields*/
    fetch(
      `https://api.lyrics.ovh/v1/
      ${artistInput.value}/${songInput.value}`
    )
    /*Take the data, which is in JSON format, 
    and convert it into a regular JS object*/
    .then(response => response.json())
    .then(data => {
      /*If the response is not equal to 'undefined'
      (The lyrics for the inserted artist and song are found)*/
      if(data.lyrics !== undefined) {
        //Output the lyrics to the page
        output.innerHTML = data.lyrics;
      /*And if the lyrics are not found*/
      } else {
        /*Output a message*/
        output.innerHTML = `<p>No lyrics found for the entered data.</p>`;
      }
      /*Hide the loading div*/
      loading.style.opacity = "0";
      /*Show the output div (Fade in animation)*/
      document.querySelector('.lyrics-output').style.opacity = "1";
    });
  }
});