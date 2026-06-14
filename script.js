const products = [
  {
    id: 1,
    name: 'Waffle with Berries',
    category: 'Waffle',
    price: 6.5,
    image: 'assets/images/image-waffle-desktop.jpg'
  },
  {
    id: 2,
    name: 'Vanilla Bean Crème Brûlée',
    category: 'Crème Brûlée',
    price: 7.0,
    image: 'assets/images/image-creme-brulee-desktop.jpg'
  },
  {
    id: 3,
    name: 'Macaron Mix of Five',
    category: 'Macaron',
    price: 8.0,
    image: 'assets/images/image-macaron-desktop.jpg'
  },
  {
    id: 4,
    name: 'Classic Tiramisu',
    category: 'Tiramisu',
    price: 5.5,
    image: 'assets/images/image-tiramisu-desktop.jpg'
  },
  {
    id: 5,
    name: 'Pistachio Baklava',
    category: 'Baklava',
    price: 4.0,
    image: 'assets/images/image-baklava-desktop.jpg'
  },
  {
    id: 6,
    name: 'Lemon Meringue Pie',
    category: 'Pie',
    price: 5.0,
    image: 'assets/images/image-meringue-desktop.jpg'
  },
  {
    id: 7,
    name: 'Red Velvet Cake',
    category: 'Cake',
    price: 4.5,
    image: 'assets/images/image-cake-desktop.jpg'
  },
  {
    id: 8,
    name: 'Salted Caramel Brownie',
    category: 'Brownie',
    price: 4.5,
    image: 'assets/images/image-brownie-desktop.jpg'
  },
  {
    id: 9,
    name: 'Vanilla Panna Cotta',
    category: 'Panna Cotta',
    price: 6.5,
    image: 'assets/images/image-panna-cotta-desktop.jpg'
  }
];

const cart = {};
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const totalPrice = document.getElementById('totalPrice');
const cartFooter = document.getElementById('cartFooter');
const confirmOrderButton = document.getElementById('confirmOrder');

function renderProducts() {
  productsGrid.innerHTML = products
    .map(product => {
      const qty = cart[product.id] || 0;

      return `
        <div class="card">
          <div class="card-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="controls">
              ${qty === 0
                ? `<button type="button" class="add-btn" onclick="addToCart(${product.id})">Add to Cart</button>`
                : `
                  <div class="quantity">
                    <button type="button" onclick="decrease(${product.id})">-</button>
                    <span>${qty}</span>
                    <button type="button" onclick="increase(${product.id})">+</button>
                  </div>
                `}
            </div>
          </div>
          <div class="card-body">
            <p class="category">${product.category}</p>
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
          </div>
        </div>
      `;
    })
    .join('');
}

function addToCart(id) {
  cart[id] = 1;
  updateUI();
}

function increase(id) {
  cart[id] += 1;
  updateUI();
}

function decrease(id) {
  cart[id] -= 1;
  if (cart[id] <= 0) {
    delete cart[id];
  }
  updateUI();
}

function removeItem(id) {
  delete cart[id];
  updateUI();
}

function updateCart() {
  const ids = Object.keys(cart);

  if (!ids.length) {
    cartItems.innerHTML = `<p class="empty">Your added items will appear here.</p>`;
    cartFooter.classList.add('hidden');
    cartCount.textContent = '0';
    totalPrice.textContent = '$0.00';
    return;
  }

  cartFooter.classList.remove('hidden');

  let total = 0;
  let count = 0;

  cartItems.innerHTML = ids
    .map(id => {
      const product = products.find(p => p.id === Number(id));
      const qty = cart[id];
      const subtotal = qty * product.price;
      total += subtotal;
      count += qty;

      return `
        <div class="cart-item">
          <div class="cart-item-top">
            <strong>${product.name}</strong>
            <button type="button" class="remove-button" onclick="removeItem(${id})" aria-label="Remove ${product.name}">
              <img src="assets/images/icon-remove-item.svg" alt="Remove item">
            </button>
          </div>
          <span>${qty}x @ $${product.price.toFixed(2)} = <strong>$${subtotal.toFixed(2)}</strong></span>
        </div>
      `;
    })
    .join('');

  cartCount.textContent = count;
  totalPrice.textContent = `$${total.toFixed(2)}`;
}

function updateUI() {
  renderProducts();
  updateCart();
}

confirmOrderButton.addEventListener('click', () => {
  if (!Object.keys(cart).length) return;
  alert('Order confirmed!');
});

updateUI();
