// Function to add a new debit entry to the specified debit account
function addDebit(amount, debitAccount) {
   // Create a new element to display the debit amount
   var debitEntry = document.createElement('div');
   debitEntry.textContent = amount;

   // Check if the debit section exists in the account
   var debitSection = debitAccount.querySelector('.debits-section');
   if (!debitSection) {
       debitSection = document.createElement('div');
       debitSection.classList.add('debits-section');
       debitAccount.querySelector('.debit-credit-container').appendChild(debitSection);
   }

   // Append the new debit entry to the debit account
   debitSection.appendChild(debitEntry);

   // Determine the type of account
   var accountType = debitAccount.parentNode.id;

   // Update total assets or liabilities depending on the account type
   switch (accountType) {
       case 'assetsContainer':
           updateTotalAssets();
           break;
       case 'liabilitiesContainer':
           updateTotalLiabilities();
           break;
       case 'equitiesContainer':
           updateTotalEquities();
           break;
       default:
           console.error('Invalid account type');
   }
}


// Function to add a new credit entry to the specified credit account
function addCredit(amount, creditAccount) {
   // Create a new element to display the credit amount
   var creditEntry = document.createElement('div');
   creditEntry.textContent = amount;

   // Check if the credit section exists in the account
   var creditSection = creditAccount.querySelector('.credits-section');
   if (!creditSection) {
       creditSection = document.createElement('div');
       creditSection.classList.add('credits-section');
       creditAccount.querySelector('.debit-credit-container').appendChild(creditSection);
   }

   // Append the new credit entry to the credit account
   creditSection.appendChild(creditEntry);

   // Update total assets or liabilities depending on the account type
   var accountType = creditAccount.parentNode.id;
   if (accountType === 'assetsContainer') {
       updateTotalAssets();
   } else if (accountType === 'liabilitiesContainer') {
       updateTotalLiabilities();
   } else if (accountType === 'equitiesContainer') {
       updateTotalEquities();
   } else {
       console.error('Invalid account type');
   }
}


// Function to calculate and update total assets
function updateTotalAssets() {
   // Initialize total assets
   let totalAssets = 0;

   // Iterate over all asset accounts
   document.querySelectorAll('#assetsContainer .account').forEach(function(assetAccount) {
       // Check if debit and credit sections exist in the account
       var debitSection = assetAccount.querySelector('.debits-section');
       var creditSection = assetAccount.querySelector('.credits-section');
       
       // If either debit or credit section is null, return early
       if (!debitSection || !creditSection) {
           return;
       }

       // Sum up debit amounts
       debitSection.querySelectorAll('div').forEach(function(debitEntry) {
           totalAssets += parseFloat(debitEntry.textContent);
       });

       // Subtract credit amounts
       creditSection.querySelectorAll('div').forEach(function(creditEntry) {
           totalAssets -= parseFloat(creditEntry.textContent);
       });
   });

   // Update total assets element
   document.getElementById('totalAssets').textContent = '$' + totalAssets.toFixed(2);
}

// Function to calculate and update total liabilities
function updateTotalLiabilities() {
   // Initialize total liabilities
   let totalLiabilities = 0;

   // Iterate over all liability accounts
   document.querySelectorAll('#liabilitiesContainer .account').forEach(function(liabilityAccount) {
       // Check if debit and credit sections exist in the account
       var debitSection = liabilityAccount.querySelector('.debits-section');
       var creditSection = liabilityAccount.querySelector('.credits-section');
       
       // If either debit or credit section is null, return early
       if (!debitSection || !creditSection) {
           return;
       }

       // Sum up debit amounts (liabilities increase with debits)
       debitSection.querySelectorAll('div').forEach(function(debitEntry) {
           totalLiabilities -= parseFloat(debitEntry.textContent);
       });

       // Sum up credit amounts (liabilities increase with credits)
       creditSection.querySelectorAll('div').forEach(function(creditEntry) {
           totalLiabilities += parseFloat(creditEntry.textContent);
       });
   });

   // Update total liabilities element
   document.getElementById('totalLiabilities').textContent = '$' + totalLiabilities.toFixed(2);
}





