document.addEventListener("DOMContentLoaded", function () {
  const packages = [
    {
      name: "بسته ۱ گیگ روزانه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "۵۰۰۰ تومان",
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

  // رنگ‌های سازمانی اپراتورها
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

  function showDetails(packageName) {
    const pkg = packages.find((p) => p.name === packageName);
    const modal = document.getElementById("details-modal");
    const detailsText = document.getElementById("details-text");

    // قرار دادن جزئیات بسته درون تگ <p>
    detailsText.textContent = pkg.details;
    // نمایش مودال
    modal.style.display = "block";
  }

  function filterPackages() {
    const operator = operatorFilter.value;
    const price = priceFilter.value;
    const duration = durationFilter.value;
    const data = dataFilter.value;

    const filteredPackages = packages.filter((pkg) => {
      const pkgPrice = parseInt(pkg.price.replace(" تومان", ""));
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

      row.innerHTML = `
        <td>${pkg.name}</td>
        <td>${pkg.operator}</td>
        <td>${pkg.duration}</td>
        <td>${pkg.price}</td>
        <td><bdo dir="ltr">${pkg.ussd}</bdo></td>
        <td><a href="${pkg.link}" class="buy-button">خرید</a></td>
        <td><button class="details-button" data-id="${pkg.name}">نمایش جزئیات بیشتر</button></td>
      `;
      tableBody.appendChild(row);
    });

    // افزودن رویداد به دکمه‌های جزئیات
    const detailsButtons = document.querySelectorAll(".details-button");
    detailsButtons.forEach((button) => {
      button.addEventListener("click", function () {
        showDetails(button.dataset.id);
      });
    });
  }

  // رویدادهای تغییر فیلترها
  operatorFilter.addEventListener("change", filterPackages);
  priceFilter.addEventListener("change", filterPackages);
  durationFilter.addEventListener("change", filterPackages);
  dataFilter.addEventListener("change", filterPackages);

  // نمایش اولیه بسته‌ها
  filterPackages();

  // بستن مودال با کلیک روی دکمه بستن (×)
  document
    .querySelector(".modal .close")
    .addEventListener("click", function () {
      document.getElementById("details-modal").style.display = "none";
    });

  // بستن مودال با کلیک روی فضای خارج از محتوا
  window.addEventListener("click", function (event) {
    const modal = document.getElementById("details-modal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
