"use strict";
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

// let iterator;
let modal;
const btn = document.getElementById("myBtn");

btn.onclick = function() {
  // if (!iterator) iterator = 1;

  let div = document.getElementById("modal");
  const divOut = generateModalWindow();
  div.appendChild(divOut);

  modal = document.getElementById(`myModal`);
  modal.style.display = "block";

  // iterator++;

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

const addUser = document.getElementById("addUser");
let idRow;

addUser.onclick = function() {
  const tbody = document.getElementsByName("tbody");
  if (!idRow) idRow = 1;
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  const email = document.getElementById("email").value;
  const createdAt = Date.now();
  const row = genereteRowForTable(idRow, firstName, lastName, email, createdAt);
  console.log(row);
  // tbody.appendChild(row);
};

function genereteRowForTable(idRow, firstName, lastName, email, createdAt) {
  const tr = document.createElement("tr");
  tr.id = idRow;
  const btnDel = generateDeleteRowBtn(idRow);
  // btnDel.onclick=function(){

  // }
  btnDel.addEventListener("click", deleteRow, idRow);
  tr.innerHTML = `<td>${firstName}</td><td>${lastName}</td><td>${email}</td><td>${createdAt}</td><td>${btnDel}</td>`;
  return tr;
}
function generateDeleteRowBtn(idRow) {
  const btnDel = document.createElement("btn");
  btnDel.id = `del-${idRow}`;
  btnDel.className = "btn btn-danger btn-sm";
  btnDel.innerText = "delete";
  return btnDel;
}

function deleteRow(idRow) {
  const tr = document.getElementById(idRow);
  tr.remove();
}