// Function to calculate and update total equities
function updateTotalEquities() {
   // Initialize total equities
   let totalEquities = 0;

   // Iterate over all equity accounts
   document.querySelectorAll('#equitiesContainer .account').forEach(function(equityAccount) {
       // Check if debit and credit sections exist in the account
       var debitSection = equityAccount.querySelector('.debits-section');
       var creditSection = equityAccount.querySelector('.credits-section');
       
       // If either debit or credit section is null, return early
       if (!debitSection || !creditSection) {
           return;
       }

       // Sum up credit amounts (equities increase with credits)
       creditSection.querySelectorAll('div').forEach(function(creditEntry) {
           totalEquities += parseFloat(creditEntry.textContent);
       });

       // Subtract debit amounts (equities decrease with debits)
       debitSection.querySelectorAll('div').forEach(function(debitEntry) {
           totalEquities -= parseFloat(debitEntry.textContent);
       });
   });

   // Update total equities element
   document.getElementById('totalEquities').textContent = '$' + totalEquities.toFixed(2);
}

// Update total liabilities and equities when adding new debit or credit
function updateTotalLiabilitiesAndEquities() {
   updateTotalLiabilities();
   updateTotalEquities();
}

// Update totals for liabilities and equities
updateTotalLiabilities();
updateTotalEquities();

