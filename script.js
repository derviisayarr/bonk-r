// Sepet Verileri
let cart = [];
let totalPrice = 0;

// Sepete Ürün Ekle
function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    totalPrice += productPrice;
    updateCartUI();
}

// Sepeti Güncelle
function updateCartUI() {
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');

    // Sepet Listesini Temizle
    cartList.innerHTML = '';

    // Sepeti Doldur
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₺${item.price}`;
        cartList.appendChild(li);
    });

    // Toplam Fiyatı Güncelle
    totalPriceElement.textContent = `Toplam: ₺${totalPrice}`;
}
