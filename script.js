// Sepet Verileri
let cart = [];
let totalPrice = 0;

// Sepete Ürün Ekle
function addToCart(productName, productPrice) {
    // Sepet Verilerini Al
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Yeni Ürünü Sepete Ekle
    cart.push({ name: productName, price: productPrice });

    // Güncellenmiş Sepeti localStorage'e Kaydet
    localStorage.setItem("cart", JSON.stringify(cart));
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
document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById('cart-list')) {
        updateCartUI();
    }
});
function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartList = document.getElementById('cart-list');
    const totalPriceElement = document.getElementById('total-price');

    let totalPrice = 0;
    cartList.innerHTML = '';

    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ₺${item.price}`;
        cartList.appendChild(li);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = `Toplam: ₺${totalPrice}`;
}

// Sayfa Yüklendiğinde Sepeti Yükle
document.addEventListener("DOMContentLoaded", loadCart);

// Sepeti onayla butonuna tıklama olayını dinleyelim
document.getElementById('confirm-btn').addEventListener('click', function () {
    // Sepet elemanlarını temizle
    document.getElementById('cart-list').innerHTML = '';

    // Toplam fiyatı sıfırla
    document.getElementById('total-price').textContent = 'Toplam: ₺0';

    // Onay mesajını göster
    document.getElementById('confirmation-message').style.display = 'block';

    // 3 saniye sonra onay mesajını gizle
    setTimeout(function () {
        document.getElementById('confirmation-message').style.display = 'none';
    }, 3000);
});