// Add event listener for creating asset accounts
document.querySelector('.typeOfAccount').addEventListener('click', function() {
   this.classList.add('clicked'); // Add the 'clicked' class to the 'typeOfAccount' button when clicked

   var buttonContainer = document.getElementById('buttonContainer');
   var titleContainer = document.getElementById('titleContainer');
   var submitContainer = document.getElementById('submitContainer');
   var confirmContainer = document.getElementById('confirmContainer');

   buttonContainer.innerHTML = '';
   titleContainer.innerHTML = '';
   submitContainer.innerHTML = '';
   confirmContainer.innerHTML = '';

   // Disable the typeOfAccount button
   this.disabled = true;

   // Apply the disabled CSS class to the typeOfAccount button
   this.classList.add('disabled-button');

   // Check if the clear button already exists
   var clearButton = document.querySelector('.clear');

   // If it doesn't exist, create it and append it to clearButtonSpace
   if (!clearButton) {
       clearButton = document.createElement('button');
       clearButton.classList.add('clear');
       clearButton.textContent = 'Clear';
       clearButton.style.display = 'block'; // Or any other styles you want

       // Append the clear button to the clearButtonSpace
       document.getElementById('clearButtonSpace').appendChild(clearButton);
   } else {
       // If it exists, make sure it's visible
       clearButton.style.display = 'block';
   }

   clearButton.addEventListener('click', function() {
       var typeOfAccount = document.querySelector('.typeOfAccount');
       typeOfAccount.classList.remove('clicked');
       buttonContainer.innerHTML = '';
       titleContainer.innerHTML = '';
       submitContainer.innerHTML = '';
       confirmContainer.innerHTML = '';

       // Hide the clear button
       clearButton.style.display = 'none';

       // Enable the typeOfAccount button
       typeOfAccount.disabled = false;
       typeOfAccount.classList.remove('disabled-button'); // Remove the disabled CSS class
   });

   var types = ['Asset', 'Liability', 'Equity'];
   types.forEach(function(type) {
       var button = document.createElement('button');
       button.textContent = type;
       button.style.display = 'block';
       button.classList.add('buttonContainerButton');

       buttonContainer.appendChild(button);

       function buttonClickHandler() {
           // Remove the 'clicked' class from all buttons
           var buttons = document.querySelectorAll('.buttonContainerButton');
           buttons.forEach(function(button) {
               button.classList.remove('clicked');
           });

           // Add the 'clicked' class to the clicked button
           button.classList.add('clicked');

           titleContainer.innerHTML = '';
           submitContainer.innerHTML = '';
           confirmContainer.innerHTML = '';

           var textNode = document.createTextNode(type + ' Title: ');
           var inputField = document.createElement('input');
           inputField.type = 'text';

           var submitButton = document.createElement('button');
           submitButton.textContent = 'Submit';
           submitButton.style.display = 'block';
           submitButton.classList.add('submitButton');

           titleContainer.appendChild(textNode);
           titleContainer.appendChild(inputField);
           submitContainer.appendChild(submitButton);

           submitButton.addEventListener('click', function() {
               var confirmDiv = document.createElement('div');
               confirmDiv.style.display = 'flex';
               confirmDiv.style.flexDirection = 'column';
               confirmDiv.style.alignItems = 'center';

               var confirmMessage = document.createTextNode('Create ' + type + ': ' + inputField.value + '?');
               var confirmButton = document.createElement('button');
               confirmButton.textContent = 'Confirm';
               confirmButton.style.display = 'block';
               confirmButton.classList.add('confirmButton');

               confirmDiv.appendChild(confirmMessage);
               confirmDiv.appendChild(confirmButton);
               confirmContainer.appendChild(confirmDiv);

               // Disable the buttons after submission
               buttons.forEach(function(button) {
                   button.disabled = true;
                   button.classList.add('disabled-button'); // Apply the disabled CSS class
                   button.removeEventListener('click', buttonClickHandler);
               });

               // Apply the disabled CSS class to the submit button
               submitButton.disabled = true;
               submitButton.classList.add('disabled-button');

               confirmButton.addEventListener('click', function() {
                  // Create the T-account div
                  var tAccountElement = document.createElement('div');
                  tAccountElement.classList.add('account'); // Add the 'account' class
              
                  // Create and add the title
                  var titleElement = document.createElement('div');
                  titleElement.textContent = inputField.value;
                  titleElement.classList.add('account-title'); // Add the 'account-title' class
                  tAccountElement.appendChild(titleElement);
              
                  // Create the debits section
                  var debitsSection = document.createElement('div');
                  debitsSection.classList.add('debit-credit-section');
                  debitsSection.classList.add('debits-section'); // Add class for debit section
                  debitsSection.textContent = 'Debits';
              
                  // Create the credits section
                  var creditsSection = document.createElement('div');
                  creditsSection.classList.add('debit-credit-section');
                  creditsSection.classList.add('credits-section'); // Add class for credit section
                  creditsSection.textContent = 'Credits';
              
                  // Add the debit and credit buttons to the debit and credit sections
                  var debitButton = document.createElement('button');
                  debitButton.textContent = 'New Debit';
                  debitButton.classList.add('new-debit-button');
                  debitsSection.appendChild(debitButton);
                  
                  var creditButton = document.createElement('button');
                  creditButton.textContent = 'New Credit';
                  creditButton.classList.add('new-credit-button');
                  creditsSection.appendChild(creditButton);
              
                  // Add the debit and credit sections to the debit-credit-container
                  var debitCreditContainer = document.createElement('div');
                  debitCreditContainer.classList.add('debit-credit-container');
                  debitCreditContainer.appendChild(debitsSection);
                  debitCreditContainer.appendChild(creditsSection);
              
                  // Add the debit-credit-container to the T-account element
                  tAccountElement.appendChild(debitCreditContainer);
              
                  // Append the T-account to the respective container
                  var container;
                  switch (type) {
                      case 'Asset':
                          container = document.getElementById('assetsContainer');
                          break;
                      case 'Liability':
                          container = document.getElementById('liabilitiesContainer');
                          break;
                      case 'Equity':
                          container = document.getElementById('equitiesContainer');
                          break;
                      default:
                          console.error('Invalid type');
                          return; // Exit function if type is invalid
                  }
              
                  container.appendChild(tAccountElement);
              
                  // Reset button states as if clear button was pressed
                  clearButton.click(); // Simulate click on clear button to reset state
                  
                  // Add event listeners for new debit and credit buttons
                  debitButton.addEventListener('click', function() {
                      var amount = prompt('Enter amount for new debit:');
                      if (amount !== null && amount !== '') {
                          addDebit(amount, tAccountElement);
                      }
                  });
                  
                  creditButton.addEventListener('click', function() {
                      var amount = prompt('Enter amount for new credit:');
                      if (amount !== null && amount !== '') {
                          addCredit(amount, tAccountElement);
                          // Update total liabilities and equities when adding new credit
                          updateTotalLiabilitiesAndEquities();
                      }
                  });
              });
              

           });
       }

       button.addEventListener('click', buttonClickHandler);
   });
});
