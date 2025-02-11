
console.log("GSAP script is loaded and running!");

gsap.config({
  nullTargetWarn: false,
});

// ──────────────────────────────
// Menu Open and Close (Navigation)
// ──────────────────────────────
let isMenuOpen = false; // Track whether the menu is open
let menuTimeline = gsap.timeline({ paused: true }); // Create a paused GSAP timeline for menu open/close

// Animate the menu container opening
menuTimeline.to(".menu-wrapper_container", {
  height: "auto",
  duration: 1,
  ease: "expo.out",
});

// Animate the top menu line
menuTimeline.to(
  ".menu-line-container.top",
  {
    rotation: 45,
    y: 4,
    duration: 1,
    ease: "expo.out",
  },
  0
);

// Animate the bottom menu line
menuTimeline.to(
  ".menu-line-container.bottom",
  {
    rotation: -45,
    y: -4,
    duration: 1,
    ease: "expo.out",
  },
  0
);

// Animate the menu block items
menuTimeline.from(
  ".menu-block",
  {
    opacity: 0,
    y: 10,
    duration: 0.6,
    stagger: 0.1,
    ease: "power4.out",
  },
  "-=0.4"
);

// Initially reverse the timeline so the menu starts closed
menuTimeline.reverse();

// Toggle menu open/close on clicking the .menu-open_container
$(".menu-open_container").on("click", function (e) {
  e.stopPropagation(); // Prevent the click from propagating to the body

  isMenuOpen = !isMenuOpen;
  if (isMenuOpen) {
    menuTimeline.timeScale(1); // Normal speed for opening
    menuTimeline.play();
  } else {
    menuTimeline.timeScale(2); // Faster closing
    menuTimeline.reverse();
  }
});

// Close the menu if the user clicks outside of it
$(document).on("click", function (e) {
  if (
    !$(e.target).closest(".menu-open_container, .menu-wrapper_container").length &&
    isMenuOpen
  ) {
    menuTimeline.timeScale(2);
    menuTimeline.reverse();
    isMenuOpen = false;
  }
});

// ──────────────────────────────
// Menu Hover (Navigation)
// ──────────────────────────────
$(".menu-open_container").each(function () {
  let hoverTimeline = gsap.timeline({
    paused: true,
    defaults: {
      duration: 0.3,
      ease: "power4.out",
    },
  });

  hoverTimeline.to(
    $(this).find(".menu-line.top"),
    { y: "-0.1rem" },
    0
  );
  hoverTimeline.to(
    $(this).find(".menu-line.bottom"),
    { y: "0.1rem" },
    0
  );

  $(this).on("mouseenter", function () {
    if (!isMenuOpen) {
      hoverTimeline.play();
    }
  });

  $(this).on("mouseleave", function () {
    if (!isMenuOpen) {
      hoverTimeline.reverse();
    }
  });
});

// ──────────────────────────────
// Navigation Move Out of View on Scroll
// ──────────────────────────────
const navbar = document.querySelector(".navbar_wrapper--new");
let lastScrollY = window.scrollY;
let isHidden = false;
let ticking = false;
const SCROLL_THRESHOLD = 50;
const DAMPENING_THRESHOLD = 150;

function hideNavbar() {
  if (!isHidden) {
    gsap.to(navbar, { yPercent: -100, duration: 0.5, ease: "power2.out" });
    isHidden = true;
  }
}

function showNavbar() {
  if (isHidden) {
    gsap.to(navbar, { yPercent: 0, duration: 0.5, ease: "power2.out" });
    isHidden = false;
  }
}

function onScroll() {
  let currentScrollY = window.scrollY;

  if (Math.abs(currentScrollY - lastScrollY) < SCROLL_THRESHOLD) {
    ticking = false;
    return;
  }

  if (currentScrollY > lastScrollY && currentScrollY > DAMPENING_THRESHOLD) {
    hideNavbar();
  } else if (currentScrollY < lastScrollY) {
    showNavbar();
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
});

