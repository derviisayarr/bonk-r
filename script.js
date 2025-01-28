// Örnek ürün verileri
const products = [
    {
        id: 1,
        name: "Akıllı Telefon",
        price: 4999.99,
        category: "electronics",
        image: "https://via.placeholder.com/300",
        description: "Son model akıllı telefon"
    },
    {
        id: 2,
        name: "Laptop",
        price: 7999.99,
        category: "electronics",
        image: "https://via.placeholder.com/300",
        description: "Güçlü performanslı laptop"
    },
    // Daha fazla ürün eklenebilir
];

let cart = [];
let currentCategory = 'all';
let currentSort = 'default';
let maxPrice = 1000;

// DOM Elements
const productsContainer = document.getElementById('productsContainer');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const searchInput = document.getElementById('searchInput');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const sortSelect = document.getElementById('sortSelect');

// Ürünleri görüntüleme fonksiyonu
function displayProducts() {
    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesPrice = product.price <= maxPrice;
        const matchesSearch = product.name.toLowerCase().includes(searchInput.value.toLowerCase());
        return matchesCategory && matchesPrice && matchesSearch;
    });

    // Sıralama
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (currentSort) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name':
                return a.name.localeCompare(b.name);
            default:
                return 0;
        }
    });

    productsContainer.innerHTML = sortedProducts.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toFixed(2)} ₺</p>
                <p class="description">${product.description}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Sepete Ekle</button>
            </div>
        </div>
    `).join('');
}

// Sepete ürün ekleme
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

// Sepeti güncelleme
function updateCart() {
    cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${item.price.toFixed(2)} ₺ x ${item.quantity}</p>
            </div>
            <span class="remove-item" onclick="removeFromCart(${item.id})">&times;</span>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total.toFixed(2)}₺`;
}

// Sepetten ürün çıkarma
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Event Listeners
document.getElementById('cartIcon').addEventListener('click', () => {
    cartModal.style.display = 'block';
});

document.querySelector('.close-cart').addEventListener('click', () => {
    cartModal.style.display = 'none';
});

searchInput.addEventListener('input', displayProducts);

priceRange.addEventListener('input', (e) => {
    maxPrice = Number(e.target.value);
    priceValue.textContent = `${maxPrice}₺`;
    displayProducts();
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    displayProducts();
});

document.querySelectorAll('.categories a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.categories a.active').classList.remove('active');
        e.target.classList.add('active');
        currentCategory = e.target.dataset.category;
        displayProducts();
    });
});

// Sayfa yüklendiğinde ürünleri göster
displayProducts();
