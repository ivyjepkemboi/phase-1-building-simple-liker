// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
 // Hide the error modal when the page first loads
 const errorModal = document.getElementById("modal");
 errorModal.classList.add("hidden");

 // Function to handle like action
 function handleLike(event) {
   const heart = event.target;

   // If the clicked heart is already activated, remove activation and return
   if (heart.classList.contains("activated-heart")) {
     heart.classList.remove("activated-heart");
     return;
   }

   // Simulate server call
   mimicServerCall()
     .then(() => {
       // On success, change heart to full heart and activate it
       heart.textContent = FULL_HEART;
       heart.classList.add("activated-heart");
     })
     .catch(() => {
       // On failure, display error modal and message
       errorModal.classList.remove("hidden");
       const errorMessage = document.getElementById("modal-message");
       errorMessage.textContent = "Server error. Please try again later.";

       // Hide error modal after 3 seconds
       setTimeout(() => {
         errorModal.classList.add("hidden");
       }, 3000);
     });
 }

 // Add event listener to handle like action
 const emptyHearts = document.querySelectorAll(".like-glyph");
 emptyHearts.forEach(heart => {
   heart.addEventListener("click", handleLike);
 });

 // Function to handle unlike action
 function handleUnlike(event) {
   const heart = event.target;
   heart.textContent = EMPTY_HEART;
   heart.classList.remove("activated-heart");
 }

 // Add event listener to handle unlike action
 const fullHearts = document.querySelectorAll(".activated-heart");
 fullHearts.forEach(heart => {
   heart.addEventListener("click", handleUnlike);
 });



//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
