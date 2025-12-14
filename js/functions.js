// -----------------------------
// Menú lateral
// -----------------------------
const menuIcon = document.querySelector(".header__menu-icon");
const sideMenu = document.querySelector(".side-menu");
const closeMenu = document.querySelector(".side-menu__close");

menuIcon.addEventListener("click", () => {
  sideMenu.classList.add("show");
});

closeMenu.addEventListener("click", () => {
  sideMenu.classList.remove("show");
});

// -----------------------------
// Carrito panel lateral
// -----------------------------
const cartIcon = document.querySelector(".header__cart-icon");
const cart = document.querySelector(".cart");
const cartItems = document.querySelector(".cart__items");
const badge = document.querySelector(".header__badge");

let cartCount = 0;
badge.innerText = cartCount;

// ✅ Abrir/cerrar carrito
cartIcon.addEventListener("click", () => {
  cart.classList.toggle("show");
});

// -----------------------------
// Lógica de carrito
// -----------------------------
function getItemPrice(item) {
  const priceP = item.querySelector("p");
  if (!priceP) return 0;
  const numeric = priceP.innerText.replace(/[^\d]/g, "");
  return parseInt(numeric || "0", 10);
}

function updateTotal() {
  let total = 0;
  cartItems.querySelectorAll("div").forEach(item => {
    total += getItemPrice(item);
  });
  const totalEl = document.querySelector(".cart__total");
  if (totalEl) totalEl.innerText = "Total: $" + total;
}

function addToCart({ imgSrc, name, priceText }) {
  const item = document.createElement("div");
  item.innerHTML = `
    <img src="${imgSrc}" alt="${name}">
    <h4>${name}</h4>
    <p>${priceText}</p>
    <img src="img/quitar.png" alt="Quitar producto" class="delete-icon">
  `;
  cartItems.appendChild(item);

  cartCount++;
  badge.innerText = cartCount;
  updateTotal();
}

// Eliminar producto
cartItems.addEventListener("click", (e) => {
  const target = e.target;
  if (!target.classList.contains("delete-icon")) return;

  const item = target.closest("div");
  if (!item) return;

  item.remove();
  cartCount = Math.max(0, cartCount - 1);
  badge.innerText = cartCount;
  updateTotal();
});

// -----------------------------
// Botones de agregar al carrito
// -----------------------------
document.querySelectorAll(".product-card").forEach(product => {
  const btn = document.createElement("button");
  btn.innerText = "Agregar al carrito";
  btn.classList.add("btn", "product-card__btn");
  product.appendChild(btn);

  btn.addEventListener("click", () => {
    const name = product.querySelector(".product-card__title").innerText;
    const priceText = product.querySelector(".product-card__price").innerText;
    const imgSrc = product.querySelector(".product-card__image").src;

    addToCart({ imgSrc, name, priceText });
  });
});

// -----------------------------
// Filtros de productos
// -----------------------------
const filterButtons = document.querySelectorAll(".filters .btn");
const productArticles = document.querySelectorAll(".product-card");

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    productArticles.forEach(article => {
      const name = article.querySelector(".product-card__title").innerText;
      if (filter === "all" || name.toLowerCase().includes(filter.toLowerCase())) {
        article.style.display = "block";
      } else {
        article.style.display = "none";
      }
    });
  });
});

// -----------------------------
// Formulario contacto
// -----------------------------
const showFormBtn = document.querySelector(".show-form");
const hideFormBtn = document.querySelector(".hide-form");
const contactForm = document.querySelector(".contact form");
const contactTitle = document.querySelector(".form__title");

// Inicialmente ocultamos el botón de "Ocultar"
hideFormBtn.style.display = "none";

// Mostrar formulario desde el botón
showFormBtn.addEventListener("click", () => {
  contactForm.classList.add("is-open");
  showFormBtn.style.display = "none";
  hideFormBtn.style.display = "inline-block";
});

// Ocultar formulario desde el botón
hideFormBtn.addEventListener("click", () => {
  contactForm.classList.remove("is-open");
  hideFormBtn.style.display = "none";
  showFormBtn.style.display = "inline-block";
});

// ✅ Mostrar formulario al hacer clic en el título "Contacto"
contactTitle.addEventListener("click", () => {
  contactForm.classList.add("is-open");
  showFormBtn.style.display = "none";
  hideFormBtn.style.display = "inline-block";
});
