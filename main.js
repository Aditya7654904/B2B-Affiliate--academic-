/* =========================================================
   RESEARCHLY
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE NAVIGATION
  ========================================== */

  const menuButton = document.getElementById("mobileMenuButton");
  const mobileNav = document.getElementById("mobileNav");

  if (menuButton && mobileNav) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        mobileNav.classList.toggle("active");

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    mobileNav.querySelectorAll("a").forEach(link => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });

  }


  /* =========================================
     CURRENT YEAR
  ========================================== */

  const yearElement =
    document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent =
      new Date().getFullYear();
  }


  /* =========================================
     NEWSLETTER FORM
  ========================================== */

  const newsletterForm =
    document.getElementById("newsletterForm");

  if (newsletterForm) {

    newsletterForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        const emailInput =
          newsletterForm.querySelector(
            'input[type="email"]'
          );

        const button =
          newsletterForm.querySelector("button");

        if (!emailInput || !button) {
          return;
        }

        const email =
          emailInput.value.trim();

        if (!email) {
          return;
        }

        /*
         * Replace this section with your email
         * marketing provider integration.
         *
         * Examples:
         * - ConvertKit
         * - Mailchimp
         * - Beehiiv
         * - Brevo
         * - HubSpot
         */

        button.disabled = true;

        const originalText =
          button.innerHTML;

        button.innerHTML =
          "Subscribed ✓";

        emailInput.value = "";

        setTimeout(() => {

          button.disabled = false;

          button.innerHTML =
            originalText;

        }, 3000);

      }
    );

  }


  /* =========================================
     SMOOTH INTERNAL LINKS
  ========================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener("click", event => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }

        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      });

    });


  /* =========================================
     FAQ
  ========================================== */

  const faqItems =
    document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {

    item.addEventListener("toggle", () => {

      if (!item.open) {
        return;
      }

      faqItems.forEach(otherItem => {

        if (
          otherItem !== item &&
          otherItem.open
        ) {
          otherItem.open = false;
        }

      });

    });

  });


  /* =========================================
     INTERSECTION OBSERVER
  ========================================== */

  const animatedElements =
    document.querySelectorAll(
      ".tool-card, .category-card, .step-card, " +
      ".article-card, .testimonial-card, .featured-tool-row"
    );

  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "is-visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08
        }
      );

    animatedElements.forEach(element => {

      element.classList.add(
        "scroll-animation"
      );

      observer.observe(element);

    });

  }


  /* =========================================
     ESCAPE KEY
  ========================================== */

  document.addEventListener(
    "keydown",
    event => {

      if (event.key !== "Escape") {
        return;
      }

      if (
        mobileNav &&
        mobileNav.classList.contains("active")
      ) {

        mobileNav.classList.remove("active");

        if (menuButton) {
          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );
        }

      }

    }
  );

});
