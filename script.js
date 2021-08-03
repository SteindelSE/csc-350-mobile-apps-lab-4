/*
  Name: Derek Steindel 
  Date: 7/31/21
  Assignment: Password Generator
*/

// Runs when the window loads to ensure elements aren't null
window.onload = function setup() {
  // Custom jQuery event listeners for the sliders
  $("#quantity-slider-fill").on("slidestop", checkQuantity());
  $("#length-slider-fill").on("slidestop", checkLength());

  // Default event listener for the button
  document
    .getElementById("generate-button")
    .addEventListener("click", generate);
};

// This will never get called since the jQuery mobile widget handles clamping to min and max values for both the slider and the manual box inputs, but since it's required by the assignment, here it is.
function checkQuantity() {
  let quantity = document.getElementById("quantity-slider-fill").value;
  if (quantity < 1) {
    alert("Quantity must be greater than 0!");
    // No need to set the value, jQuery does this for us in slider, otherwise we would do something like:
    // let quantityTextbox = document.getElementById("quantity-textbox");
    // quantityTextbox.setAttribute("value", 1);
  }
  if (quantity > 100) {
    alert("Quantity must be less than or equal to 100!");
    // No need to set the value, jQuery does this for us in slider, otherwise we would do something like:
    // let quantityTextbox = document.getElementById("quantity-textbox");
    // quantityTextbox.setAttribute("value", 100);
  }
}

// This will never get called since the jQuery mobile widget handles clamping to min and max values for both the slider and the manual box inputs, but since it's required by the assignment, here it is.
function checkLength() {
  let length = document.getElementById("length-slider-fill").value;
  if (length < 1) {
    alert("Length must be greater than or equal to 8!");
    // No need to set the value, jQuery does this for us in slider, otherwise we would do something like:
    // let lengthTextbox = document.getElementById("length-textbox");
    // lengthTextbox.setAttribute("value", 8);
  }
  if (length > 100) {
    alert("Length must be less than or equal to 100!");
    // No need to set the value, jQuery does this for us in slider, otherwise we would do something like:
    // let lengthTextbox = document.getElementById("length-textbox");
    // lengthTextbox.setAttribute("value", 100);
  }
}

// Returns a random character from the provided string by treating it as an array of characters
function getRandomLetter(stringOfValidCharacters) {
  return stringOfValidCharacters[
    Math.floor(Math.random() * stringOfValidCharacters.length)
  ];
}

// Generates a table of passwords, of the selected character length, based on the quantity of passwords selected
function generate() {
  // Easier and more efficient to run my finger across a few rows of keys and let the from function sort them into an array of characters to randomly choose from.
  let stringOfValidCharacters =
    "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*";

  // Get values of the settings sliders
  let quantity = document.getElementById("quantity-slider-fill").value;
  let length = document.getElementById("length-slider-fill").value;

  // Get rid of old values in case run more than once
  $("#passwords-table tr").remove();
  // Grab the table so we can put results into it
  let passwordsTable = document.getElementById("passwords-table");

  //Confirm both sliders are within range because it is required by the assignment even though jQuery sliders already handle clamping to minimum and maximum values
  if (quantity < 1 || quantity > 100) {
    alert("Number of Passwords must be between 1 and 100.");
  } else if (length < 8 || length > 100) {
    alert("Number of Characters must be between 8 and 100.");
  } else {
    //Performing remaining logic here meets requirements of "do nothing" if values are not within range.
    let caption = document.getElementById("passwords-table").createCaption();
    caption.innerHTML = "<strong>Generated Passwords</strong>";

    for (let i = 0; i < quantity; i++) {
      let password = "";
      for (let j = 0; j < length; j++) {
        // After first character, ensure mixed case, this is bad practice as it lends to the probability that the second character of the password is a capital letter 75% of the time, but we'll do this to meet the requirements of the assignment.
        if (j > 0 && password == password.toLowerCase()) {
          password += getRandomLetter(stringOfValidCharacters.slice(26, 52));
        } else if (j > 0 && password == password.toUpperCase()) {
          password += getRandomLetter(stringOfValidCharacters.slice(0, 25));
        } else {
          password += getRandomLetter(stringOfValidCharacters);
        }
      }

      // Create a table row and insert the generated password and its iteration
      let row = passwordsTable.insertRow();
      let numberCell = row.insertCell();
      let passwordCell = row.insertCell();
      numberCell.innerHTML = i + 1;
      passwordCell.innerHTML = password;
    }
  }
}
