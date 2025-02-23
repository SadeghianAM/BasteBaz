document.addEventListener("DOMContentLoaded", function () {
  // بارگذاری داده‌ها از فایل JSON
  fetch("packages.json")
    .then((response) => response.json())
    .then((packages) => {
      // تعریف رنگ‌ها برای اپراتورها
      const operatorColors = {
        "همراه اول": "#54C5D0",
        ایرانسل: "#FEBE10",
        رایتل: "#941063",
      };

      // انتخاب المان‌ها
      const tableBody = document.getElementById("package-table");
      const operatorFilter = document.getElementById("operator-filter");
      const priceFilter = document.getElementById("price-filter");
      const durationFilter = document.getElementById("duration-filter");
      const dataFilter = document.getElementById("data-filter");

      // تابع نمایش جزئیات بسته
      function showDetails(pkg) {
        const modal = document.getElementById("details-modal");
        const detailsText = document.getElementById("details-text");
        const mobileActions = document.getElementById("mobile-actions");
        const ussdCode = mobileActions.querySelector(".ussd-code");
        const buyButtonContainer = mobileActions.querySelector(
          ".buy-button-container"
        );

        // نمایش جزئیات بسته
        detailsText.textContent = pkg.details;

        // نمایش اطلاعات اضافی در نسخه موبایل
        if (window.innerWidth <= 768) {
          ussdCode.innerHTML = `کد دستوری: <bdo dir="ltr">${pkg.ussd}</bdo>`;
          buyButtonContainer.innerHTML = `<a href="${pkg.link}" class="buy-button">خرید</a>`;
        } else {
          ussdCode.innerHTML = "";
          buyButtonContainer.innerHTML = "";
        }

        // نمایش مودال
        modal.style.display = "block";
      }

      // تابع فیلتر بسته‌ها
      function filterPackages() {
        const operator = operatorFilter.value;
        const price = priceFilter.value;
        const duration = durationFilter.value;
        const data = dataFilter.value;

        // فیلتر کردن بسته‌ها بر اساس شرایط
        const filteredPackages = packages.filter((pkg) => {
          const pkgPrice = parseInt(pkg.price.replace(/[^0-9]/g, ""));
          const matchesOperator = operator ? pkg.operator === operator : true;
          const matchesPrice =
            price === "5000"
              ? pkgPrice < 10000
              : price === "20000"
              ? pkgPrice >= 10000 && pkgPrice <= 30000
              : price === "45000"
              ? pkgPrice > 30000
              : true;
          const matchesDuration = duration
            ? parseInt(pkg.duration.split(" ")[0]) === parseInt(duration)
            : true;
          const matchesData = data ? pkg.data === parseInt(data) : true;

          return (
            matchesOperator && matchesPrice && matchesDuration && matchesData
          );
        });

        // پاک کردن جدول قبلی
        tableBody.innerHTML = "";

        // ایجاد ردیف‌های جدید برای بسته‌های فیلتر شده
        filteredPackages.forEach((pkg) => {
          const row = document.createElement("tr");
          row.style.backgroundColor = operatorColors[pkg.operator] || "#ffffff";

          // اضافه کردن کلاس خاص برای رایتل
          if (pkg.operator === "رایتل") {
            row.classList.add("tr-raitel");
          }

          // ایجاد سلول نام بسته با قابلیت کلیک
          const nameCell = document.createElement("td");
          const nameSpan = document.createElement("span");
          nameSpan.className = "package-name";
          nameSpan.textContent = pkg.name;
          nameSpan.onclick = () => showDetails(pkg);
          nameCell.appendChild(nameSpan);

          // ایجاد سلول قیمت
          const priceCell = document.createElement("td");
          priceCell.textContent = pkg.price;

          // ایجاد سلول کد دستوری برای دسکتاپ
          const ussdCell = document.createElement("td");
          ussdCell.className = "desktop-only";
          ussdCell.innerHTML = `<bdo dir="ltr">${pkg.ussd}</bdo>`;

          // ایجاد سلول لینک خرید برای دسکتاپ
          const linkCell = document.createElement("td");
          linkCell.className = "desktop-only";
          linkCell.innerHTML = `<a href="${pkg.link}" class="buy-button">خرید</a>`;

          // اضافه کردن سلول‌ها به ردیف
          row.appendChild(nameCell);
          row.appendChild(priceCell);
          row.appendChild(ussdCell);
          row.appendChild(linkCell);

          // اضافه کردن ردیف به جدول
          tableBody.appendChild(row);
        });
      }

      // اضافه کردن event listeners به فیلترها
      operatorFilter.addEventListener("change", filterPackages);
      priceFilter.addEventListener("change", filterPackages);
      durationFilter.addEventListener("change", filterPackages);
      dataFilter.addEventListener("change", filterPackages);

      // بستن مودال هنگام کلیک روی دکمه بستن
      document
        .querySelector(".modal .close")
        .addEventListener("click", function () {
          document.getElementById("details-modal").style.display = "none";
        });

      // بستن مودال هنگام کلیک در بیرون مودال
      window.addEventListener("click", function (event) {
        const modal = document.getElementById("details-modal");
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });

      // نمایش بسته‌ها به صورت پیش‌فرض
      filterPackages();
    })
    .catch((error) => {
      // مدیریت خطا در بارگذاری داده‌ها
      console.error("Error loading packages data:", error);
    });
});
