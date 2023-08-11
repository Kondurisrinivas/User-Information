form = document.getElementById('my-form');
itemList = document.getElementById('items');
const msg=document.querySelector('.msg');


form.addEventListener('submit',addItem);
//itemList.addEventListener('click',deleteUser);
//itemList.addEventListener('click',editItem);

// Add details
function addItem(e){
    e.preventDefault();

    var newName = document.getElementById('name');
    var newEmail = document.getElementById('email');
    var newPhone = document.getElementById('Phone');

    if(newName.value===''||newEmail.value===''||newPhone.value===''){
       
        msg.classList.add('error');
        msg.innerHTML='Please enter all fields';

        // remove error after 3 sec
        setTimeout(()=>msg.remove(),3000);
    }else{
        var storedData = localStorage.getItem(newEmail.value);
        //var userDetails = storedData ? JSON.parse(storedData):[];
        var newUser={
            name : newName.value,
            email : newEmail.value,
            phone : newPhone.value
        }
        //userDetails.push(newUser);
        //localStorage.setItem(newEmail.value,JSON.stringify(newUser));
        axios.post("https://crudcrud.com/api/b093cf9b5f204dd6a792acf0e391ceaf/appointment",newUser)
            .then(response => {
                console.log(response);
                showNewUserOnScreen(response.data)
            })
            .catch(err => {
                console.log(err);
            })


        //clear fields
        newName.value='';
        newEmail.value='';
        newPhone.value='';
    }
}
//display function
function showNewUserOnScreen(obj){
    var li =document.createElement('li');
    li.dataset.id = obj._id;
    li.className = "list-group-item";
    

    var deleteBtn = document.createElement('button');
    deleteBtn.className ="btn btn-danger btn-sm float-right delete";
    deleteBtn.appendChild(document.createTextNode('Delete'));
    deleteBtn.setAttribute('onclick',`deleteUser('${obj._id}')`);

    li.appendChild(document.createTextNode(obj.name+": "));
    li.appendChild(document.createTextNode(obj.email+": "));
    li.appendChild(document.createTextNode(obj.phone));
        
    var editBtn = document.createElement('button');
    editBtn.classList = "btn btn-primary btn-sm float-right edit";
    editBtn.appendChild(document.createTextNode('Edit'));
    editBtn.setAttribute('onclick',`editItem('${obj.email}','${obj.name}','${obj.phone}','${obj._id}')`);

        
    li.appendChild(deleteBtn);
    li.appendChild(editBtn); 
    itemList.appendChild(li);

    /*document.getElementById('email').value = '';
    document.getElementById('name').value = '';
    document.getElementById('Phone').value = '';
    const parentNode = document.getElementById('items');
    const childHTML =`<li id=${obj._id} >${obj.name} - ${obj.email} - ${obj.phone} <button onclick = deleteUser('${obj._id}')> Delete</button> </li>`
    parentNode.innerHTML = parentNode.innerHTML+childHTML;*/
}
// loading data with is already stored in server
window.addEventListener("DOMContentLoaded",() => {
    axios.get("https://crudcrud.com/api/b093cf9b5f204dd6a792acf0e391ceaf/appointment")
    .then(res=>{
        const data = res.data;
        data.forEach(item =>{
            showNewUserOnScreen(item);
        });
        
    })
    .catch(err=>{
        console.log(err);
    })
})

// editItem function
function editItem(emailId,name,phone,userId){
    document.getElementById('email').value = emailId;
    document.getElementById('name').value = name;
    document.getElementById('Phone').value = phone;
    deleteUser(userId);
}
/*function editItem(emailId, name, phone, userId) {
    document.getElementById('email').value = emailId;
    document.getElementById('name').value = name;
    document.getElementById('Phone').value = phone;

    // Add an event listener to the form's submit event to handle the update
    form.removeEventListener('submit', addItem); // Remove the previous event listener
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const updatedUser = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('Phone').value,
        };

        axios.put(`https://crudcrud.com/api/98263ad935e04d3fb686c86f06057fe9/details/${userId}`, updatedUser)
            .then(response => {
                console.log(response);
                // Update the user details on the screen
                updateUserOnScreen(userId, updatedUser);
            })
            .catch(err => {
                console.log(err);
            });

        // Clear the form fields
        document.getElementById('email').value = '';
        document.getElementById('name').value = '';
        document.getElementById('Phone').value = '';

        // Revert the event listener to the original addItem function
        form.removeEventListener('submit', this);
        form.addEventListener('submit', addItem);
    });
}*/
function updateUserOnScreen(userId, updatedUser) {
    const listItem = document.querySelector(`li[data-id="${userId}"]`);
    if (listItem) {
        listItem.innerHTML = `${updatedUser.name}: ${updatedUser.email}: ${updatedUser.phone}`;

        // Also, update the event listener for the edit button
        const editBtn 
        = listItem.querySelector('.edit');
        if (editBtn) {
            editBtn.setAttribute('onclick', `editItem('${updatedUser.email}', '${updatedUser.name}', '${updatedUser.phone}', '${userId}')`);
        } else {
            console.log(`Edit button for user with ID ${userId} not found.`);
        }
    } else {
        console.log(`User with ID ${userId} not found on the screen.`);
    }
}

//delete user
function deleteUser(userId){
    axios.delete(`https://crudcrud.com/api/b093cf9b5f204dd6a792acf0e391ceaf/appointment/${userId}`)
            .then(res =>{
                removeUserFromScreen(userId);
            })
            .catch(err=>{
                console.log(err);
            })
}
function removeUserFromScreen(userId){
    const listItem = document.querySelector(`li[data-id="${userId}"]`);
    if (listItem) {
        listItem.remove();
    }
}