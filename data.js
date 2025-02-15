document.addEventListener("DOMContentLoaded", function () {
  const packages = [
    {
      name: "۶۰ مگابایت یک‌روزه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "2,140 تومان",
      ussd: "*۱۰۰*۱#",
      link: "#",
      data: 1,
      details: "بسته ۱ گیگ روزانه برای استفاده در شبکه همراه اول است.",
    },
    {
      name: "بسته ۵ گیگ هفتگی",
      operator: "ایرانسل",
      duration: "۷ روز",
      price: "۲۰۰۰۰ تومان",
      ussd: "*۵۵۵*۲#",
      link: "#",
      data: 5,
      details: "بسته ۵ گیگ هفتگی ایرانسل برای استفاده در مدت ۷ روز.",
    },
    {
      name: "بسته ۱۰ گیگ ماهانه",
      operator: "رایتل",
      duration: "۳۰ روز",
      price: "۴۵۰۰۰ تومان",
      ussd: "*۷۸۰*۳#",
      link: "#",
      data: 10,
      details: "بسته ۱۰ گیگ ماهانه رایتل برای استفاده در مدت ۳۰ روز.",
    },
  ];

  const operatorColors = {
    "همراه اول": "#54C5D0",
    ایرانسل: "#FEBE10",
    رایتل: "#941063",
  };

  const tableBody = document.getElementById("package-table");
  const operatorFilter = document.getElementById("operator-filter");
  const priceFilter = document.getElementById("price-filter");
  const durationFilter = document.getElementById("duration-filter");
  const dataFilter = document.getElementById("data-filter");

  function showDetails(pkg) {
    const modal = document.getElementById("details-modal");
    const detailsText = document.getElementById("details-text");
    const mobileActions = document.getElementById("mobile-actions");
    const ussdCode = mobileActions.querySelector(".ussd-code");
    const buyButtonContainer = mobileActions.querySelector(
      ".buy-button-container"
    );

    // نمایش جزئیات
    detailsText.textContent = pkg.details;

    // نمایش اطلاعات اضافی در نسخه موبایل
    if (window.innerWidth <= 768) {
      ussdCode.innerHTML = `کد دستوری: <bdo dir="ltr">${pkg.ussd}</bdo>`;
      buyButtonContainer.innerHTML = `<a href="${pkg.link}" class="buy-button">خرید</a>`;
    } else {
      ussdCode.innerHTML = "";
      buyButtonContainer.innerHTML = "";
    }

    modal.style.display = "block";
  }

  function filterPackages() {
    const operator = operatorFilter.value;
    const price = priceFilter.value;
    const duration = durationFilter.value;
    const data = dataFilter.value;

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

      return matchesOperator && matchesPrice && matchesDuration && matchesData;
    });

    tableBody.innerHTML = "";

    filteredPackages.forEach((pkg) => {
      const row = document.createElement("tr");
      row.style.backgroundColor = operatorColors[pkg.operator] || "#ffffff";

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

      // اضافه کردن سایر سلول‌ها
      const priceCell = document.createElement("td");
      priceCell.textContent = pkg.price;

      const ussdCell = document.createElement("td");
      ussdCell.className = "desktop-only";
      ussdCell.innerHTML = `<bdo dir="ltr">${pkg.ussd}</bdo>`;

      const linkCell = document.createElement("td");
      linkCell.className = "desktop-only";
      linkCell.innerHTML = `<a href="${pkg.link}" class="buy-button">خرید</a>`;

      // اضافه کردن همه سلول‌ها به ردیف
      row.appendChild(nameCell);
      row.appendChild(priceCell);
      row.appendChild(ussdCell);
      row.appendChild(linkCell);

      tableBody.appendChild(row);
    });
  }

  // اضافه کردن event listeners
  operatorFilter.addEventListener("change", filterPackages);
  priceFilter.addEventListener("change", filterPackages);
  durationFilter.addEventListener("change", filterPackages);
  dataFilter.addEventListener("change", filterPackages);

  // بستن مودال
  document
    .querySelector(".modal .close")
    .addEventListener("click", function () {
      document.getElementById("details-modal").style.display = "none";
    });

  window.addEventListener("click", function (event) {
    const modal = document.getElementById("details-modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // نمایش اولیه بسته‌ها
  filterPackages();
});
