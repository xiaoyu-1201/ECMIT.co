let cart = [];
let total = 0;
const imageSets = {
    1: ['images/product1-1.jpg', 'images/product1-2.jpg'],
    2: ['images/product2-1.jpg', 'images/product2-2.jpg']
};
let currentIndices = { 1: 0, 2: 0 };

// 加入購物車
function addToCart(itemName, price) {
    cart.push({ name: itemName, price: price });
    total += price;
    updateCart();
}

// 更新購物車
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const totalDisplay = document.getElementById('total');
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        cartItems.appendChild(li);
    });
    totalDisplay.textContent = total.toFixed(2);
}

// 更換圖片
function changeImage(mainImageId, newSrc) {
    const mainImage = document.getElementById(mainImageId);
    if (mainImage) {
        mainImage.src = newSrc;
    }
}

// 上一張圖片
function prevImage(mainImageId, productId) {
    currentIndices[productId] = (currentIndices[productId] - 1 + imageSets[productId].length) % imageSets[productId].length;
    changeImage(mainImageId, imageSets[productId][currentIndices[productId]]);
}

// 下一張圖片
function nextImage(mainImageId, productId) {
    currentIndices[productId] = (currentIndices[productId] + 1) % imageSets[productId].length;
    changeImage(mainImageId, imageSets[productId][currentIndices[productId]]);
}

// 自動輪播圖片
let interval1 = setInterval(() => nextImage('main-image-1', 1), 3000);
let interval2 = setInterval(() => nextImage('main-image-2', 2), 3000);

// 停止輪播
function stopSlideshow() {
    clearInterval(interval1);
    clearInterval(interval2);
}

// 點擊圖片停止輪播
document.querySelectorAll(".product img").forEach(img => {
    img.addEventListener("click", stopSlideshow);
});

// 即時搜尋功能
document.getElementById("search-input").addEventListener("input", searchProducts);

function searchProducts() {
    let query = document.getElementById("search-input").value.toLowerCase();
    let products = document.querySelectorAll(".product");
    let found = false;

    products.forEach(product => {
        let name = product.querySelector("h2").textContent.toLowerCase();
        if (name.includes(query)) {
            product.style.display = "block";
            found = true;
        } else {
            product.style.display = "none";
        }
    });

    document.getElementById("no-results").style.display = found ? "none" : "block";
}

// 運費計算
function calculateShipping() {
    let zip = document.getElementById("zipcode").value;
    let validZip = /^[0-9]{3,5}$/.test(zip);
    let cost = validZip ? "運費：60元" : "請輸入正確的郵遞區號";
    document.getElementById("shipping-cost").textContent = cost;
}

// 促銷彈窗
window.onload = function() {
    setTimeout(() => {
        let popup = document.getElementById("promo-popup");
        if (popup) {
            popup.style.display = "block";
        }
    }, 2000);
};

// 顯示 Toast 訊息
function showToast(message) {
    let toast = document.createElement("div");
    toast.className = "toast-message";
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 等待 DOM 內容載入後，綁定事件
document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".add-to-wishlist").forEach(button => {
        button.addEventListener("click", function() {
            let product = this.parentElement.querySelector("h2").textContent;
            let wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

            if (!wishlist.includes(product)) {
                wishlist.push(product);
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
                showToast("已加入願望清單！");
            } else {
                showToast("此商品已在願望清單中！");
            }
        });
    });
});