// ──────────────────────────────
// CTA Hover Interaction
// ──────────────────────────────
$(".cta_wrapper").each(function () {
  let ctaHoverTimeline = gsap.timeline({ paused: true });

  ctaHoverTimeline.to(
    $(this).find(".button-icon"),
    {
      scale: 1.1,
      duration: 0.8,
      ease: "expo.out",
    },
    0
  );

  ctaHoverTimeline.to(
    $(this).find(".cta_text"),
    {
      color: "#828282",
      x: -5,
      duration: 0.8,
      ease: "expo.out",
    },
    0
  );

  ctaHoverTimeline.to(
    $(this).find(".icon-container"),
    {
      x: "100%",
      y: "-100%",
      duration: 0.8,
      ease: "expo.out",
    },
    0
  );

  ctaHoverTimeline.to(
    $(this).find(".second-icon_container"),
    {
      x: "100%",
      y: "-100%",
      duration: 0.8,
      ease: "expo.out",
    },
    0
  );

  $(this).on("mouseenter", function () {
    ctaHoverTimeline.play();
  });

  $(this).on("mouseleave", function () {
    ctaHoverTimeline.timeScale(2);
    ctaHoverTimeline.reverse();
  });
});

// ──────────────────────────────
// Scroll Indicator Animation
// ──────────────────────────────
let scrollIndicatorTl = gsap.timeline({ repeat: -1 });
scrollIndicatorTl
  .fromTo(
    ".scroll-indicator-icon",
    { opacity: 0, y: 0 },
    { opacity: 1, duration: 0.3, ease: "power1.inOut" }
  )
  .to(".scroll-indicator-icon", {
    y: "1.2rem",
    duration: 0.5,
    ease: "power1.inOut",
  })
  .to(".scroll-indicator-icon", {
    opacity: 0,
    duration: 0.3,
    ease: "power1.inOut",
  })
  .to(".scroll-indicator-icon", {
    Y: "-1.2rem",
    duration: 1.7,
    ease: "power1.inOut",
  });

// ──────────────────────────────
// Intro Line Lotties
// ──────────────────────────────
gsap.matchMedia().add("(min-width: 992px)", () => {
  gsap.utils.toArray(".content-container .text-parent").forEach((textParent, index) => {
    const lottieFirst = document.querySelector(".lottie-container_wrapper.first");
    const lottieSecond = document.querySelector(".lottie-container_wrapper.second");

    ScrollTrigger.create({
      trigger: textParent,
      start: "top+300 bottom",
      onEnter: () => {
        if (index === 0) {
          gsap.to(lottieFirst, { opacity: 1, duration: 1 });
          gsap.to(lottieSecond, { opacity: 0, duration: 1 });
        } else if (index === 1) {
          gsap.to(lottieFirst, { opacity: 0, duration: 1 });
          gsap.to(lottieSecond, { opacity: 1, duration: 1 });
        }
      },
      onLeaveBack: () => {
        if (index === 0) {
          gsap.to(lottieFirst, { opacity: 0, duration: 1 });
          gsap.to(lottieSecond, { opacity: 1, duration: 1 });
        } else if (index === 1) {
          gsap.to(lottieFirst, { opacity: 1, duration: 1 });
          gsap.to(lottieSecond, { opacity: 0, duration: 1 });
        }
      },
      toggleActions: "play none none reverse",
    });
  });
});

// ──────────────────────────────
// Line Reveal
// ──────────────────────────────
let offsetFromTop = window.innerHeight * 0.2;
let linerevealtl = gsap.timeline({
  scrollTrigger: {
    trigger: ".project-dashboard-section_wrapper",
    start: `top-=${offsetFromTop} top`,
  },
});
linerevealtl.to(".line-reveal", {
  yPercent: 100,
  duration: 3,
  ease: "none",
});

// ──────────────────────────────
// Reveal Text (Display Hidden First)
// ──────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  const headingElements = document.querySelectorAll(".heading_container");
  headingElements.forEach((heading) => {
    gsap.fromTo(
      heading,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power3.out" }
    );
  });
});

// ──────────────────────────────
// Text Scaling Effect
// ──────────────────────────────
const viewportHeight = window.innerHeight;
gsap.to(".scale_wrapper", {
  scale: 700,
  ease: CustomEase.create(
    "custom",
    "M0,0 C0.338,0 0.246,0.499 0.35,0.762 0.443,1 0.818,1.001 1,1 "
  ),
  scrollTrigger: {
    trigger: ".anim-type_wrapper",
    start: `${viewportHeight}px bottom`,
    end: "bottom bottom",
    scrub: true,
  },
});

