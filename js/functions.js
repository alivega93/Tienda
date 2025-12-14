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
// Carrito con overlay y modal
// -----------------------------
const cartIcon = document.querySelector(".header__cart-icon");
const cart = document.querySelector(".cart");
const cartItems = document.querySelector(".cart__items");
const badge = document.querySelector(".header__badge");
const overlay = document.querySelector(".cart-overlay");

let cartCount = 0;
badge.innerText = cartCount;

// Funciones abrir/cerrar
function openCart() {
  cart.classList.add("show");
  overlay.classList.add("show");
}

function closeCart() {
  cart.classList.remove("show");
  overlay.classList.remove("show");
}

// Eventos
cartIcon.addEventListener("click", openCart);
overlay.addEventListener("click", closeCart);

// Botón de cerrar dentro del carrito
const closeBtn = document.createElement("span");
closeBtn.textContent = "✖";
closeBtn.classList.add("cart-close");
closeBtn.style.cursor = "pointer";
closeBtn.style.fontSize = "1.2rem";
closeBtn.style.position = "absolute";
closeBtn.style.top = "10px";
closeBtn.style.right = "15px";
cart.appendChild(closeBtn);

closeBtn.addEventListener("click", closeCart);

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

// Botones de agregar al carrito
document.querySelectorAll(".product-card").forEach(product => {
  const btn = document.createElement("button");
  btn.innerText = "Agregar al carrito";
  btn.classList.add("add-cart");
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
const filterButtons = document.querySelectorAll(".filters button");
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
// Formulario de contacto
// -----------------------------
const formSection = document.querySelector(".form__body");
const btnShowForm = document.querySelector(".form__btn--show");
const btnHideForm = document.querySelector(".form__btn--hide");
const btnSendForm = document.querySelector(".form__btn--send");
const contactoLink = document.querySelector(".side-menu__link[href='#contact']");
const contactoTitle = document.querySelector(".form__title");

function showForm() {
  formSection.classList.add("is-open");
  btnShowForm.style.display = "none";
  btnHideForm.style.display = "inline-block";
}

function hideForm() {
  formSection.classList.remove("is-open");
  btnShowForm.style.display = "inline-block";
  btnHideForm.style.display = "none";
}

btnShowForm.addEventListener("click", showForm);
btnHideForm.addEventListener("click", hideForm);
btnSendForm.addEventListener("click", hideForm);

contactoLink.addEventListener("click", (e) => {
  e.preventDefault();
  showForm();
  sideMenu.classList.remove("show");
});

contactoTitle.addEventListener("click", showForm);

hideForm();
