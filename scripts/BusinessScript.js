document.addEventListener("DOMContentLoaded", () => {
	const business = document.querySelector(".for-business");
	const customers = document.querySelector(".for-customers");
	const businessContent = document.querySelector(".business-content");
	const customersContent = document.querySelector(".customers-content");
	const footerBusiness = document.querySelector(".footer-business");
	const footerCustomers = document.querySelector(".footer-customers");
	const cookieBanner = document.querySelector(".cookie-banner");
	const acceptBtn = document.querySelector(".accept-button");
	const declineBtn = document.querySelector(".decline-button");
	const closeBtn = document.querySelector(".close-button");
	const ctaWrapper = document.querySelector(".cta-wrapper");
	const ctaCloseButton = document.querySelector(".cta-close-button");
	const ctaTriggers = document.querySelectorAll(".contact-sales-trigger");
	const ctaInputs = document.querySelectorAll(".cta-input");
	const requiredInputs = document.querySelectorAll(".cta-input[data-required]");
	const ctaButton = document.querySelector(".cta-button");
	const ctaRequiredMessage = document.querySelector(".cta-required-message");
	const thanksWrapper = document.querySelector(".thanks-wrapper");
	const thanksCloseButton = document.querySelector(".thanks-close-button");
	const superButton = document.querySelector(".super-button");

	function setActive(activeTab, inactiveTab, showContent, hideContent) {
		activeTab.classList.add("active");
		inactiveTab.classList.remove("active");
		showContent.classList.add("active");
		hideContent.classList.remove("active");
	}

	setActive(business, customers, businessContent, customersContent);

	function switchToBusiness() {
		setActive(business, customers, businessContent, customersContent);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	function switchToCustomers() {
		setActive(customers, business, customersContent, businessContent);
		window.scrollTo({ top: 0, behavior: "smooth" });
	}

	business.addEventListener("click", switchToBusiness);
	customers.addEventListener("click", switchToCustomers);

	if (footerBusiness) {
		footerBusiness.addEventListener("click", switchToBusiness);
	}

	if (footerCustomers) {
		footerCustomers.addEventListener("click", switchToCustomers);
	}

	if (cookieBanner) {
		const CONSENT_KEY = "cookieConsent";
		const stored = localStorage.getItem(CONSENT_KEY);

		function showBanner() {
			cookieBanner.classList.add("cookie-banner--visible");
		}

		function hideBanner() {
			cookieBanner.classList.remove("cookie-banner--visible");
		}

		if (!stored) {
			setTimeout(showBanner, 1000);
		}

		if (acceptBtn) {
			acceptBtn.addEventListener("click", () => {
				localStorage.setItem(CONSENT_KEY, "accepted");
				hideBanner();
			});
		}

		if (declineBtn) {
			declineBtn.addEventListener("click", () => {
				localStorage.setItem(CONSENT_KEY, "declined");
				hideBanner();
			});
		}

		if (closeBtn) {
			closeBtn.addEventListener("click", () => {
				hideBanner();
			});
		}
	}

	const CTA_VISIBLE_CLASS = "cta-wrapper--visible";
	const CTA_BUTTON_ACTIVE_CLASS = "cta-button--active";
	const CTA_REQUIRED_VISIBLE_CLASS = "cta-required-message--visible";
	const THANKS_VISIBLE_CLASS = "thanks-wrapper--visible";

	function setRequiredMessageVisible(isVisible) {
		if (!ctaRequiredMessage) {
			return;
		}
		if (isVisible) {
			ctaRequiredMessage.classList.add(CTA_REQUIRED_VISIBLE_CLASS);
		} else {
			ctaRequiredMessage.classList.remove(CTA_REQUIRED_VISIBLE_CLASS);
		}
	}

	function removeFieldError(input) {
		const stroke = input.closest(".cta-stroke");
		if (!stroke) {
			return;
		}
		stroke.classList.remove("cta-stroke--error");
		const errorEl = stroke.querySelector(".cta-error-text");
		if (errorEl) {
			errorEl.textContent = "";
		}
	}

	function showFieldError(input) {
		const stroke = input.closest(".cta-stroke");
		if (!stroke) {
			return;
		}
		stroke.classList.add("cta-stroke--error");
		const errorEl = stroke.querySelector(".cta-error-text");
		if (errorEl) {
			errorEl.textContent =
				input.dataset.error || "Please fill in this required field.";
		}
		setRequiredMessageVisible(true);
	}

	function validateField(input) {
		const value = input.value.trim();
		if (!value) {
			showFieldError(input);
			return false;
		}
		removeFieldError(input);
		return true;
	}

	function updateCtaButtonState() {
		const allValid = Array.from(requiredInputs).every((input) =>
			Boolean(input.value.trim().length),
		);

		if (!ctaButton) {
			return allValid;
		}

		if (allValid) {
			ctaButton.classList.add(CTA_BUTTON_ACTIVE_CLASS);
			ctaButton.removeAttribute("aria-disabled");
			setRequiredMessageVisible(false);
		} else {
			ctaButton.classList.remove(CTA_BUTTON_ACTIVE_CLASS);
			ctaButton.setAttribute("aria-disabled", "true");
		}

		return allValid;
	}

	function resetCtaForm() {
		ctaInputs.forEach((input) => {
			input.value = "";
			removeFieldError(input);
		});
		setRequiredMessageVisible(false);
		updateCtaButtonState();
	}

	function openCta() {
		if (ctaWrapper) {
			resetCtaForm();
			ctaWrapper.classList.add(CTA_VISIBLE_CLASS);
		}
	}

	function closeCta() {
		if (ctaWrapper) {
			ctaWrapper.classList.remove(CTA_VISIBLE_CLASS);
		}
	}

	ctaTriggers.forEach((btn) => {
		btn.addEventListener("click", (event) => {
			event.preventDefault();
			openCta();
		});
	});

	requiredInputs.forEach((input) => {
		input.addEventListener("input", () => {
			validateField(input);
			updateCtaButtonState();
		});

		input.addEventListener("blur", () => {
			validateField(input);
			updateCtaButtonState();
		});
	});

	if (ctaButton) {
		ctaButton.addEventListener("click", (event) => {
			event.preventDefault();
			const hasErrors = Array.from(requiredInputs).reduce(
				(acc, input) => !validateField(input) || acc,
				false,
			);

			if (hasErrors) {
				setRequiredMessageVisible(true);
				updateCtaButtonState();
				return;
			}

			setRequiredMessageVisible(false);

			closeCta();
			showThanks();
		});
	}

	if (ctaCloseButton) {
		ctaCloseButton.addEventListener("click", (event) => {
			event.preventDefault();
			closeCta();
		});
	}

	if (ctaWrapper) {
		ctaWrapper.addEventListener("click", (event) => {
			if (event.target === ctaWrapper) {
				closeCta();
			}
		});
	}

	function showThanks() {
		if (thanksWrapper) {
			thanksWrapper.classList.add(THANKS_VISIBLE_CLASS);
		}
	}

	function closeThanks() {
		if (thanksWrapper) {
			thanksWrapper.classList.remove(THANKS_VISIBLE_CLASS);
		}
	}

	if (superButton) {
		superButton.addEventListener("click", (event) => {
			event.preventDefault();
			closeThanks();
		});
	}

	if (thanksCloseButton) {
		thanksCloseButton.addEventListener("click", (event) => {
			event.preventDefault();
			closeThanks();
		});
	}

	if (thanksWrapper) {
		thanksWrapper.addEventListener("click", (event) => {
			if (event.target === thanksWrapper) {
				closeThanks();
			}
		});
	}

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape") {
			if (ctaWrapper && ctaWrapper.classList.contains(CTA_VISIBLE_CLASS)) {
				closeCta();
			} else if (
				thanksWrapper &&
				thanksWrapper.classList.contains(THANKS_VISIBLE_CLASS)
			) {
				closeThanks();
			}
		}
	});
});
