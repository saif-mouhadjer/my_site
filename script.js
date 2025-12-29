// =========================
    // Helpers
    // =========================
    const $ = (s, p=document) => p.querySelector(s);
    const $$ = (s, p=document) => [...p.querySelectorAll(s)];

    // =========================
    // Footer year
    // =========================
    $("#year").textContent = new Date().getFullYear();

    // =========================
    // Typing effect
    // =========================
    const typingEl = $("#typing");
    const phrases = [
      "مطور مواقع الانترنت",
      "مطور تطبيقات الهاتف"
    ];
    let pi = 0, ci = 0, deleting = false;

    function typeLoop() {
      const current = phrases[pi];
      typingEl.textContent = current.slice(0, ci);

      if (!deleting) {
        ci++;
        if (ci > current.length + 14) deleting = true; // pause
      } else {
        ci--;
        if (ci <= 0) { deleting = false; pi = (pi + 1) % phrases.length; }
      }

      const speed = deleting ? 40 : 70;
      setTimeout(typeLoop, speed);
    }
    typeLoop();

    // =========================
    // Scroll progress bar
    // =========================
    const progress = $("#scrollProgress");
    window.addEventListener("scroll", () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight;
      const ratio = scrollHeight ? (scrollTop / scrollHeight) : 0;
      progress.style.transform = `scaleX(${ratio})`;
    }, { passive: true });

    // =========================
    // Parallax orbs
    // =========================
    const orb1 = $("#orb1"), orb2 = $("#orb2"), orb3 = $("#orb3");
    window.addEventListener("mousemove", (e) => {
      const x = (e.clientX / window.innerWidth) - 0.5;
      const y = (e.clientY / window.innerHeight) - 0.5;

      orb1.style.transform = `translate3d(${x*20}px, ${y*20}px, 0)`;
      orb2.style.transform = `translate3d(${x*-18}px, ${y*-18}px, 0)`;
      orb3.style.transform = `translate3d(${x*14}px, ${y*-14}px, 0)`;
    }, { passive: true });

    // =========================
    // Reveal on scroll
    // =========================
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) entry.target.classList.add("in");
      }
    }, { threshold: 0.12 });

    $$(".reveal").forEach(el => observer.observe(el));

    // =========================
    // Active nav link while scrolling
    // =========================
    const sections = ["about", "skills", "projects", "contact"].map(id => document.getElementById(id));
    const navLinks = $$("#navLinks a");

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
      });
    }, { threshold: 0.45 });

    sections.forEach(s => sectionObserver.observe(s));

    // =========================
    // Copy contact link (demo)
    // =========================
    const copyBtn = $("#copyBtn");
    copyBtn.addEventListener("click", async () => {
      const text = "https://www.facebook.com/saif.mouhadjer.2025";
      try {
        await navigator.clipboard.writeText(text);
        toast("تم نسخ معلومات التواصل ✅");
      } catch {
        toast("تعذر النسخ… جرّب يدويًا ✍️");
      }
    });

    // =========================
    // Toast
    // =========================
    const toastEl = $("#toast");
    let toastTimer = null;

    function toast(msg) {
      toastEl.textContent = msg;
      toastEl.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
    }

    // =========================
    // Contact form (demo)
    // =========================
    $("#contactForm").addEventListener("submit", (e) => {
      e.preventDefault();
      toast("وصلت رسالتك! (عرض تجريبي) ✨");
      e.target.reset();
    });

    // =========================
    // Projects modal
    // =========================
    const modal = $("#modal");
    const modalTitle = $("#modalTitle");
    const modalDesc = $("#modalDesc");
    const closeModalBtn = $("#closeModal");

    function openModal(title, desc) {
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    }
    function closeModal() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    }

    $$(".project").forEach(card => {
      card.addEventListener("click", () => {
        openModal(card.dataset.title, card.dataset.desc);
      });
    });

    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });