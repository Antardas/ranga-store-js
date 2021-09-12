const buyMessage = document.getElementById('buy-message');

const loadProducts = () => {
  document.getElementById('all-products').textContent = '';
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
  const searchFeild = document.getElementById('input-field').value;

  if (searchFeild) {
    const url = `https://fakestoreapi.com/products`
    fetch(url)
      .then((response) => response.json())
      .then((data) => showProducts(data));
  }

};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {

    // Destrcturing Object
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="clr-orange">${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ <span class="clr-orange">${product.price}</span> </h2>
      <h5>⭐<span>${product.rating.rate}</span>(${product.rating.count})</h5>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now ">Add to Cart</button>
      <button id="details-btn" onclick="getProduct(${product.id})" class="btn btn-danger">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value;
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");

  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
  updateTotal(); // Update Total Price After adding each product
};

//grandTotal update function
const updateTotal = () => {

  const grandTotal =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
  buyMessage.innerText = '';
};
// Get Prodocut usign Id
const getProduct =(id) => {

  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => productDetailShow(data));
}

// Show Product Deatil in UI
const productDetailShow = (product) => {
  const productDetail = document.getElementById('product-detail');
  productDetail.textContent = '';
  const div = document.createElement('div');
  div.className = 'preview-product'
  div.innerHTML = `
    <div>
      <img class="product-image" src=${product.image}></img>
    </div>
    <div>
    <h3 class="clr-orange">${product.title}</h3>
    <p>Category: ${product.category}</p>
    <p>${product.description}</p>
    <h5>⭐<span>${product.rating.rate}</span>(${product.rating.count})</h5>
    </div>
      `;
  productDetail.appendChild(div);
  buyMessage.innerText = '';
  
}
// Show message Buy Now Product
document.getElementById('buy').addEventListener('click', () => {
  document.getElementById("total-Products").innerText = 0;
  document.getElementById("price").innerText = 0;
  document.getElementById("delivery-charge").innerText = 0;
  document.getElementById("total-tax").innerText = 0;
  document.getElementById("total").innerText = 0;
  buyMessage.innerText = 'Thanks for purchasing our product!!!';
})
