// =========================
// Offer Banner
// =========================
const closeOffer = document.getElementById("closeOffer");
const offerBanner = document.getElementById("offerBanner");

if (closeOffer && offerBanner) {
    closeOffer.addEventListener("click", () => {
        offerBanner.style.display = "none";
    });
}

// =========================
// Mobile Menu
// =========================
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("show");

        const icon = hamburger.querySelector("i");
        if (icon) {
            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-times");
        }
    });
}

// =========================
// Nav Active Link
// =========================
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(item => {
    item.addEventListener("click", function () {
        navItems.forEach(link => link.classList.remove("active"));
        this.classList.add("active");
    });
});

// =========================
// Slider
// =========================
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsWrap = document.querySelector(".hero-dots");

let current = 0;

function showSlide(index) {
    if (slides.length === 0) return;
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");

    if (dotsWrap) {
        const dots = dotsWrap.querySelectorAll(".hero-dot");
        dots.forEach(dot => dot.classList.remove("active"));
        if (dots[index]) dots[index].classList.add("active");
    }

    current = index;
}

if (slides.length > 0) {

    // Build dots dynamically based on slide count
    if (dotsWrap) {
        slides.forEach((_, i) => {
            const dot = document.createElement("span");
            dot.classList.add("hero-dot");
            if (i === 0) dot.classList.add("active");
            dot.addEventListener("click", () => showSlide(i));
            dotsWrap.appendChild(dot);
        });
    }

    showSlide(current);

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            showSlide((current + 1) % slides.length);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            showSlide((current - 1 + slides.length) % slides.length);
        });
    }

    // Auto Slide
  
}

// =========================
// Like Button
// =========================
document.querySelectorAll(".like-icon").forEach(icon => {
    icon.addEventListener("click", () => {
        icon.classList.toggle("liked");
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
    });
});

// =========================
// Like Button (Nested)
// =========================
document.querySelectorAll(".like-icon-n").forEach(icon => {
    icon.addEventListener("click", (e) => {
        e.stopPropagation();
        icon.classList.toggle("liked");
        icon.classList.toggle("fa-regular");
        icon.classList.toggle("fa-solid");
    });
});

// =========================
// Collection Page Filtering
// =========================
const occFilters = document.querySelectorAll(".occ-filter");
const colorFilters = document.querySelectorAll(".color-filter");
const searchInput = document.getElementById("searchInput");
const tiles = document.querySelectorAll(".product-tile");
const resultCount = document.getElementById("resultCount");
const clearBtn = document.getElementById("clearFilters");

function applyFilters() {
    const checkedOcc = Array.from(occFilters).filter(c => c.checked).map(c => c.value);
    const checkedColors = Array.from(colorFilters).filter(c => c.checked).map(c => c.value);
    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";

    let visibleCount = 0;

    tiles.forEach(tile => {
        const occValues = (tile.dataset.occasion || "").split(" ");
        const colorValue = tile.dataset.color || "";
        const title = tile.querySelector("h4").textContent.toLowerCase();

        const matchesOcc = checkedOcc.length === 0 || checkedOcc.some(o => occValues.includes(o));
        const matchesColor = checkedColors.length === 0 || checkedColors.includes(colorValue);
        const matchesSearch = searchTerm === "" || title.includes(searchTerm);

        if (matchesOcc && matchesColor && matchesSearch) {
            tile.style.display = "block";
            visibleCount++;
        } else {
            tile.style.display = "none";
        }
    });

    if (resultCount) {
        resultCount.textContent = `SHOWING ${visibleCount} OF ${tiles.length} ITEMS`;
    }
}

if (tiles.length) {
    occFilters.forEach(cb => cb.addEventListener("change", applyFilters));
    colorFilters.forEach(cb => cb.addEventListener("change", applyFilters));

    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            occFilters.forEach(cb => cb.checked = false);
            colorFilters.forEach(cb => cb.checked = false);
            if (searchInput) searchInput.value = "";
            applyFilters();
        });
    }
}

// =========================
// Scroll Reveal Animation
// =========================
const animatedEls = document.querySelectorAll(
    ".product-card, .category-card, .experience-card, .contact-info-card"
);

if (animatedEls.length) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in-view");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    animatedEls.forEach(el => observer.observe(el));
}