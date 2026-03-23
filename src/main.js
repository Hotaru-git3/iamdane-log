document.addEventListener("DOMContentLoaded", () => {
  // Get all DOM elements
  const navbar = document.getElementById("navbar");
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("mobile-overlay");
  const closeBtn = document.getElementById("mobile-menu-close");
  const logo = document.getElementById("logo");

  // ========== 1. SCROLL EFFECT FOR HEADER ==========
  const handleScroll = () => {
    if (navbar) {
      if (window.scrollY > 10) {
        navbar.classList.add("shadow-sm");
      } else {
        navbar.classList.remove("shadow-sm");
      }
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // ========== 2. MOBILE MENU FUNCTIONS ==========
  let isMenuOpen = false; // Track menu state

  if (btn && menu && overlay) {
    // Open menu function - tanpa position:fixed, hanya overflow hidden
    const openMenu = () => {
      isMenuOpen = true;
      menu.classList.remove("translate-x-full");
      menu.classList.add("translate-x-0");
      overlay.classList.remove("hidden");
      void overlay.offsetWidth;
      overlay.classList.remove("opacity-0");
      overlay.classList.add("opacity-100");
      document.body.style.overflow = "hidden"; // Cuma butuh ini buat lock scroll
    };

    // Close menu function - restore scroll
    const closeMenu = () => {
      isMenuOpen = false;
      menu.classList.add("translate-x-full");
      menu.classList.remove("translate-x-0");
      overlay.classList.add("opacity-0");
      overlay.classList.remove("opacity-100");
      setTimeout(() => {
        if (overlay) overlay.classList.add("hidden");
      }, 300);
      document.body.style.overflow = ""; // Unlock scroll
    };

    // Gak perlu touchstart, click event udah cukup responsif di browser mobile modern
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // Mencegah loncat ke atas
      
      if (isMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close button event
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
      });
    }

    // Overlay click to close
    overlay.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeMenu();
    });

    // Close menu when clicking on mobile links & scroll to target
    const mobileLinks = document.querySelectorAll(".mobile-link");
    mobileLinks.forEach((link) => {
      // Remove existing listeners to avoid duplicates
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      newLink.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const targetId = newLink.getAttribute("href");
        closeMenu();
        
        if (targetId && targetId !== "#") {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            setTimeout(() => {
              const headerOffset = 70;
              const elementPosition = targetElement.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
              window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
              });
            }, 320);
          }
        }
      });
    });
  }

  // ========== 3. LOGO CLICK (SCROLL TO TOP) ==========
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ========== 4. INTERSECTION OBSERVER ==========
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.12,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-12");
        entry.target.classList.add("opacity-100", "translate-y-0");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll(`
    #hero h1, 
    #hero a, 
    section h2, 
    section > p, 
    .grid > div, 
    .bg-white.rounded-2xl,
    .bg-\\[\\#fafafa\\].rounded-xl
  `);

  revealElements.forEach((el) => {
    el.classList.add(
      "transition-all",
      "duration-700",
      "ease-out",
      "opacity-0",
      "translate-y-12"
    );
    observer.observe(el);
  });

  // ========== 5. SMOOTH SCROLL FOR DESKTOP NAV LINKS ==========
  const desktopLinks = document.querySelectorAll('nav a[href^="#"]');
  desktopLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ========== 6. IOS SAFARI FIX ==========
  const setVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };
  setVh();
  window.addEventListener("resize", setVh);

  // ========== 7. VISUAL FEEDBACK (simple click effect) ==========
  if (btn) {
    btn.addEventListener("click", () => {
      btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btn.style.transform = "";
      }, 150);
    });
  }

  // ========== 8. BACK BUTTON HANDLER ==========
  window.addEventListener("popstate", () => {
    if (menu && !menu.classList.contains("translate-x-full")) {
      menu.classList.add("translate-x-full");
      menu.classList.remove("translate-x-0");
      if (overlay) {
        overlay.classList.add("opacity-0");
        setTimeout(() => {
          if (overlay) overlay.classList.add("hidden");
        }, 300);
      }
      document.body.style.overflow = "";
    }
  });

  console.log("✅ JavaScript loaded successfully");
});