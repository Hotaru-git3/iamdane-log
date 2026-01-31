document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.getElementById('navbar');
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');

  // --- 1. STICKY NAVBAR LOGIC ---
  const handleScroll = () => {
    if (window.scrollY > 10) {
      navbar.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'border-gray-200');
      navbar.classList.remove('border-transparent');
    } else {
      navbar.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'border-gray-200');
      navbar.classList.add('border-transparent');
    }
  };
  window.addEventListener('scroll', handleScroll);

  // --- 2. MOBILE MENU LOGIC (SLIDE FLOW) ---
  if (btn && menu) {
    const icon = btn.querySelector('svg');

    // Open: Slide Down (Remove negative translate)
    const openMenu = () => {
      menu.classList.remove('-translate-y-full');
      menu.classList.add('translate-y-0');
      document.body.style.overflow = 'hidden'; // Lock Scroll
      
      // Swap to 'X' icon
      if(icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />`;
    };

    // Close: Slide Up (Add negative translate)
    const closeMenu = () => {
      menu.classList.add('-translate-y-full');
      menu.classList.remove('translate-y-0');
      document.body.style.overflow = ''; // Unlock Scroll

      // Swap to 'Hamburger' icon
      if(icon) icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />`;
    };

    // Button Click Handler
    btn.addEventListener('click', () => {
      // If class contains '-translate-y-full', it is CLOSED. So we OPEN it.
      const isClosed = menu.classList.contains('-translate-y-full');
      if (isClosed) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Close when clicking a link
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // --- 3. ANIMATION CSS INJECTION ---
  const styleSheet = document.createElement("style");
  styleSheet.innerText = `
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `;
  document.head.appendChild(styleSheet);
});