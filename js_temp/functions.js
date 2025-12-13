const menuIcon = document.querySelector(".header__menu-icon");
const sideMenu = document.querySelector(".side-menu");
const closeMenu = document.querySelector(".side-menu__close");

menuIcon.addEventListener("click", () => {
  sideMenu.classList.add("show");
});

closeMenu.addEventListener("click", () => {
  sideMenu.classList.remove("show");
});

const cartIcon = document.querySelector(".header__cart-icon");
const cart = document.querySelector(".cart");
const cartItems = document.querySelector(".cart__items");
const badge = document.querySelector(".header__badge");

let cartCount = 0;
badge.innerText = cartCount;

cartIcon.addEventListener("click", () => {
  cart.classList.toggle("show");
});

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
