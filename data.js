// data.js (ES6 module)

// Helper functions
const parsePrice = (priceStr) => parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
const matchPrice = (priceNum, filter) => {
  switch (filter) {
    case "5000":
      return priceNum < 10000;
    case "20000":
      return priceNum >= 10000 && priceNum <= 30000;
    case "45000":
      return priceNum > 30000;
    default:
      return true;
  }
};
const matchField = (value, filter) => (filter ? value === filter : true);

// Debounce utility
const debounce = (fn, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, args), delay);
  };
};

// DOM elements
const tableBody = document.getElementById("package-table");
const operatorFilter = document.getElementById("operator-filter");
const priceFilter = document.getElementById("price-filter");
const durationFilter = document.getElementById("duration-filter");
const dataFilter = document.getElementById("data-filter");
const modal = document.getElementById("details-modal");
const closeBtn = modal.querySelector(".close");
let packages = [];
let lastFocusedElement;

// Focus trap inside modal
function trapFocus(e) {
  const focusable = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === "Tab") {
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  } else if (e.key === "Escape") {
    closeModal();
  }
}

function openModal() {
  lastFocusedElement = document.activeElement;
  modal.showModal();
  closeBtn.focus();
  modal.addEventListener("keydown", trapFocus);
}

function closeModal() {
  modal.close();
  modal.removeEventListener("keydown", trapFocus);
  if (lastFocusedElement) lastFocusedElement.focus();
}

closeBtn.addEventListener("click", closeModal);
closeBtn.addEventListener("keydown", (e) => {
  if (["Enter", " "].includes(e.key)) {
    e.preventDefault();
    closeModal();
  }
});

function showDetails(pkg) {
  document.getElementById("details-text").textContent = pkg.details;
  const mobileActions = document.getElementById("mobile-actions");
  if (window.innerWidth <= 768) {
    mobileActions.querySelector(
      ".ussd-code"
    ).innerHTML = `کد دستوری: <bdo dir="ltr">${pkg.ussd}</bdo>`;
    mobileActions.querySelector(
      ".buy-button-container"
    ).innerHTML = `<a href="${pkg.link}" class="buy-button" tabindex="0">خرید</a>`;
  } else {
    mobileActions.querySelector(".ussd-code").innerHTML = "";
    mobileActions.querySelector(".buy-button-container").innerHTML = "";
  }
  openModal();
}

function renderError() {
  const existing = document.getElementById("retry-container");
  if (existing) existing.remove();
  const div = document.createElement("div");
  div.id = "retry-container";
  div.innerHTML = `
    <p class="error">خطا در بارگذاری بسته‌ها. لطفاً دوباره تلاش کنید.</p>
    <button id="retry-btn" class="buy-button">تلاش مجدد</button>
  `;
  document.body.insertBefore(div, document.querySelector("footer"));
  document.getElementById("retry-btn").addEventListener("click", fetchData);
}

function filterAndRender() {
  const op = operatorFilter.value;
  const pr = priceFilter.value;
  const du = durationFilter.value;
  const da = dataFilter.value;

  const fragment = document.createDocumentFragment();
  tableBody.innerHTML = "";

  packages
    .filter(
      (pkg) =>
        matchField(pkg.operator, op) &&
        matchPrice(parsePrice(pkg.price), pr) &&
        matchField(pkg.duration, du) &&
        (da ? pkg.data === parseInt(da, 10) : true)
    )
    .forEach((pkg) => {
      const row = document.createElement("tr");
      row.classList.add(`operator-${pkg.operator.replace(/\s+/g, "")}`);

      // Name cell
      const nameCell = document.createElement("td");
      const nameSpan = document.createElement("span");
      nameSpan.className = "package-name";
      nameSpan.textContent = pkg.name;
      nameSpan.tabIndex = 0;
      nameSpan.addEventListener("click", () => showDetails(pkg));
      nameSpan.addEventListener("keydown", (e) => {
        if (e.key === "Enter") showDetails(pkg);
      });
      nameCell.appendChild(nameSpan);

      // Other cells
      const priceCell = document.createElement("td");
      priceCell.textContent = pkg.price;
      const ussdCell = document.createElement("td");
      ussdCell.className = "desktop-only";
      ussdCell.innerHTML = `<bdo dir="ltr">${pkg.ussd}</bdo>`;
      const linkCell = document.createElement("td");
      linkCell.className = "desktop-only";
      linkCell.innerHTML = `<a href="${pkg.link}" class="buy-button" tabindex="0">خرید</a>`;

      [nameCell, priceCell, ussdCell, linkCell].forEach((c) =>
        row.appendChild(c)
      );
      fragment.appendChild(row);
    });

  tableBody.appendChild(fragment);
}

const debouncedFilter = debounce(filterAndRender, 200);

function fetchData() {
  fetch("packages.json")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((data) => {
      packages = data;
      debouncedFilter();
    })
    .catch((err) => {
      console.error("Error loading packages:", err);
      renderError();
    });
}

// Event listeners
[operatorFilter, priceFilter, durationFilter, dataFilter].forEach((el) =>
  el.addEventListener("change", debouncedFilter)
);

modal.addEventListener("click", (e) => {
  const r = modal.getBoundingClientRect();
  if (
    e.clientX < r.left ||
    e.clientX > r.right ||
    e.clientY < r.top ||
    e.clientY > r.bottom
  ) {
    closeModal();
  }
});

// Initialize
fetchData();