// ──────────────────────────────
// Accordion Animation
// ──────────────────────────────
// ──────────────────────────────
// Accordion Animation
// ──────────────────────────────
document.addEventListener("DOMContentLoaded", function () {
  const accordionsWrappers = document.querySelectorAll(".accordians_wrapper");
  let autoPlayEnabled = false;

  accordionsWrappers.forEach((wrapper) => {
    const accordions = wrapper.querySelectorAll(".accordian-container");
    const visualsWrapper = wrapper
      .closest(".main-content_section")
      .querySelector(".accordian-images-wrapper");
    const visuals = visualsWrapper.querySelectorAll(".accordian-animation-wrapper");
    const progressBars = wrapper.querySelectorAll(".accordian-progress-bar");
    let currentIndex = 0;
    const accordionDuration = 15;
    let autoPlayTimeout;
    let progressBarTweens = [];
    let observer;

    function openAccordion(index) {
      accordions.forEach((accordion, i) => {
        const contentContainer = accordion.querySelector(".accordian-content-container");
        gsap.to(contentContainer, {
          height: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
        if (progressBarTweens[i]) {
          progressBarTweens[i].kill();
        }
        gsap.set(progressBars[i], { width: "0%" });
      });

      const activeAccordion = accordions[index];
      const contentContainer = activeAccordion.querySelector(".accordian-content-container");
      gsap.to(contentContainer, {
        height: "auto",
        duration: 0.5,
        ease: "power2.inOut",
      });
      progressBarTweens[index] = gsap.to(progressBars[index], {
        width: "100%",
        duration: accordionDuration,
        ease: "linear",
      });

      if (!visualsWrapper.id || visualsWrapper.id !== "dont-swap") {
        visuals.forEach((visual, i) => {
          gsap.to(visual, {
            opacity: i === index ? 1 : 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        });
      }
    }

    function cycleAccordions() {
      if (autoPlayEnabled) {
        openAccordion(currentIndex);
        currentIndex = (currentIndex + 1) % accordions.length;
        autoPlayTimeout = setTimeout(cycleAccordions, accordionDuration * 1000);
      }
    }

    function resetAutoPlay(index) {
      clearTimeout(autoPlayTimeout);
      currentIndex = index;
      openAccordion(currentIndex);
      currentIndex = (currentIndex + 1) % accordions.length;
      if (autoPlayEnabled) {
        autoPlayTimeout = setTimeout(cycleAccordions, accordionDuration * 1000);
      }
    }

    visuals.forEach((visual, i) => {
      visual.addEventListener("click", () => {
        resetAutoPlay(i);
      });
    });

    accordions.forEach((accordion, i) => {
      accordion.addEventListener("click", () => {
        resetAutoPlay(i);
      });
    });

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cycleAccordions();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(wrapper);

    if (!autoPlayEnabled) {
      openAccordion(0);
    }
  });

  window.toggleAutoPlay = function () {
    autoPlayEnabled = !autoPlayEnabled;
    if (autoPlayEnabled) {
      accordionsWrappers.forEach(() => {
        cycleAccordions();
      });
    } else {
      clearTimeout(autoPlayTimeout);
    }
  };
});

// ──────────────────────────────
// Count-Up Animation in Stats Section
// ──────────────────────────────
const section = document.querySelector(".main-content_section.bone.auto-height");

section.querySelectorAll(".count-up").forEach((el) => {
  el.setAttribute("data-target-number", el.textContent);
  el.textContent = "0";
});

let statsscrollintl = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top center",
    end: "bottom center",
    toggleActions: "play none none reverse",
  },
});

const gridColumnWrappers = section.querySelectorAll(".grid-column_wrapper");
const sectionTitles = section.querySelectorAll(".section-title_container");
const statLines = section.querySelectorAll(".stat-line");
const statCountWrappers = section.querySelectorAll(".stat-count_wrapper");

statsscrollintl
  .from(gridColumnWrappers, {
    clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
    duration: 1,
    stagger: 0.2,
  })
  .from(sectionTitles, { opacity: 0, x: -10, duration: 1 }, "-=0.5")
  .from(statLines, { height: "1.2rem", duration: 0.8 }, 0)
  .from(statCountWrappers, { opacity: 0, duration: 1, stagger: 0.2 }, "-=0.5")
  .addLabel("countUpTrigger")
  .add(() => {
    section.querySelectorAll(".count-up").forEach((el) => {
      const targetNumber = parseInt(el.getAttribute("data-target-number"), 10);
      gsap.to(el, {
        innerText: targetNumber,
        duration: 2,
        ease: "power1.out",
        snap: { innerText: 1 },
        onUpdate: () => (el.textContent = Math.round(el.innerText)),
      });
    });
  }, "countUpTrigger");
