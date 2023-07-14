document.getElementById('user-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent default form submission

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var formData = {
        name: name,
        email: email,
        phone: phone
    };

    // Save the form data to local storage
    saveFormData(formData);

    var displayArea = document.getElementById('display-area');

    // Create new elements for the form data
    var nameElement = document.createElement('p');
    nameElement.innerHTML = "<strong>Name:</strong> " + name;

    var emailElement = document.createElement('p');
    emailElement.innerHTML = "<strong>Email:</strong> " + email;

    var phoneElement = document.createElement('p');
    phoneElement.innerHTML = "<strong>Phone:</strong> " + phone;

    // Add spacing between the form data
    var spacingElement = document.createElement('hr');

    // Append the new elements to the display area
    displayArea.appendChild(nameElement);
    displayArea.appendChild(emailElement);
    displayArea.appendChild(phoneElement);
    displayArea.appendChild(spacingElement);

    // Clear the form input fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
});

function generateUniqueId() {
    // Generate a unique identifier using timestamp or any other method
    // Return the unique identifier
    var timestamp = new Date().getTime();
    return "user_" + timestamp;
  }
  
  function saveFormData(formData) {
    var uniqueId = generateUniqueId(); // Generate a unique identifier
  
    // Store data using unique key
    localStorage.setItem(uniqueId, JSON.stringify(formData));
  }
  
  
  