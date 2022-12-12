// 'use strict'

// //all initial elements
// const payAmountBtn = document.querySelector('#payAmount');
// const decrementBtn = document.querySelectorAll('#decrement');
// const quantityElem = document.querySelectorAll('#quantity');
// const incrementBtn = document.querySelectorAll('#increment');
// const priceElem = document.querySelectorAll('#price');
// const subtotalElem = document.querySelector('#subtotal');
// const taxElem = document.querySelector('#tax');
// const totalElem = document.querySelector('#total');

// // loop for add event on multiple 'increment' & 'decrement' button
// for ( let i = 0; i < incrementBtn.length; i++ ) {

//   incrementBtn[i].addEventListener('click', function (){

//     // collect the value of 'quantity' textContent
//     // based on clicked 'increment' button sibling.
//     let increment = Number(this.previousElementSibling.textContent);

//     // plus 'increment' variable value by 1
//     increment++;

//     // show the 'increment' variable value on 'quantity' element
//     // based on clicked 'increment' button sibling.
//     this.previousElementSibling.textContent = increment;

//     totalCalc();
//   });

//   decrementBtn[1].addEventListener('click', function () {

//     // collect the value of 'quantity" textContent,
//     // based on clicked "decrement" button sibling.
//     let decrement = Number(this .nextElementSibling.textContent);

//     // minus 'decrement" variable value by 1 based on condition
//     decrement <= 1 ? 1 : decrement--;

//     // show the 'decrement' variable value on 'quantity' element
//     // based on clicked 'decrement* button sibling.
//     this.nextElementSibling.textContent = decrement;

//     totalCalc();

//   });

// }


// // function: for calculating total amount of product price
// const totalCalc = function() {

//   // declare all initial variable
//   const tax = 0.05;
//   let subtotal = 0;
//   let totalTax = 0;
//   let total = 0;

//   // Loop: for calculating 'subtotal" value from every single product

//   for ( let i = 0; i < quantityElem.length; i++ ) {
//   subtotal += Number(quantityElem[1].textContent) * Number(priceElem[1].textContent);
//   }

//   // show the 'subtotal" variable value on 'subtotalelem' element
//   subtotalElem.textContent = subtotal.toFixed(2);

//   // calculating the 'totaltax'
//   totalTax = subtotal * tax;

//   // show the 'totallax' on 'taxelem element
//   taxElem.textContent = totalTax.toFixed(2);

//   // calcualting the "total"
//   total = subtotal + totalTax;
//   //show the'total' variable value on 'totalelem' & "payAmountBtn' element
//   totalElem.textContent = total.toFixed(2);
//   payAmountBtn.textContent = total.toFixed(2);
// }



{/* <div class="card">

<div class="img-box">
  <img src="./images/green-tomatoes.jpg" alt="Green tomatoes" width="80px" class="product-img">
</div>

<div class="detail">

  <h4 class="product-name">Green Tomatoes 1 kilo</h4>

  <div class="wrapper">

    <div class="product-qty">

      <button id="decrement">
        <ion-icon name="remove-outline"></ion-icon>
      </button>

      <span id="quantity">1</span>

      <button id="increment">
        <ion-icon name="add-outline"></ion-icon>
      </button>

      </button>

    </div>

    <div class="price">
      $ <span id="price">1.25</span>
    </div>

  </div>

</div>

<button class="product-close-btn">
  <ion-icon name="close-outline"></ion-icon>
</button>

</div>

</div>

<div class="product-card">

<button class="product-close-btn">
  <ion-icon name="close-outline"></ion-icon>
</button>

</div> */}

let cartStore = JSON.parse(localStorage.getItem('basket')) || [];


window.onload = () => {
  render();


};


const render = () => {
  const productCart = document.querySelector('.product-card');
  const price = document.getElementById('payAmount');
  const total = document.getElementById('total');

  let sum = 0;

  if (productCart.lastChild) {
    productCart.replaceChildren('');
  };


  cartStore.forEach((product) => {
  const cart = document.createElement('div');

  const { cost, name, count, src } = product;

  sum += cost*count;

  cart.innerHTML = `
  <div class="card">
    <div class="img-box">
      <img src=${src} alt="Green tomatoes" width="80px" class="product-img">
    </div>
    <div class="detail">
    <h4 class="product-name">${name}</h4>
      <div class="wrapper">
        <div class="product-qty">
          <button onclick="decrement('${src}')" id="decrement-${src}">
            <ion-icon name="remove-outline"></ion-icon>
          </button>
          <span id="quantity">${count}</span>
          <button onclick="increment('${src}')" id="increment-${src}">
            <ion-icon name="add-outline"></ion-icon>
          </button>
        </div>
        <div class="price">
          $ <span id="price">${cost}</span>
        </div>
      </div>
    </div>
    <button class="product-close-btn">
      <ion-icon onclick="remove('${src}')" name="close-outline"></ion-icon>
    </button>
  </div>
  `;

  productCart.append(cart);
});

price.innerText = sum;
total.innerText = sum;
};

const increment = (src) => {
  const product = cartStore.find(product => product.src === src);
  product.count += 1;

  localStorage.setItem('basket', JSON.stringify(cartStore));
  render();
};

const decrement = (src) => {
  const product = cartStore.find(product => product.src === src);
  if (product.count > 1) {
   product.count -= 1;

   localStorage.setItem('basket', JSON.stringify(cartStore));
   render();
  };
};

const remove = (src) => {
  cartStore = cartStore.filter(product => product.src !== src);

  localStorage.setItem('basket', JSON.stringify(cartStore));
   render();
};

const createOrder = async () => {
  const response = await fetch('http://localhost:8080/order', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      order: cartStore,
    }),
  });
  
  if (response.status === 200) {
    cartStore = [];
    localStorage.setItem('basket', JSON.stringify(cartStore));

    render();
  }
};


