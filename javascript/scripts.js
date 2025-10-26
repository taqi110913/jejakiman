$(document).ready(function() {
    // Grab elements, but be defensive because some pages load the navbar via include.js
    const menuBtn = document.getElementById("menu-btn");
    const closeBtn = document.getElementById("close-btn");
    const navLinks = document.getElementById("nav-links");
    let navbar = document.querySelector(".navbar");
    const darkToggle = document.getElementById("dark-mode-toggle");

    // Helper to (re)query the navbar in case it's injected later
    function refreshNavbarReference() {
        if (!navbar) {
            navbar = document.querySelector(".navbar");
        }
    }

    // Menu open
    // Binding function so we can (re)attach listeners after includes load
    function bindNavControls() {
        // re-query elements because they might be injected after initial run
        const mBtn = document.getElementById("menu-btn");
        const cBtn = document.getElementById("close-btn");
        const nLinks = document.getElementById("nav-links");
        const dToggle = document.getElementById("dark-mode-toggle");

        if (mBtn && nLinks) {
            // avoid double-binding by checking a flag on the element
            if (!mBtn._hasListener) {
                mBtn.addEventListener("click", () => {
                    document.body.classList.add("menu-open");
                    nLinks.classList.add("active");
                });
                mBtn._hasListener = true;
            }
        }

        if (cBtn && nLinks) {
            if (!cBtn._hasListener) {
                cBtn.addEventListener("click", () => {
                    document.body.classList.remove("menu-open");
                    nLinks.classList.remove("active");
                });
                cBtn._hasListener = true;
            }
        }

        if (dToggle) {
            if (!dToggle._hasListener) {
                dToggle.addEventListener("click", () => {
                    document.body.classList.toggle("dark-mode");
                });
                dToggle._hasListener = true;
            }
        }
    }

    // Initial bind (works on pages with navbar inline)
    bindNavControls();

    // Re-bind when includes are loaded (for pages that inject navbar/footer)
    document.addEventListener('includeLoaded', function() {
        // small timeout to ensure innerHTML insertion finished
        setTimeout(bindNavControls, 0);
    });

    // Hide/Show Navbar on Scroll (safe even if navbar is injected later)
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        refreshNavbarReference();
        const currentScroll = window.pageYOffset;
        if (navbar) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.top = "-80px"; // hide
            } else {
                navbar.style.top = "0"; // show
            }
        }
        lastScroll = currentScroll;
    });
});