// "use strict";
//==================================================================
// Calculate change
const btnChange = document.getElementById("btn-change");
let paid = (document.getElementById("input-paid").value = "");
let price = (document.getElementById("input-price").value = "");

btnChange.addEventListener("click", calculateChange);
function calculateChange() {
  paid = document.getElementById("input-paid").value || 0;
  price = document.getElementById("input-price").value || 0;
  let change = paid - price;
  let outputString = "";
  const output = document.getElementById("changeId");
  const changeDol = change >= 0 ? Math.floor(change) : -1;
  let dec;
  if (change === 0) outputString += `0`;
  if (changeDol >= 1) {
    if (changeDol === 1) outputString += `1 долар`;
    if (changeDol >= 2 && changeDol <= 4) outputString += `${changeDol} долари`;
    if (changeDol >= 5) outputString += `${changeDol} доларів`;
    dec = Math.round((change - changeDol) * 100);
  }
  if (changeDol === 0) {
    dec = Math.round((change - changeDol) * 100);
  }
  if (dec >= 0) {
    if (dec === 0) outputString += `, 0 центів`;
    if (dec / 50 >= 1) {
      outputString += `, 50 центів`;
      dec -= 50;
    }
    if (dec / 25 >= 1) {
      outputString += `, 25 центів`;
      dec -= 25;
    }
    if (dec / 10 >= 1) {
      const change10 = Math.floor(dec / 10);
      if (change10 === 1) outputString += `, 10 центів`;
      if (change10 === 2) outputString += `, 10*2 центів`;
      dec -= change10 * 10;
    }
    if (dec / 5 >= 1) {
      outputString += `, 5 центів`;
      dec -= 5;
    }
    if (dec > 0) {
      if (dec === 1) outputString += `, 1 цент`;
      else outputString += `, ${dec} центів`;
    }
  }

  output.innerHTML = changeDol === -1 ? "будь-ласка доплатіть" : outputString;
}
//====================================================================
// Modal Window
function generateModalWindow() {
  let divOut = document.createElement("div");
  divOut.id = `myModal`;
  divOut.className = "modal";
  divOut.innerHTML = `<div class="modal-content">
  <span id="close" class="btn btn-danger btn-sm closeBtn">x</span>
  <p>Modal Window</p>
  </div>`;
  return divOut;
}
let modal;
const btn = document.getElementById("myBtn");
btn.onclick = function() {
  let div = document.getElementById("modal");
  const divOut = generateModalWindow();
  div.appendChild(divOut);

  modal = document.getElementById(`myModal`);
  modal.style.display = "block";

  const span = document.getElementById(`close`);
  span.onclick = function() {
    modal.remove();
  };
};
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//====================================================================
//table

let idRow;

const addUser = document.getElementById("addUser");
// const table = document.getElementById("test-table");
// console.log(table);
const tbody = document.getElementsByTagName("tbody")[0];

console.log(tbody.rows);
addUser.addEventListener("click", function() {
  if (!idRow) idRow = 1;
  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;
  const email = document.getElementById("email").value;
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const createdAt = new Date();
  if (!firstName || !lastName || !regex.test(email)) return;
  const row = genereteRowForTable(idRow, firstName, lastName, email, createdAt);
  tbody.appendChild(row);
  selectAllDelAndEditBtn();
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  idRow++;
});

function genereteRowForTable(idRow, firstName, lastName, email, createdAt) {
  const tr = document.createElement("tr");
  tr.id = idRow;
  tr.innerHTML = `<td>${firstName}</td>
  <td>${lastName}</td>
  <td>${email}</td>
  <td>${createdAt.toDateString()}</td>
  <td><button id="${idRow}-edit" class="btn btn-warning btn-sm">edit</button></td>
  <td><button id="${idRow}-delete" class="btn btn-danger btn-sm">delete</button></td>`;
  return tr;
}

function selectAllDelAndEditBtn() {
  for (let i = 0; i < tbody.rows.length; i++) {
    let index = tbody.rows[i].id;
    const deleteBtn = document.getElementById(`${index}-delete`);
    // .addEventListener("click", deleteRow(index));
    const editBtn = document.getElementById(`${index}-edit`);
    deleteBtn.onclick = function() {
      const tr = document.getElementById(index);
      tr.remove();
    };
    editBtn.onclick = function() {
      const tr = document.getElementById(index);
      const editUser = (document.getElementById("editUser").style.display =
        "block");

      addUser.style.display = "none";
      document.getElementById("fname").value = tr.children[0].innerText;
      document.getElementById("lname").value = tr.children[1].innerText;
      document.getElementById("email").value = tr.children[2].innerText;

      editUser.onclick = function() {
        console.log(tr);
        const firstName = document.getElementById("fname").value;
        const lastName = document.getElementById("lname").value;
        const email = document.getElementById("email").value;
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!firstName || !lastName || !regex.test(email)) return;
        tr.children[0].innerText = firstName;
        tr.children[1].innerText = lastName;
        tr.children[2].innerText = email;
        document.getElementById("fname").value = "";
        document.getElementById("lname").value = "";
        document.getElementById("email").value = "";
        addUser.style.display = "block";
        editUser.style.display = "none";
      };
    };
  }
}
