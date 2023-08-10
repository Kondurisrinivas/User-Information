document.getElementById('user-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent default form submission

  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;

  var formData = {
    name: name,
    email: email,
    phone: phone
  };

  // Save the form data using the remote API
  axios.post("https://crudcrud.com/api/1a6803b28ab44722a02fe52489ae4708/appointments", formData)
    .then(res => {
      console.log(res.data);
      displayData(); // Refresh the displayed data after successful submission
    })
    .catch(err => {
      console.log(err);
    });

  // Clear the form input fields
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('phone').value = '';
});

function displayData() {
  var dataList = document.getElementById('data-list');
  dataList.innerHTML = ''; // Clear the existing list

  // Fetch data from the remote API
  axios.get("https://crudcrud.com/api/1a6803b28ab44722a02fe52489ae4708/appointments")
    .then(res => {
      var appointments = res.data;
      var hasAppointments = false; // Track if there are any appointments

      for (var key in appointments) {
        var formData = appointments[key];

        var listItem = document.createElement('li');
        listItem.textContent = "Name: " + formData.name + ", Email: " + formData.email + ", Phone: " + formData.phone;

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.key = key; // Set the key as a data attribute
        deleteButton.addEventListener('click', function(event) {
          var keyToDelete = event.target.dataset.key;
          deleteData(keyToDelete);
        });
        listItem.appendChild(deleteButton);

        dataList.appendChild(listItem);

        hasAppointments = true; // There is at least one appointment
      }

      if (!hasAppointments) {
        var noAppointmentsMessage = document.createElement('li');
        noAppointmentsMessage.textContent = 'OOPS..!! Currently No Appointments to show';
        noAppointmentsMessage.classList.add('no-appointments'); // Add the CSS class
        dataList.appendChild(noAppointmentsMessage);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

function deleteData(key) {
  // Delete data from the remote API using the provided key
  axios.delete("https://crudcrud.com/api/1a6803b28ab44722a02fe52489ae4708/appointments/" + key)
    .then(res => {
      console.log(res.data);
      displayData(); // Refresh the displayed data after successful deletion
    })
    .catch(err => {
      console.log(err);
    });
}

// Load and display the stored user data on page load
// displayData();
