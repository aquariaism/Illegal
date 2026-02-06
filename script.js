const products = [
    {
        id: 1,
        name: "Davidoff Classic",
        description: "A premium blend of the finest tobaccos for a rich, smooth taste. Switzerland's finest.",
        price: 550,
        image: "https://images.unsplash.com/photo-1558285549-2a9699632359?auto=format&fit=crop&q=80&w=800",
        category: "cigarette"
    },
    {
        id: 2,
        name: "Sobranie Black Russian",
        description: "Exclusive cocktail cigarettes with distinct black paper and gold filter. A legendary ritual.",
        price: 850,
        image: "https://images.unsplash.com/photo-1626246949363-2646d6542127?auto=format&fit=crop&q=80&w=800",
        category: "cigarette"
    },
    {
        id: 3,
        name: "Dunhill International",
        description: "The gold standard of tobacco quality and British craftsmanship since 1907.",
        price: 600,
        image: "https://images.unsplash.com/photo-1527267207156-3392b8d96d2e?auto=format&fit=crop&q=80&w=800",
        category: "cigarette"
    },
    {
        id: 4,
        name: "Red Bull Energy",
        description: "Vitalizes body and mind. The classic Austrian energy boost for the modern elite.",
        price: 125,
        image: "images/drinks/redbull01.webp",
        category: "drink"
    },
    {
        id: 5,
        name: "Monster Energy Ultra",
        description: "Zero sugar, light refreshing citrus flavor. Sophisticated energy without the compromise.",
        price: 110,
        image: "images/drinks/monsterWhite.webp",
        category: "drink"
    },
    {
        id: 6,
        name: "Perrier Sparking",
        description: "Natural mineral water captured at the source in France. The ultimate palate cleanser.",
        price: 180,
        image: "images/drinks/ocean.webp",
        category: "drink"
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function verifyAge() {
    const modal = document.getElementById('age-modal');
    modal.classList.add('hidden');
    setTimeout(() => modal.style.display = 'none', 500);
    localStorage.setItem('ageVerified', 'true');
}

// Check verification on load
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('ageVerified') === 'true') {
        document.getElementById('age-modal').style.display = 'none';
    }
});

function renderProducts() {
    const cigGrid = document.getElementById('cigarette-grid');
    const drinkGrid = document.getElementById('drink-grid');
    if (!cigGrid || !drinkGrid) return;
    
    cigGrid.innerHTML = '';
    drinkGrid.innerHTML = '';

    products.forEach(p => {
        const card = `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${p.image}" alt="${p.name}" class="product-image">
                </div>
                <div class="product-info">
                    <h3>${p.name}</h3>
                    <p>${p.description}</p>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 1rem;">
                        <span class="price">₹${p.price}</span>
                        <button onclick="addToCart(${p.id})" class="btn-secondary">Add to Selection</button>
                    </div>
                </div>
            </div>
        `;
        if (p.category === 'cigarette') cigGrid.innerHTML += card;
        else drinkGrid.innerHTML += card;
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCart();
    if (!document.getElementById('cart-drawer').classList.contains('active')) {
        toggleCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    
    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = '';
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div style="flex-grow: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <h4 style="font-family: var(--font-display); font-size: 1.1rem; margin:0;">${item.name}</h4>
                        <button onclick="removeFromCart(${index})" style="background:none; border:none; color:#999; cursor:pointer; padding:0;"><i data-lucide="trash-2" style="width:16px;"></i></button>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem;">
                        <span style="font-weight: 700; color: #000;">₹${item.price}</span>
                        <div style="display: flex; align-items: center; gap: 1rem;">
                            <button onclick="updateQty(${index}, -1)" class="btn-secondary" style="padding: 2px 10px; font-size: 14px;">-</button>
                            <span style="font-weight: 600; min-width: 20px; text-align: center;">${item.quantity}</span>
                            <button onclick="updateQty(${index}, 1)" class="btn-secondary" style="padding: 2px 10px; font-size: 14px;">+</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    cartTotal.innerText = `₹${total}`;
    cartCount.innerText = count;
    localStorage.setItem('cart', JSON.stringify(cart));
    lucide.createIcons();
}

function updateQty(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity < 1) cart.splice(index, 1);
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    if (drawer) drawer.classList.toggle('active');
}

function checkout() {
    if (cart.length === 0) return;
    alert('Thank you for choosing NOIR. Your selection is being prepared. (Demo Only)');
    cart = [];
    updateCart();
    toggleCart();
}

function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(r => {
        const windowHeight = window.innerHeight;
        const revealTop = r.getBoundingClientRect().top;
        if (revealTop < windowHeight - 50) {
            r.classList.add('active');
        }
    });
}

window.addEventListener("scroll", reveal);
window.onload = () => {
    renderProducts();
    updateCart();
    reveal();
};

function toggleMenu() {
    document.getElementById("mobile-menu").classList.toggle("active");
}
// function toggleMenu() {
//     const menu = document.getElementById("mobile-menu");
//     menu.classList.toggle("active");

//     document.body.style.overflow =
//         menu.classList.contains("active") ? "hidden" : "auto";
// }

document.querySelectorAll("#mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
        const menu = document.getElementById("mobile-menu");
        menu.classList.remove("active");
    });
});

document.querySelectorAll("#nav-links a").forEach(link => {
    link.addEventListener("click", () => {

        // remove active from all
        document.querySelectorAll("#nav-links a")
            .forEach(l => l.classList.remove("active"));

        // add active to clicked one
        link.classList.add("active");
    });
});

gsap.registerPlugin(ScrollTrigger);

const track = document.querySelector(".horizontal-track");

gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: ".horizontal-section",
        start: "top top",
        end: () => "+=" + (track.scrollWidth - window.innerWidth),
        scrub: 1,
        pin: true,
        anticipatePin: 1
    }
});
