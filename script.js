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
                <div class="product-actions">
                    <button onclick="addToFavorites(${product.id})" class="action-btn">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button onclick="addToCart(${product.id})" class="action-btn">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toFixed(2)} ₺</p>
                <p class="description">${product.description}</p>
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
const cartIcon = document.getElementById('cartIcon');
const closeCart = document.querySelector('.close-cart');

// Favoriler için değişkenler
const favoritesIcon = document.getElementById('favoritesIcon');
const favoritesModal = document.getElementById('favoritesModal');
const closeFavorites = document.querySelector('.close-favorites');
const favoritesItems = document.getElementById('favoritesItems');
const favoritesCount = document.getElementById('favoritesCount');

// Sepeti aç
cartIcon.addEventListener('click', () => {
    cartModal.style.display = 'block';
    setTimeout(() => {
        cartModal.classList.add('active');
    }, 10);
});

// Favorileri aç
favoritesIcon.addEventListener('click', () => {
    favoritesModal.style.display = 'block';
    setTimeout(() => {
        favoritesModal.classList.add('active');
    }, 10);
});

// Sepeti kapatma fonksiyonu
const closeCartModal = () => {
    cartModal.classList.remove('active');
    setTimeout(() => {
        cartModal.style.display = 'none';
    }, 300);
};

// Favorileri kapatma fonksiyonu
const closeFavoritesModal = () => {
    favoritesModal.classList.remove('active');
    setTimeout(() => {
        favoritesModal.style.display = 'none';
    }, 300);
};

// Sepeti kapat (çarpı işareti ile)
closeCart.addEventListener('click', closeCartModal);

// Favorileri kapat (çarpı işareti ile)
closeFavorites.addEventListener('click', closeFavoritesModal);

// Sepeti kapat (dışarı tıklama ile)
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        closeCartModal();
    }
});

// Favorileri kapat (dışarı tıklama ile)
favoritesModal.addEventListener('click', (e) => {
    if (e.target === favoritesModal) {
        closeFavoritesModal();
    }
});

// ESC tuşu ile kapatma
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (cartModal.classList.contains('active')) {
            closeCartModal();
        }
        if (favoritesModal.classList.contains('active')) {
            closeFavoritesModal();
        }
    }
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

// Fiyat aralığı sürgüsü için kod
document.addEventListener('DOMContentLoaded', function () {
    const rangeInput = document.querySelectorAll(".range-input input");
    const priceInput = document.querySelectorAll(".price-input input");
    const progress = document.querySelector(".slider .progress");
    const priceGap = 500; // Minimum fiyat farkı

    // Başlangıç değerlerini ayarla
    progress.style.left = "0%";
    progress.style.right = "0%";

    // Fiyat input'larını güncelleme fonksiyonu
    const updatePriceInputs = (minVal, maxVal) => {
        priceInput[0].value = minVal;
        priceInput[1].value = maxVal;
    };

    // Progress bar'ı güncelleme fonksiyonu
    const updateProgress = (minVal, maxVal) => {
        const minPercent = (minVal / rangeInput[0].max) * 100;
        const maxPercent = 100 - (maxVal / rangeInput[1].max) * 100;
        progress.style.left = minPercent + "%";
        progress.style.right = maxPercent + "%";
    };

    // Range input'ları için event listener
    rangeInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(rangeInput[0].value);
            let maxVal = parseInt(rangeInput[1].value);

            if (maxVal - minVal < priceGap) {
                if (e.target.className === "range-min") {
                    minVal = maxVal - priceGap;
                    rangeInput[0].value = minVal;
                } else {
                    maxVal = minVal + priceGap;
                    rangeInput[1].value = maxVal;
                }
            }

            updatePriceInputs(minVal, maxVal);
            updateProgress(minVal, maxVal);
        });
    });

    // Fiyat input'ları için event listener
    priceInput.forEach(input => {
        input.addEventListener("input", e => {
            let minVal = parseInt(priceInput[0].value);
            let maxVal = parseInt(priceInput[1].value);

            // Değer kontrolü
            if (minVal < 0) minVal = 0;
            if (maxVal > 5000) maxVal = 5000;
            if (minVal > maxVal - priceGap) {
                if (e.target.id === "minPrice") {
                    minVal = maxVal - priceGap;
                } else {
                    maxVal = minVal + priceGap;
                }
            }

            // Input değerlerini güncelle
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;

            // Range değerlerini güncelle
            rangeInput[0].value = minVal;
            rangeInput[1].value = maxVal;

            // Progress bar'ı güncelle
            updateProgress(minVal, maxVal);
        });
    });
});

// Sayfa yüklendiğinde ürünleri göster
displayProducts();

