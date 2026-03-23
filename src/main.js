document.addEventListener("DOMContentLoaded", () => {
  // Get all DOM elements
  const navbar = document.getElementById("navbar");
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("mobile-overlay");
  const closeBtn = document.getElementById("mobile-menu-close");

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
  // Check if all mobile menu elements exist
  if (!btn || !menu || !overlay) {
    console.warn("Mobile menu elements not found");
  } else {
    // Open menu function
    const openMenu = () => {
      // Add classes to show menu
      menu.classList.remove("translate-x-full");
      menu.classList.add("translate-x-0");
      
      // Show overlay with fade effect
      overlay.classList.remove("hidden");
      // Force reflow to ensure transition works
      void overlay.offsetWidth;
      overlay.classList.remove("opacity-0");
      overlay.classList.add("opacity-100");
      
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    };
    
    // Close menu function
    const closeMenu = () => {
      // Hide menu
      menu.classList.add("translate-x-full");
      menu.classList.remove("translate-x-0");
      
      // Hide overlay with fade
      overlay.classList.add("opacity-0");
      overlay.classList.remove("opacity-100");
      setTimeout(() => {
        if (overlay) overlay.classList.add("hidden");
      }, 300);
      
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
    
    // Event listener for menu button (click)
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isClosed = menu.classList.contains("translate-x-full");
      if (isClosed) {
        openMenu();
      } else {
        closeMenu();
      }
    });
    
    // Touch event for mobile (more responsive)
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const isClosed = menu.classList.contains("translate-x-full");
      if (isClosed) {
        openMenu();
      } else {
        closeMenu();
      }
    }, { passive: false });
    
    // Close button event
    if (closeBtn) {
      closeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        closeMenu();
      });
      
      closeBtn.addEventListener("touchstart", (e) => {
        e.preventDefault();
        closeMenu();
      }, { passive: false });
    }
    
    // Overlay click to close
    overlay.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
    });
    
    overlay.addEventListener("touchstart", (e) => {
      e.preventDefault();
      closeMenu();
    }, { passive: false });
    
    // Close menu when clicking on mobile links
    const mobileLinks = document.querySelectorAll(".mobile-link");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
      
      link.addEventListener("touchstart", () => {
        setTimeout(() => {
          closeMenu();
        }, 100);
      });
    });
  }

  // ========== 3. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS ==========
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.12
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove("opacity-0", "translate-y-12");
        entry.target.classList.add("opacity-100", "translate-y-0");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Select elements to animate
  const revealElements = document.querySelectorAll(`
    #hero h1, 
    #hero a, 
    section h2, 
    section > p, 
    .grid > div, 
    .bg-white.rounded-2xl,
    .bg-\\[\\#fafafa\\].rounded-xl
  `);
  
  revealElements.forEach(el => {
    // Add initial hidden state
    el.classList.add("transition-all", "duration-700", "ease-out", "opacity-0", "translate-y-12");
    observer.observe(el);
  });
  
  // ========== 4. SMOOTH SCROLL FOR ANCHOR LINKS (Optional Enhancement) ==========
  const allLinks = document.querySelectorAll('a[href^="#"]');
  allLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#" || targetId === "") return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
  
  // ========== 5. FIX FOR IOS SAFARI 100vh ISSUE ==========
  const setVh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  setVh();
  window.addEventListener('resize', setVh);
  
  // ========== 6. ADD ACTIVE STATE TO MOBILE BUTTON (Visual Feedback) ==========
  if (btn) {
    btn.addEventListener("touchstart", () => {
      btn.style.transform = "scale(0.95)";
      setTimeout(() => {
        btn.style.transform = "";
      }, 150);
    });
  }
  
  // ========== 7. FIX FOR MENU NOT CLOSING ON BACK BUTTON (Mobile Browser) ==========
  window.addEventListener("popstate", () => {
    if (menu && !menu.classList.contains("translate-x-full")) {
      const closeMenuFn = () => {
        menu.classList.add("translate-x-full");
        menu.classList.remove("translate-x-0");
        if (overlay) {
          overlay.classList.add("opacity-0");
          setTimeout(() => {
            if (overlay) overlay.classList.add("hidden");
          }, 300);
        }
        document.body.style.overflow = "";
        document.body.style.position = "";
      };
      closeMenuFn();
    }
  });
  
  // ========== 8. DEBUG LOG (Remove in production if needed) ==========
  console.log("✅ JavaScript loaded successfully");
  console.log("Mobile menu elements:", { btn: !!btn, menu: !!menu, overlay: !!overlay, closeBtn: !!closeBtn });
});