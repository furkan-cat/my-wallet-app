"use strict";

//* Variables
const balance = document.getElementById("balance");
const addMoneyToBalance = document.querySelector(".add-balance");

const productName = document.getElementById("product_name");
const productSum = document.querySelector(".product-sum");

const productInputName = document.querySelector(".product-input-name");
const inputSum = document.querySelector(".input-sum");

const addProducts = document.getElementById("add_products");

const totalMoney = document.getElementById("total_sum");

const buy = document.getElementById("buy_btn");
const clear = document.getElementById("clear_btn");

// Triggered button "Para Ekle"
const keyBtn = (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    addMoneyToBalance.click();
    balance.innerText =
      Number(balance.innerText.split(" ")[0]) + Number(inputSum.value);
    balance.innerText = Number(balance.innerText).toFixed(2) + " TL";

    inputSum.value = "";
  }
};
inputSum.addEventListener("keyup", keyBtn);

//* Without triggered version
// const moneyInAcc = () => {
//   balance.innerText =
//     Number(balance.innerText.split(" ")[0]) + Number(inputSum.value);
//   balance.innerText = Number(balance.innerText).toFixed(2) + " TL";

//*Also there is a short way to execute same function with "handleClick()" by giving the event to HTML object.
// };
// moneyInAcc();

function Product(productInputName, inputSum) {
  this.productInputName = productInputName;
  this.inputSum = inputSum;
}

function UI() {}

UI.prototype.addProduct = (myProducts) => {
  const list1 = document.querySelector(".list1");
  const list2 = document.querySelector(".list2");
  console.log(list1, list2);

  const child1 = document.createElement("li");
  child1.innerHTML = `<li class="list-item list-product" id="product-name">${myProducts.productInputName}</li>`;
  list1.appendChild(child1);

  const child2 = document.createElement("li");
  child2.innerHTML = `<li class="list-item list-sum" id="product-sum">${myProducts.inputSum}</li>`;
  list2.appendChild(child2);
};

UI.prototype.showAlert = (msg, className) => {
  const div = document.createElement("div");
  div.className = `caution ${className}`;
  const text = document.createTextNode(msg);
  div.appendChild(text);

  const alert = document.querySelector(".alert");
  alert.appendChild(div);

  setTimeout(() => {
    document.querySelector(".caution").remove();
  }, 2000);
};

UI.prototype.totalSum = () => {
  totalMoney.innerText =
    Number(totalMoney.innerText.split(" ")[0]) +
    Number(inputSum.value) +
    Number(productSum.innerText);
  totalMoney.innerText = Number(totalMoney.innerText).toFixed(2) + " TL";
};

UI.prototype.buyProduct = () => {
  if (balance.innerText >= totalMoney.innerText) {
    balance.innerText =
      Number(balance.innerText.split(" ")[0]) -
      Number(totalMoney.innerText.split(" ")[0]);
    balance.innerText = Number(totalMoney.innerText).toFixed(2) + " TL";
    totalMoney.innerText = Number(totalMoney.innerText).toFixed(2) + " TL";
  }
};

UI.prototype.clearProducts = () => {
  let list1 = document.querySelector(".list1");
  let first1 = list1.firstElementChild;
  while (first1) {
    first1.remove();
    first1 = list1.firstElementChild;
  }

  let list2 = document.querySelector(".list2");
  let first2 = list2.firstElementChild;
  while (first2) {
    first2.remove();
    first2 = list2.firstElementChild;
  }
};

UI.prototype.clearInputs = () => {
  document.querySelector(".product-input-name").value = "";
  document.querySelector(".input-sum").value = "";
};

// Event Listeners
const addProductsToList = (e) => {
  const productInputName = document.querySelector(".product-input-name").value;
  const inputSum = document.querySelector(".input-sum").value;
  const myProducts = new Product(productInputName, inputSum);
  const ui = new UI();

  if (productInputName == "" || inputSum == "") {
    ui.showAlert("Please fill out required fields!", "fail");
  } else {
    // Add products
    ui.addProduct(myProducts);
    // Danger
    ui.showAlert("Product was successfully added!", "correct");
    // Totalsum
    ui.totalSum();
    // Buy product

    //Clear Inputs
    ui.clearInputs();
    //Clear Products
  }
  e.preventDefault();
};
addProducts.addEventListener("click", addProductsToList);

const buy = () => {
  const ui = new UI();
  // First check money in acc. If there is enough money pass operation
  ui.buyProduct();
  // After buying products clear the product list
};
buy.addEventListener("click", buy);

const clearProductsBtn = () => {
  const ui = new UI();
  ui.clearProducts();
};
clear.addEventListener("click", clearProductsBtn);