// Konfeti oluşturma ve animasyon fonksiyonları
function createConfetti(container) {
    const colors = ['red', 'blue', 'yellow', 'purple', 'green'];
    const confettiCount = 50; // Konfeti sayısı

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = `confetti ${colors[Math.floor(Math.random() * colors.length)]}`;

        // Rastgele pozisyon ve gecikme
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.animationDelay = Math.random() * 2 + 's';

        // Rastgele şekil (kare veya dikdörtgen)
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.width = Math.random() * 5 + 5 + 'px';
            confetti.style.height = Math.random() * 15 + 5 + 'px';
        }

        container.appendChild(confetti);

        // Animasyon bitince konfetileri temizle
        confetti.addEventListener('animationend', () => {
            confetti.remove();
        });
    }
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', function () {
    const promoButton = document.getElementById('promoButton');
    const confettiContainer = document.querySelector('.confetti-container');
    let isHovered = false;
    let confettiInterval;

    // Mouse üzerine geldiğinde
    promoButton.addEventListener('mouseenter', () => {
        isHovered = true;
        // İlk konfetileri oluştur
        createConfetti(confettiContainer);

        // Sürekli konfeti yağışı için interval
        confettiInterval = setInterval(() => {
            if (isHovered) {
                createConfetti(confettiContainer);
            }
        }, 1000); // Her saniyede yeni konfetiler
    });

    // Mouse ayrıldığında
    promoButton.addEventListener('mouseleave', () => {
        isHovered = false;
        clearInterval(confettiInterval);
    });
});

// Parıltı efekti için JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const promoButton = document.getElementById('promoButton');

    promoButton.addEventListener('mousemove', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';

        this.appendChild(sparkle);

        sparkle.addEventListener('animationend', function () {
            sparkle.remove();
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Sepet ve favoriler için değişkenler
    const cartIcon = document.getElementById('cartIcon');
    const cartModal = document.getElementById('cartModal');
    const closeCart = document.querySelector('.close-cart');
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    const favoritesIcon = document.getElementById('favoritesIcon');
    const favoritesModal = document.getElementById('favoritesModal');
    const closeFavorites = document.querySelector('.close-favorites');
    const favoritesItems = document.getElementById('favoritesItems');
    const favoritesCount = document.getElementById('favoritesCount');

    let cart = [];
    let favorites = [];

    // Sepete ürün ekleme fonksiyonu
    window.addToCart = function (productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        updateCart();
    };

    // Favorilere ürün ekleme fonksiyonu
    window.addToFavorites = function (productId) {
        const product = products.find(p => p.id === productId);
        const existingItem = favorites.find(item => item.id === productId);

        if (!existingItem) {
            favorites.push(product);
            updateFavorites();
        }
    };

    // Sepeti güncelleme fonksiyonu
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

    // Favorileri güncelleme fonksiyonu
    function updateFavorites() {
        favoritesCount.textContent = favorites.length;

        favoritesItems.innerHTML = favorites.map(item => `
            <div class="favorites-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="favorites-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toFixed(2)} ₺</p>
                </div>
                <span class="remove-item" onclick="removeFromFavorites(${item.id})">&times;</span>
            </div>
        `).join('');
    }

    // Sepetten ürün çıkarma
    window.removeFromCart = function (productId) {
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    };

    // Favorilerden ürün çıkarma
    window.removeFromFavorites = function (productId) {
        favorites = favorites.filter(item => item.id !== productId);
        updateFavorites();
    };

    // Başlangıç durumunu ayarla
    updateCart();
    updateFavorites();
});

// Select menüsü için JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const customSelect = document.getElementById('customSelect');
    if (!customSelect) return; // Eğer element bulunamazsa fonksiyondan çık

    const trigger = customSelect.querySelector('.select-trigger');
    const selectedText = trigger.querySelector('.selected');
    const options = customSelect.querySelectorAll('.option');
    let currentSort = 'popular'; // Varsayılan sıralama

    // Select menüsünü aç/kapa
    trigger.addEventListener('click', (e) => {
        e.stopPropagation(); // Event bubbling'i engelle
        customSelect.classList.toggle('active');
    });

    // Seçenek seçildiğinde
    options.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            selectedText.textContent = option.textContent;
            customSelect.classList.remove('active');
            currentSort = option.getAttribute('data-value');

            // Burada sıralama fonksiyonunu çağırabilirsiniz
            console.log('Seçilen sıralama:', currentSort);
        });
    });

    // Sayfa herhangi bir yerine tıklandığında menüyü kapat
    document.addEventListener('click', () => {
        customSelect.classList.remove('active');
    });
});
