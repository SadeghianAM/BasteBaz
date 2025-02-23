document.addEventListener("DOMContentLoaded", function () {
  const packages = [
    {
      name: "۶۰ مگابایت یک‌روزه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "2,140 تومان",
      ussd: "*100*31#",
      link: "#",
      data: 0.06,
      details: "بسته ۶۰ مگابایتی یک‌روزه همراه اول ویژه سیم‌کارت اعتباری.",
    },
    {
      name: "۱۵۰ مگابایت یک‌روزه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "3,610 تومان",
      ussd: "*100*31#",
      link: "#",
      data: 0.15,
      details: "بسته ۱۵۰ مگابایتی یک‌روزه همراه اول ویژه سیم‌کارت اعتباری.",
    },
    {
      name: "۲۵۰ مگابایت یک‌روزه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "4,820 تومان",
      ussd: "*100*31#",
      link: "#",
      data: 0.25,
      details: "بسته ۲۵۰ مگابایتی یک‌روزه همراه اول دائمی/اعتباری.",
    },
    {
      name: "۵۰۰ مگابایت یک‌روزه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "6,560 تومان",
      ussd: "*100*31#",
      link: "#",
      data: 0.5,
      details: "بسته ۵۰۰ مگابایتی یک‌روزه همراه اول دائمی/اعتباری.",
    },
    {
      name: "۷۵۰ مگابایت یک‌روزه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "7,900 تومان",
      ussd: "*100*31#",
      link: "#",
      data: 0.75,
      details: "بسته ۷۵۰ مگابایتی یک‌روزه همراه اول دائمی.",
    },
    {
      name: "۱ گیگابایت یک‌روزه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "8,570 تومان",
      ussd: "*100*31#",
      link: "#",
      data: 1,
      details: "بسته ۱ گیگابایتی یک‌روزه همراه اول دائمی.",
    },
    {
      name: "۲ گیگابایت یک‌روزه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "11,250 تومان",
      ussd: "*100*31#",
      link: "#",
      data: 2,
      details: "بسته ۲ گیگابایتی یک‌روزه همراه اول دائمی.",
    },
    {
      name: "۲۰۰ مگابایت هفتگی",
      operator: "همراه اول",
      duration: "۷ روز",
      price: "5,890 تومان",
      ussd: "*100*32#",
      link: "#",
      data: 0.2,
      details: "بسته ۲۰۰ مگابایتی هفتگی همراه اول دائمی/اعتباری.",
    },
    {
      name: "۳۰۰ مگابایت هفتگی",
      operator: "همراه اول",
      duration: "۷ روز",
      price: "7,370 تومان",
      ussd: "*100*32#",
      link: "#",
      data: 0.3,
      details: "بسته ۳۰۰ مگابایتی هفتگی همراه اول دائمی/اعتباری.",
    },
    {
      name: "۵۰۰ مگابایت هفتگی",
      operator: "همراه اول",
      duration: "۷ روز",
      price: "9,280 تومان",
      ussd: "*100*32#",
      link: "#",
      data: 0.5,
      details: "بسته ۵۰۰ مگابایتی هفتگی همراه اول دائمی/اعتباری.",
    },
    {
      name: "۲ گیگابایت سی‌روزه (ویژه مشترکین جدید)",
      operator: "همراه اول",
      duration: "۳۰ روز",
      price: "14,630 تومان",
      ussd: "91006#",
      link: "#",
      data: 2,
      details: "بسته ۲ گیگابایتی سی‌روزه ویژه مشترکین جدید.",
    },
    {
      name: "۳ گیگابایت سی‌روزه (ویژه مشترکین جدید)",
      operator: "همراه اول",
      duration: "۳۰ روز",
      price: "16,630 تومان",
      ussd: "91006#",
      link: "#",
      data: 3,
      details: "بسته ۳ گیگابایتی سی‌روزه ویژه مشترکین جدید.",
    },
    {
      name: "۴ گیگابایت سی‌روزه (ویژه مشترکین جدید)",
      operator: "همراه اول",
      duration: "۳۰ روز",
      price: "14,630 تومان",
      ussd: "9100434#",
      link: "#",
      data: 4,
      details: "بسته ۴ گیگابایتی سی‌روزه ویژه مشترکین جدید.",
    },
    {
      name: "۱۲ گیگابایت سی‌روزه صبح تا ۱۲ ظهر",
      operator: "همراه اول",
      duration: "۳۰ روز",
      price: "14,400 تومان",
      ussd: "9100434#",
      link: "#",
      data: 12,
      details: "بسته ۱۲ گیگابایتی سی‌روزه صبح تا ۱۲ ظهر.",
    },
    {
      name: "بامداد تا ۱۱ صبح سی‌روزه نامحدود",
      operator: "همراه اول",
      duration: "۳۰ روز",
      price: "14,260 تومان",
      ussd: "9100434#",
      link: "#",
      data: 0,
      details: "بسته نامحدود بامداد تا ۱۱ صبح سی‌روزه.",
    },
    {
      name: "۱ گیگابایت یک‌روزه",
      operator: "همراه اول",
      duration: "۱ روز",
      price: "14,260 تومان",
      ussd: "9100434#",
      link: "#",
      data: 1,
      details: "بسته ۱ گیگابایتی یک‌روزه.",
    },
    {
      name: "۱ گیگابایت هفت‌روزه",
      operator: "همراه اول",
      duration: "۷ روز",
      price: "14,260 تومان",
      ussd: "9100434#",
      link: "#",
      data: 1,
      details: "بسته ۱ گیگابایتی هفت‌روزه.",
    },
    {
      name: "۴ گیگابایت چهارماهه",
      operator: "همراه اول",
      duration: "۱۲۰ روز",
      price: "83,000 تومان",
      ussd: "*100*F#",
      link: "#",
      data: 4,
      details: "بسته ۴ گیگابایتی چهارماهه.",
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
