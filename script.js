"use strict";

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SELECTORS
    ===================================================== */

    const header = document.querySelector(".header");
    const menuBtn = document.querySelector(".menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const sections = document.querySelectorAll("section[id]");
    const contactForm = document.querySelector(".contact-form");


    /* =====================================================
       1. MOBILE MENU
    ===================================================== */

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("mobile-open");
            menuBtn.classList.toggle("open");

            if (navLinks.classList.contains("mobile-open")) {
                menuBtn.textContent = "✕";
            } else {
                menuBtn.textContent = "☰";
            }

        });


        navItems.forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("mobile-open");
                menuBtn.classList.remove("open");

                menuBtn.textContent = "☰";

            });

        });

    }


    /* =====================================================
       2. MOBILE MENU STYLE
    ===================================================== */

    const mobileStyle = document.createElement("style");

    mobileStyle.textContent = `
        @media (max-width: 800px) {

            .nav-links.mobile-open {
                position: absolute;
                top: 80px;
                left: 20px;
                right: 20px;

                display: flex;
                flex-direction: column;

                padding: 20px;

                background: rgba(23, 21, 18, 0.98);

                border: 1px solid rgba(201, 166, 107, 0.18);

                border-radius: 18px;

                box-shadow:
                    0 20px 50px rgba(0, 0, 0, 0.35);

                z-index: 1000;

                animation: menuOpen .25s ease;
            }

            .nav-links.mobile-open li {
                width: 100%;
            }

            .nav-links.mobile-open a {
                display: block;
                padding: 12px 5px;
            }

            @keyframes menuOpen {

                from {
                    opacity: 0;
                    transform: translateY(-8px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }

            }

        }
    `;

    document.head.appendChild(mobileStyle);


    /* =====================================================
       3. HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    updateHeader();


    /* =====================================================
       4. HEADER STYLE
    ===================================================== */

    const headerStyle = document.createElement("style");

    headerStyle.textContent = `
        .header {
            transition:
                background-color .3s ease,
                box-shadow .3s ease,
                border-color .3s ease;
        }

        .header.scrolled {
            background: rgba(17, 16, 14, 0.94);

            box-shadow:
                0 10px 35px rgba(0, 0, 0, 0.18);

            border-bottom-color:
                rgba(201, 166, 107, 0.12);
        }
    `;

    document.head.appendChild(headerStyle);


    /* =====================================================
       5. ACTIVE NAVIGATION
    ===================================================== */

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionBottom =
                sectionTop + section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                currentSection = section.id;

            }

        });


        navItems.forEach(function (link) {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        { passive: true }
    );


    updateActiveNav();


    /* =====================================================
       6. SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {

            link.addEventListener(
                "click",
                function (event) {

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


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });


    /* =====================================================
       7. PREMIUM HERO TEXT
       
       IMPORTANT:
       No character-by-character typing.
       Fixed height prevents page blinking.
    ===================================================== */

    const heroTitle =
        document.querySelector(".hero-content h2");


    if (heroTitle) {

        const texts = [

            "BCA Student",

            "Frontend Developer",

            "JavaScript Learner",

            "Aspiring Software Developer"

        ];


        let textIndex = 0;


        /*
            Save the original heading size.
            This keeps the layout stable.
        */

        heroTitle.style.minHeight =
            heroTitle.offsetHeight + "px";


        /*
            Create text element.
        */

        heroTitle.innerHTML =
            '<span class="premium-hero-text"></span>';


        const heroText =
            heroTitle.querySelector(
                ".premium-hero-text"
            );


        /*
            Premium text CSS.
        */

        const heroTextStyle =
            document.createElement("style");


        heroTextStyle.textContent = `

            .hero-content h2 {

                min-height:
                    1.35em;

                display:
                    flex;

                align-items:
                    center;

                position:
                    relative;

            }


            .premium-hero-text {

                display:
                    inline-block;

                min-height:
                    1.35em;

                opacity:
                    1;

                transform:
                    translateY(0);

                transition:
                    opacity .45s ease,
                    transform .45s ease;

                will-change:
                    opacity,
                    transform;

            }


            .premium-hero-text.fade-out {

                opacity:
                    0;

                transform:
                    translateY(8px);

            }


            .premium-hero-text.fade-in {

                opacity:
                    1;

                transform:
                    translateY(0);

            }

        `;


        document.head.appendChild(
            heroTextStyle
        );


        /*
            First text.
        */

        heroText.textContent =
            texts[0];


        /*
            Change text every few seconds.
            No layout-changing typing effect.
        */

        setInterval(function () {

            heroText.classList.add(
                "fade-out"
            );


            setTimeout(function () {

                textIndex =
                    (textIndex + 1) %
                    texts.length;


                heroText.textContent =
                    texts[textIndex];


                heroText.classList.remove(
                    "fade-out"
                );


                heroText.classList.add(
                    "fade-in"
                );


                setTimeout(function () {

                    heroText.classList.remove(
                        "fade-in"
                    );

                }, 450);


            }, 450);


        }, 3000);

    }


    /* =====================================================
       8. SCROLL PROGRESS BAR
    ===================================================== */

    const progressBar =
        document.createElement("div");


    progressBar.className =
        "scroll-progress";


    document.body.appendChild(
        progressBar
    );


    const progressStyle =
        document.createElement("style");


    progressStyle.textContent = `

        .scroll-progress {

            position:
                fixed;

            top:
                0;

            left:
                0;

            width:
                0;

            height:
                2px;

            background:
                linear-gradient(
                    90deg,
                    #947442,
                    #c9a66b,
                    #e0c48d
                );

            z-index:
                9999;

            pointer-events:
                none;

        }

    `;


    document.head.appendChild(
        progressStyle
    );


    function updateProgress() {

        const scrollTop =
            window.scrollY;


        const documentHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;


        if (documentHeight <= 0) {

            progressBar.style.width =
                "0%";

            return;

        }


        const progress =
            (scrollTop / documentHeight) * 100;


        progressBar.style.width =
            progress + "%";

    }


    window.addEventListener(
        "scroll",
        updateProgress,
        { passive: true }
    );


    updateProgress();


    /* =====================================================
       9. SAFE SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(`

            .section-heading,
            .about-content,
            .about-info,
            .skill-card,
            .fresher-content,
            .fresher-badge,
            .timeline-item,
            .project-card,
            .objective-container,
            .strength-card,
            .contact-info,
            .contact-form

        `);


    const revealStyle =
        document.createElement("style");


    revealStyle.textContent = `

        .js-reveal {

            opacity:
                0;

            transform:
                translateY(25px);

            transition:
                opacity .7s ease,
                transform .7s ease;

        }


        .js-reveal.revealed {

            opacity:
                1;

            transform:
                translateY(0);

        }


        @media (
            prefers-reduced-motion: reduce
        ) {

            .js-reveal {

                opacity:
                    1;

                transform:
                    none;

                transition:
                    none;

            }

        }

    `;


    document.head.appendChild(
        revealStyle
    );


    /*
        Don't hide elements immediately.
        Start reveal after page has rendered.
        This prevents initial page flash.
    */

    requestAnimationFrame(function () {

        revealElements.forEach(
            function (element) {

                element.classList.add(
                    "js-reveal"
                );

            }
        );


        setTimeout(function () {

            if (
                "IntersectionObserver"
                in window
            ) {

                const observer =
                    new IntersectionObserver(
                        function (entries) {

                            entries.forEach(
                                function (entry) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        entry.target
                                            .classList
                                            .add(
                                                "revealed"
                                            );


                                        observer.unobserve(
                                            entry.target
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.1,

                            rootMargin:
                                "0px 0px -40px 0px"
                        }
                    );


                revealElements.forEach(
                    function (element) {

                        observer.observe(
                            element
                        );

                    }
                );

            } else {

                revealElements.forEach(
                    function (element) {

                        element.classList.add(
                            "revealed"
                        );

                    }
                );

            }

        }, 100);

    });


    /* =====================================================
       10. PROJECT IMAGE EFFECT
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        function (card) {

            const image =
                card.querySelector(
                    ".project-image"
                );


            if (!image) {
                return;
            }


            card.addEventListener(
                "mouseenter",
                function () {

                    image.style.transform =
                        "scale(1.025)";

                    image.style.transition =
                        "transform .45s ease";

                }
            );


            card.addEventListener(
                "mouseleave",
                function () {

                    image.style.transform =
                        "scale(1)";

                }
            );

        }
    );


    /* =====================================================
       11. BUTTON RIPPLE
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn"
        );


    const rippleStyle =
        document.createElement("style");


    rippleStyle.textContent = `

        .btn {

            position:
                relative;

            overflow:
                hidden;

        }


        .button-ripple {

            position:
                absolute;

            width:
                20px;

            height:
                20px;

            border-radius:
                50%;

            background:
                rgba(
                    255,
                    255,
                    255,
                    .25
                );

            transform:
                scale(0);

            animation:
                buttonRipple
                .6s
                ease-out;

            pointer-events:
                none;

        }


        @keyframes buttonRipple {

            to {

                transform:
                    scale(8);

                opacity:
                    0;

            }

        }

    `;


    document.head.appendChild(
        rippleStyle
    );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    const rect =
                        button.getBoundingClientRect();


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "button-ripple";


                    ripple.style.left =
                        (
                            event.clientX -
                            rect.left -
                            10
                        ) + "px";


                    ripple.style.top =
                        (
                            event.clientY -
                            rect.top -
                            10
                        ) + "px";


                    button.appendChild(
                        ripple
                    );


                    setTimeout(
                        function () {

                            ripple.remove();

                        },
                        600
                    );

                }
            );

        }
    );


    /* =====================================================
       12. BACK TO TOP
    ===================================================== */

    const backTop =
        document.createElement(
            "button"
        );


    backTop.className =
        "back-top";


    backTop.textContent =
        "↑";


    backTop.setAttribute(
        "type",
        "button"
    );


    backTop.setAttribute(
        "aria-label",
        "Back to top"
    );


    document.body.appendChild(
        backTop
    );


    const backTopStyle =
        document.createElement(
            "style"
        );


    backTopStyle.textContent = `

        .back-top {

            position:
                fixed;

            right:
                25px;

            bottom:
                25px;

            width:
                45px;

            height:
                45px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            border-radius:
                50%;

            background:
                rgba(
                    201,
                    166,
                    107,
                    .10
                );

            border:
                1px solid
                rgba(
                    201,
                    166,
                    107,
                    .28
                );

            color:
                #e0c48d;

            font-size:
                20px;

            opacity:
                0;

            visibility:
                hidden;

            transform:
                translateY(10px);

            transition:
                .3s ease;

            z-index:
                900;

            cursor:
                pointer;

        }


        .back-top.show {

            opacity:
                1;

            visibility:
                visible;

            transform:
                translateY(0);

        }


        .back-top:hover {

            background:
                #c9a66b;

            color:
                #17130d;

            transform:
                translateY(-4px);

        }


        @media (max-width: 600px) {

            .back-top {

                right:
                    18px;

                bottom:
                    18px;

            }

        }

    `;


    document.head.appendChild(
        backTopStyle
    );


    window.addEventListener(
        "scroll",
        function () {

            if (
                window.scrollY > 450
            ) {

                backTop.classList.add(
                    "show"
                );

            } else {

                backTop.classList.remove(
                    "show"
                );

            }

        },
        { passive: true }
    );


    backTop.addEventListener(
        "click",
        function () {

            window.scrollTo({

                top:
                    0,

                behavior:
                    "smooth"

            });

        }
    );


    /* =====================================================
       13. CONTACT FORM
    ===================================================== */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    document.querySelector(
                        "#name"
                    );


                const email =
                    document.querySelector(
                        "#email"
                    );


                const message =
                    document.querySelector(
                        "#message"
                    );


                if (
                    !name ||
                    !email ||
                    !message
                ) {

                    showToast(
                        "Please check the contact form.",
                        "error"
                    );

                    return;

                }


                const nameValue =
                    name.value.trim();


                const emailValue =
                    email.value.trim();


                const messageValue =
                    message.value.trim();


                if (
                    nameValue.length < 2
                ) {

                    showToast(
                        "Please enter your name.",
                        "error"
                    );

                    name.focus();

                    return;

                }


                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(
                        emailValue
                    )
                ) {

                    showToast(
                        "Please enter a valid email.",
                        "error"
                    );

                    email.focus();

                    return;

                }


                if (
                    messageValue.length < 10
                ) {

                    showToast(
                        "Message must be at least 10 characters.",
                        "error"
                    );

                    message.focus();

                    return;

                }


                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );


                const originalText =
                    submitButton
                        ? submitButton.textContent
                        : "Send Message";


                if (submitButton) {

                    submitButton.disabled =
                        true;

                    submitButton.textContent =
                        "Sending...";

                }


                setTimeout(
                    function () {

                        if (submitButton) {

                            submitButton.disabled =
                                false;

                            submitButton.textContent =
                                originalText;

                        }


                        contactForm.reset();


                        showToast(
                            "Thank you! Your message is ready.",
                            "success"
                        );


                    },
                    800
                );

            }
        );

    }


    /* =====================================================
       14. TOAST
    ===================================================== */

    function showToast(
        message,
        type
    ) {

        const oldToast =
            document.querySelector(
                ".premium-toast"
            );


        if (oldToast) {
            oldToast.remove();
        }


        const toast =
            document.createElement(
                "div"
            );


        toast.className =
            "premium-toast " +
            (
                type === "error"
                    ? "error"
                    : "success"
            );


        const icon =
            type === "error"
                ? "!"
                : "✓";


        toast.innerHTML = `

            <span class="toast-icon">
                ${icon}
            </span>

            <span class="toast-message">
                ${message}
            </span>

            <button
                class="toast-close"
                type="button"
                aria-label="Close"
            >
                ×
            </button>

        `;


        document.body.appendChild(
            toast
        );


        requestAnimationFrame(
            function () {

                toast.classList.add(
                    "show"
                );

            }
        );


        const closeButton =
            toast.querySelector(
                ".toast-close"
            );


        function removeToast() {

            toast.classList.remove(
                "show"
            );


            setTimeout(
                function () {

                    if (
                        toast.parentNode
                    ) {

                        toast.remove();

                    }

                },
                300
            );

        }


        closeButton.addEventListener(
            "click",
            removeToast
        );


        setTimeout(
            removeToast,
            3500
        );

    }


    /* =====================================================
       15. TOAST STYLE
    ===================================================== */

    const toastStyle =
        document.createElement(
            "style"
        );


    toastStyle.textContent = `

        .premium-toast {

            position:
                fixed;

            right:
                25px;

            bottom:
                80px;

            max-width:
                360px;

            display:
                flex;

            align-items:
                center;

            gap:
                12px;

            padding:
                14px 15px;

            background:
                rgba(
                    31,
                    27,
                    22,
                    .97
                );

            backdrop-filter:
                blur(15px);

            border:
                1px solid
                rgba(
                    201,
                    166,
                    107,
                    .25
                );

            border-radius:
                14px;

            box-shadow:
                0 20px 50px
                rgba(
                    0,
                    0,
                    0,
                    .35
                );

            transform:
                translateX(120%);

            opacity:
                0;

            transition:
                transform .35s ease,
                opacity .35s ease;

            z-index:
                9998;

        }


        .premium-toast.show {

            transform:
                translateX(0);

            opacity:
                1;

        }


        .toast-icon {

            width:
                28px;

            height:
                28px;

            display:
                flex;

            align-items:
                center;

            justify-content:
                center;

            flex-shrink:
                0;

            border-radius:
                50%;

            background:
                rgba(
                    201,
                    166,
                    107,
                    .12
                );

            color:
                #e0c48d;

            font-weight:
                800;

        }


        .toast-message {

            color:
                #eee7dc;

            font-size:
                .78rem;

            line-height:
                1.4;

        }


        .toast-close {

            margin-left:
                auto;

            background:
                transparent;

            border:
                none;

            color:
                #82796d;

            font-size:
                20px;

            cursor:
                pointer;

        }


        .toast-close:hover {

            color:
                #e0c48d;

        }


        @media (max-width: 600px) {

            .premium-toast {

                left:
                    18px;

                right:
                    18px;

                bottom:
                    70px;

                max-width:
                    none;

            }

        }

    `;


    document.head.appendChild(
        toastStyle
    );


    /* =====================================================
       16. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                if (navLinks) {

                    navLinks.classList.remove(
                        "mobile-open"
                    );

                }


                if (menuBtn) {

                    menuBtn.classList.remove(
                        "open"
                    );

                    menuBtn.textContent =
                        "☰";

                }

            }

        }
    );


    /* =====================================================
       17. CONSOLE
    ===================================================== */

    console.log(
        "%c Rahul Pal | Premium Portfolio ",
        "background:#c9a66b;color:#17130d;padding:8px 12px;border-radius:6px;font-weight:bold;"
    );

    console.log(
        "%c HTML • CSS • JavaScript ",
        "color:#e0c48d;font-size:12px;"
    );

});