// data.js

document.addEventListener("DOMContentLoaded", function () {
  fetch("packages.json")
    .then((response) => response.json())
    .then((packages) => {
      const tableBody = document.getElementById("package-table");
      const operatorFilter = document.getElementById("operator-filter");
      const priceFilter = document.getElementById("price-filter");
      const durationFilter = document.getElementById("duration-filter");
      const dataFilter = document.getElementById("data-filter");
      const modal = document.getElementById("details-modal");
      const closeBtn = modal.querySelector(".close");
      let lastFocusedElement;

      // مدیریت تله‌گذاری فوکوس داخل مودال
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

      // باز و بسته کردن مودال با حفظ فوکوس قبلی
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

      // دکمه بستن مودال
      closeBtn.addEventListener("click", closeModal);
      closeBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          closeModal();
        }
      });

      // نمایش جزئیات و باز کردن مودال
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

      // فیلتر و رندر جدول
      function filterPackages() {
        const op = operatorFilter.value;
        const pr = priceFilter.value;
        const du = durationFilter.value;
        const da = dataFilter.value;
        const fragment = document.createDocumentFragment();

        tableBody.innerHTML = "";
        packages
          .filter((pkg) => {
            const priceNum = parseInt(pkg.price.replace(/[^0-9]/g, ""));
            const okOp = op ? pkg.operator === op : true;
            const okPr =
              pr === "5000"
                ? priceNum < 10000
                : pr === "20000"
                ? priceNum >= 10000 && priceNum <= 30000
                : pr === "45000"
                ? priceNum > 30000
                : true;
            const okDu = du ? pkg.duration === du : true;
            const okDa = da ? pkg.data === parseInt(da) : true;
            return okOp && okPr && okDu && okDa;
          })
          .forEach((pkg) => {
            const row = document.createElement("tr");
            row.classList.add(`operator-${pkg.operator.replace(/\s+/g, "")}`);

            // نام بسته کلیک‌پذیر و کیبوردپذیر
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

      // لیسنرهای فیلتر
      [operatorFilter, priceFilter, durationFilter, dataFilter].forEach((el) =>
        el.addEventListener("change", filterPackages)
      );

      // بستن مودال با کلیک بیرون
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

      // رندر اولیه
      filterPackages();
    })
    .catch((err) => {
      console.error("Error loading packages:", err);
    });
});
