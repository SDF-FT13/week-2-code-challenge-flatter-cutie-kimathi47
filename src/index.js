// Your code here
// Wait for the DOM to fully load before executing JavaScript
document.addEventListener("DOMContentLoaded", (e) => {
    const navBar = document.getElementById("character-bar");
  
    // Function to fetch character data and populate the UI
    function getCharacterDetails() {
      return fetch("http://localhost:3000/characters")
        .then((res) => res.json())
        .then((characters) => {
          // Process each character from the API response
          characters.forEach((character) => {
            // Create a clickable span for each character in the navigation bar
            const characterView = document.createElement("span");
            navBar.appendChild(characterView);
            characterView.id = character.id;
            characterView.innerText = character.name;
            characterView.style.cursor = "pointer";
  
            // Handle click events on character spans
            characterView.addEventListener("click", (e) => {
              // Update the character details display
              const characterName = document.getElementById("name");
              characterName.innerText = character.name;
              
              const characterImage = document.getElementById("image");
              characterImage.src = character.image;
  
              const currentVotes = document.getElementById("vote-count");
              currentVotes.innerText = character.votes;
  
              // Set up vote submission form
              const form = document.getElementById("votes-form");
              form.addEventListener("submit", (e) => {
                e.preventDefault();
                const votes = document.getElementById("votes").value;
                
                // Validate and update votes
                if (isNaN(votes) === false) {
                  currentVotes.innerText = votes;
                } else {
                  alert("Votes can only be in numbers");
                  form.reset();
                }
  
                // Set up reset button functionality
                const resetButton = document.getElementById("reset-btn");
                resetButton.addEventListener("click", (e) => {
                  e.preventDefault();
                  currentVotes.innerText = 0;
                });
              });
            });
          });
  
          // Set up form for adding new characters
          const newCharacter = document.getElementById("character-form");
          newCharacter.addEventListener("submit", (e) => {
            e.preventDefault();
            const newCharacterName = document.getElementById("name2").value;
            const newCharacterImage = document.getElementById("image-url").value;
  
            // Create and add new character span
            const addedCharacter = document.createElement("span");
            addedCharacter.style.cursor = "pointer";
            addedCharacter.innerText = newCharacterName;
            navBar.appendChild(addedCharacter);
  
            // Handle clicks on newly added characters
            addedCharacter.addEventListener("click", () => {
              // Update display for new character
              const newCharacterTitle = document.getElementById("name");
              newCharacterTitle.innerText = newCharacterName;
              
              const addCharacterImage = document.getElementById("image");
              addCharacterImage.src = newCharacterImage;
              
              const newCharacterCurrentVotes = document.getElementById("vote-count");
              newCharacterCurrentVotes.innerText = 0;
  
              // Set up voting for new character
              const form = document.getElementById("votes-form");
              form.addEventListener("submit", (e) => {
                e.preventDefault();
                const votes = document.getElementById("votes").value;
                if (isNaN(votes) === false) {
                  newCharacterCurrentVotes.innerText = votes;
                  form.reset();
                } else {
                  alert("Votes can only be in numbers");
                  form.reset();
                }
              });
  
              // Set up reset button for new character
              const reset = document.getElementById("reset-btn");
              reset.addEventListener("click", (e) => {
                e.preventDefault();
                newCharacterCurrentVotes.innerText = 0;
              });
  
              // Function to POST new character to server
              function updateNewCharacter() {
                return fetch("http://localhost:3000/characters", {
                  method: "POST",
                  headers: {
                    "content-Type": "application/json",
                    Accept: "application/json",
                  },
                  body: JSON.stringify({
                    name: newCharacterName,
                    image: newCharacterImage,
                    votes: 0,
                  }),
                });
              }
              updateNewCharacter();
            });
          });
        });
    }
  
    // Initialize the application
    getCharacterDetails();
  });