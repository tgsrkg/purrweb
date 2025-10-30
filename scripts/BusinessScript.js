document.addEventListener("DOMContentLoaded", () => {
	const business = document.querySelector(".for-business");
	const customers = document.querySelector(".for-customers");
	const businessContent = document.querySelector(".business-content");
	const customersContent = document.querySelector(".customers-content");

	function setActive(activeTab, inactiveTab, showContent, hideContent) {
		activeTab.classList.add("active");
		inactiveTab.classList.remove("active");
		showContent.classList.add("active");
		hideContent.classList.remove("active");
	}

	setActive(business, customers, businessContent, customersContent);

	business.addEventListener("click", () => {
		setActive(business, customers, businessContent, customersContent);
	});

	customers.addEventListener("click", () => {
		setActive(customers, business, customersContent, businessContent);
	});
});
