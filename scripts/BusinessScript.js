document.addEventListener("DOMContentLoaded", () => {
  const business = document.querySelector(".for-business");
  const customers = document.querySelector(".for-customers");

  function setActive(activeElem, inactiveElem) {
    activeElem.classList.add("active");
    inactiveElem.classList.remove("active");
  }

  setActive(business, customers)

  business.addEventListener("click", () => {
    setActive(business, customers);
  });

  customers.addEventListener("click", () => {
    setActive(customers, business);
  });
});
