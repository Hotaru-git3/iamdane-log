document.addEventListener("DOMContentLoaded", () => {
        const navbar = document.getElementById("navbar");
        const btn = document.getElementById("mobile-menu-btn");
        const menu = document.getElementById("mobile-menu");
        const overlay = document.getElementById("mobile-overlay");
        const closeBtn = document.getElementById("mobile-menu-close");

        // scroll effect for header
        const handleScroll = () => {
          if (window.scrollY > 10) {
            navbar.classList.add("shadow-sm");
          } else {
            navbar.classList.remove("shadow-sm");
          }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        // open/close functions
        const openMenu = () => {
          menu.classList.remove("translate-x-full");
          menu.classList.add("translate-x-0");
          overlay.classList.remove("hidden");
          setTimeout(() => overlay.classList.remove("opacity-0"), 10);
          document.body.style.overflow = "hidden";
        };
        const closeMenu = () => {
          menu.classList.add("translate-x-full");
          menu.classList.remove("translate-x-0");
          overlay.classList.add("opacity-0");
          setTimeout(() => overlay.classList.add("hidden"), 280);
          document.body.style.overflow = "";
        };

        if (btn) btn.addEventListener("click", openMenu);
        if (closeBtn) closeBtn.addEventListener("click", closeMenu);
        if (overlay) overlay.addEventListener("click", closeMenu);
        
        document.querySelectorAll(".mobile-link").forEach(link => {
          link.addEventListener("click", closeMenu);
        });

        // intersection observer for reveal animations
        const observerOptions = { root: null, rootMargin: "0px", threshold: 0.12 };
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("opacity-0", "translate-y-12");
              entry.target.classList.add("opacity-100", "translate-y-0");
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        
        const revealElements = document.querySelectorAll(`#hero h1, #hero a, section h2, section > p, .grid > div, .bg-white.rounded-2xl`);
        revealElements.forEach(el => {
          el.classList.add("transition-all", "duration-700", "ease-out", "opacity-0", "translate-y-12");
          observer.observe(el);
        });
      });