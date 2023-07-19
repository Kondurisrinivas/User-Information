document.getElementById('user-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  var amount = document.getElementById('amount').value;
  var description = document.getElementById('description').value;
  var catagory = document.getElementById('catagory').value;

  var formData = {
    amount: amount,
    description: description,
    catagory: catagory
  };

  // Generate a unique key
  var uniqueKey = generateUniqueKey();

  // Save the form data with the unique key
  localStorage.setItem(uniqueKey, JSON.stringify(formData));

  // Display the stored user data
  displayData();

  // Clear the form input fields
  document.getElementById('amount').value = '';
  document.getElementById('description').value = '';
  document.getElementById('catagory').value = '';
});

function generateUniqueKey() {
  var timestamp = new Date().getTime(); // Generate a timestamp
  return "formData_" + timestamp;
}

function displayData() {
  var dataList = document.getElementById('data-list');
  dataList.innerHTML = ''; // Clear the existing list

  var hasExpenses = false; // Track if there are any expenses

  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key.startsWith('formData_')) {
      var formData = JSON.parse(localStorage.getItem(key));

      var listItem = document.createElement('li');

      var amountLabel = document.createElement('strong');
      amountLabel.textContent = "Amount: ";
      listItem.appendChild(amountLabel);
      listItem.innerHTML += formData.amount + ", ";

      var descriptionLabel = document.createElement('strong');
      descriptionLabel.textContent = "Description: ";
      listItem.appendChild(descriptionLabel);
      listItem.innerHTML += formData.description + ", ";

      var categoryLabel = document.createElement('strong');
      categoryLabel.textContent = "Category: ";
      listItem.appendChild(categoryLabel);
      listItem.innerHTML += formData.catagory;

      var editButton = document.createElement('button');
      editButton.textContent = 'Edit Expense';
      editButton.dataset.key = key; // Set the key as a data attribute
      editButton.addEventListener('click', function(event) {
        var keyToEdit = event.target.dataset.key;
        editData(keyToEdit);
      });
      listItem.appendChild(editButton);

      var deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete Expense';
      deleteButton.dataset.key = key; // Set the key as a data attribute
      deleteButton.addEventListener('click', function(event) {
        var keyToDelete = event.target.dataset.key;
        deleteData(keyToDelete);
      });
      listItem.appendChild(deleteButton);

      dataList.appendChild(listItem);

      hasExpenses = true; // There is at least one expense
    }
  }

  if (!hasExpenses) {
    var noExpensesMessage = document.createElement('li');
    noExpensesMessage.textContent = 'OOPS..!! Currently No Expenses to show';
    noExpensesMessage.classList.add('no-appointments'); // Add the CSS class
    dataList.appendChild(noExpensesMessage);
  }
}

function deleteData(key) {
  localStorage.removeItem(key);
  displayData();
}

function editData(key) {
  var formData = JSON.parse(localStorage.getItem(key));
  document.getElementById('amount').value = formData.amount;
  document.getElementById('description').value = formData.description;
  document.getElementById('catagory').value = formData.catagory;

  // Remove the data from local storage after editing
  localStorage.removeItem(key);
}

// Load and display the stored user data on page load
displayData();
