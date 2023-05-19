document.getElementById("my-form").addEventListener("submit", addUser);

//button.addEventListener('click',submitEvent);
function addUser(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  if (name !== "" && email !== "") {
    let user = {
      name,
      email,
    };
    axios
      .post(
        "https://crudcrud.com/api/84a65292ea044b3589487e58b18090b2/appointment",
        user
      )
      .then((response) => {
        console.log(response.data);
        showUsers();
        // console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    document.getElementById("my-form").reset();
  }

  // localStorage.setItem(obj.email, JSON.stringify(obj));
  // showUserOnScreen(obj);
}

const showUsers = () => {
  // e.preventDefault();
  const userList = document.getElementById("users");
  userList.innerHTML = "";
  axios
    .get(
      "https://crudcrud.com/api/84a65292ea044b3589487e58b18090b2/appointment"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        userList.innerHTML += `
            <li>
            ${response.data[i].name} : ${response.data[i].email} 
            <input type="button" class="editBt "value="Edit" onclick="editUser('${response.data[i]._id}','${response.data[i].name}','${response.data[i].email}')">
            <input type="button" class="editButton deleteBtn"value="Delete" onclick="deleteUser('${response.data[i]._id}')">
</li> `;
      }
    });
};

const editUser = (_id, name, email) => {
  axios
    .put(
      `https://crudcrud.com/api/84a65292ea044b3589487e58b18090b2/appointment/${_id}`,
      (document.getElementById("name").value = name),
      (document.getElementById("email").value = email)
    )
    .then((response) => {
      showUsers();
      console.log(response.data);
    });
};

const deleteUser = (_id) => {
  axios
    .delete(
      `https://crudcrud.com/api/84a65292ea044b3589487e58b18090b2/appointment/${_id}`
    )
    .then((response) => {
      showUsers();
      console.log(response.data);
    })
    .catch((err) => console.log(err));
};
showUsers();
