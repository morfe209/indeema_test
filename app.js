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
  // let iterator;
  // if (!iterator) iterator = 1;
  // iterator++;
  let div = document.getElementById("modal");

  let divOut = document.createElement("div");
  let divIn = document.createElement("div");
  let closeBtn = document.createElement("span");
  let p = document.createElement("p");
  let x = document.createTextNode(`x`);
  let text = document.createTextNode(`Modal Window`);

  div.appendChild(divOut);
  divIn.className = "modal-content";
  divOut.appendChild(divIn);
  divOut.id = "myModal";
  divOut.className = "modal";
  closeBtn.className = "btn btn-danger btn-sm close";
  closeBtn.id = "close";
  divIn.appendChild(closeBtn);
  divIn.appendChild(p);
  p.appendChild(text);
  closeBtn.appendChild(x);
}
let modal;
let span;
const btn = document.getElementById("myBtn");
btn.onclick = function() {
  generateModalWindow();
  modal = document.getElementById("myModal");
  modal.style.display = "block";
  span = document.getElementById("close");
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
