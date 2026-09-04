const tuitionData = {
  "kg-5": {
    label: "KG to V",
    subjects: [
      "English",
      "Mathematics",
      "EVS"
    ],
    languages: [
      "Tamil",
      "Hindi"
    ],
    approach:
      "Foundation support for reading, writing, numbers, homework and regular practice habits."
  },

  "6-8": {
    label: "VI to VIII",
    subjects: [
      "Mathematics",
      "Science",
      "English",
      "Social Studies"
    ],
    languages: [
      "Tamil",
      "Hindi"
    ],
    approach:
      "Strong basics, worksheets, homework support and weekly practice checks."
  },

  "9-10": {
    label: "IX to X",
    subjects: [
      "Mathematics",
      "Science",
      "English",
      "Social Science"
    ],
    languages: [
      "Tamil",
      "Hindi"
    ],
    approach:
      "Concept-first teaching, chapter tests and exam-oriented revision."
  },

  "11-12": {
    label: "XI to XII",
    streams: {
      science: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Biology"
      ],
      commerce: [
        "Accountancy",
        "Business Studies",
        "Economics",
        "Mathematics"
      ]
    },
    languages: [],
    approach:
      "Stream-wise depth, board-pattern practice, scheduled tests and doubt clarification."
  }
};

const pathData = {
  basics: [
    "Basics support",
    "A concept-first approach with regular practice to strengthen the foundations."
  ],

  regular: [
    "Regular tuition",
    "Consistent lessons, homework support and practice to stay on track."
  ],

  board: [
    "Board exam preparation",
    "Focused revision, tests and answer-writing practice for exam confidence."
  ]
};

const needCopy = {
  clarity:
    "Recommended focus: concept clarity through smaller steps and guided practice.",

  exam:
    "Recommended focus: revision planning, tests and answer-writing practice.",

  practice:
    "Recommended focus: regular worksheets and chapter drills.",

  attention:
    "Recommended focus: individual guidance based on pace and learning gaps.",

  doubts:
    "Recommended focus: targeted doubt clarification and difficult-topic support."
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


/* -----------------------------------
   TUITION PROGRAM SELECTOR
----------------------------------- */

function updateTuition() {
  const classValue = $("#class-select").value;
  const boardValue = $("#board-select").value;
  const streamValue = $("#stream-select").value;

  const data = tuitionData[classValue];
  const isSenior = classValue === "11-12";

  const subjects = isSenior
    ? data.streams[streamValue]
    : data.subjects;

  // Show stream only for XI-XII
  $("#stream-wrap").style.display = isSenior ? "grid" : "none";

  // Update label
  $("#tuition-label").textContent =
    `${boardValue} | ${data.label}` +
    (isSenior
      ? ` | ${streamValue === "science" ? "Science" : "Commerce"}`
      : "");

  // Update subject pills
$("#subject-pills").innerHTML = subjects
  .map((subject) => `<span>${subject}</span>`)
  .join("");

$("#language-pills").innerHTML = data.languages
  ? data.languages
      .map((language) => `<span>${language}</span>`)
      .join("")
  : "";

$("#languages-section").style.display =
  data.languages && data.languages.length ? "block" : "none";

  // Update approach
  $("#approach-copy").textContent = data.approach;
}


// Tuition controls
[
  "#class-select",
  "#board-select",
  "#stream-select"
].forEach((selector) => {
  $(selector).addEventListener("change", updateTuition);
});


/* -----------------------------------
   LEARNING PATH
----------------------------------- */

$$("[data-path]").forEach((button) => {
  button.addEventListener("click", () => {

    // Active state
    $$("[data-path]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    // Get recommendation
    const data = pathData[button.dataset.path];

    $("#path-title").textContent = data[0];
    $("#path-copy").textContent = data[1];
  });
});


/* -----------------------------------
   QUICK HELP
----------------------------------- */

$$("[data-need]").forEach((button) => {
  button.addEventListener("click", () => {

    // Active state
    $$("[data-need]").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    // Update recommendation
    $("#need-result").textContent =
      needCopy[button.dataset.need];
  });
});


/* -----------------------------------
   TEACHER PROFILES
----------------------------------- */

const teacherData = {
  kamali:
    "Meet Mrs. Kamali Rajesh. Centre Head & Chief Teacher. The heart behind Lalitha Sree Academy, Mrs. Kamali Rajesh brings dedication, experience, and a passion for teaching. With her inspiring leadership and student-first approach, she turns learning into a journey of confidence and excellence. Her vision is simple, teach with purpose, guide with care, and inspire every student to achieve their best.",

  vaanshika:
    "Meet Dr. Vaanshika Rajesh. With a genuine passion for teaching, Dr. Vaanshika Rajesh brings a friendly and engaging approach to Science. She focuses on making concepts easy to understand while creating a comfortable space for students to learn and ask questions. Her teaching combines clarity, patience, and a little fun, making even challenging topics feel approachable. Her aim is simple, to help every student understand better, learn confidently, and enjoy the process.",

  himaya:
    "Meet Himaya Rajesh. Vivid, lively, and determined, Himaya brings energy and enthusiasm into every classroom. She makes challenging concepts feel simple, engaging, and easier to connect with. With her fun teaching style and focused approach, she inspires students to learn with confidence and curiosity. Learning with her isn’t just studying, it’s understanding, exploring, and enjoying the journey.",
};

$$(".teacher-more").forEach((button) => {
  button.addEventListener("click", () => {

    const teacher = button.dataset.teacher;

    $("#teacher-detail").innerHTML =
      teacherData[teacher].replace(/\n/g, "<br>");
  });
});


/* -----------------------------------
   ENQUIRY FORM
----------------------------------- */

/* -----------------------------------
   ENQUIRY FORM
----------------------------------- */

const enquiryForm = $(".enquiry-form");

if (enquiryForm) {
  enquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(enquiryForm);
    const name = String(formData.get("name") || "").trim();
    const program = String(formData.get("program") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const whatsappMessage =
      `Hello Lalitha Sree Academy,\n\n` +
      `I would like to enquire about tuition.\n\n` +
      `Name: ${name}\n` +
      `Student class: ${program}\n` +
      `Phone: ${phone}\n` +
      `Message: ${message || "I would like to know more about the tuition programs."}`;

    const whatsappUrl =
      `https://wa.me/919551677788?text=${encodeURIComponent(whatsappMessage)}`;

    // Use the current tab rather than window.open so mobile browsers
    // don't block the WhatsApp redirect as a popup.
    window.location.href = whatsappUrl;
  });
}

/* -----------------------------------
   MOBILE MENU
----------------------------------- */

const menuButton = $(".menu-toggle");
const navigation = $("#site-nav");

if (menuButton && navigation) {

  menuButton.addEventListener("click", () => {

    const isOpen =
      menuButton.getAttribute("aria-expanded") === "true";

    menuButton.setAttribute(
      "aria-expanded",
      String(!isOpen)
    );

    navigation.classList.toggle("open", !isOpen);
  });


  // Close menu after clicking a navigation link
  $$("nav a").forEach((link) => {

    link.addEventListener("click", () => {

      menuButton.setAttribute(
        "aria-expanded",
        "false"
      );

      navigation.classList.remove("open");
    });

  });
}


/* -----------------------------------
   SCROLL REVEAL ANIMATION
----------------------------------- */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.12
  }
);

$$(".reveal").forEach((element) => {
  observer.observe(element);
});


/* -----------------------------------
   3D GALLERY SCROLL
----------------------------------- */

const parallaxGallery = $("#gallery");
const galleryStage = parallaxGallery?.querySelector(".gallery-stage");
const galleryIntro = parallaxGallery?.querySelector(".gallery-intro");
let galleryTicking = false;
let galleryCurrentProgress = 0;
let galleryTargetProgress = 0;
let galleryActive = false;
let galleryTop = 0;
let galleryTravel = 1;

function measureGallery() {
  if (!parallaxGallery) return;
  galleryTop = parallaxGallery.offsetTop;
  galleryTravel = Math.max(parallaxGallery.offsetHeight - window.innerHeight, 1);
}

function updateGalleryActivity() {
  if (!parallaxGallery) return;
  const scrollTop = window.scrollY;
  const buffer = window.innerHeight * 0.7;
  galleryActive =
    scrollTop + window.innerHeight + buffer >= galleryTop &&
    scrollTop - buffer <= galleryTop + parallaxGallery.offsetHeight;
}

function updateParallaxGallery() {
  if (!parallaxGallery || !galleryStage || !galleryActive) {
    galleryTicking = false;
    return;
  }

  galleryTargetProgress = Math.min(
    Math.max((window.scrollY - galleryTop) / galleryTravel, 0),
    1
  );

  // Faster catch-up reduces the amount of time the page spends animating
  // the gallery after an anchor jump.
  galleryCurrentProgress +=
    (galleryTargetProgress - galleryCurrentProgress) * 0.16;

  if (Math.abs(galleryTargetProgress - galleryCurrentProgress) < 0.0007) {
    galleryCurrentProgress = galleryTargetProgress;
  }

  const progress = galleryCurrentProgress;
  const open = Math.min(progress / 0.38, 1);

  galleryStage.style.setProperty("--gallery-progress", progress.toFixed(4));
  galleryStage.style.setProperty("--gallery-open", open.toFixed(4));

  if (galleryIntro) {
    const introFade = Math.min(Math.max((progress - 0.08) / 0.22, 0), 1);
    galleryIntro.style.opacity = String(1 - introFade * 0.82);
    galleryIntro.style.transform =
      `translate3d(0, ${-introFade * 18}px, 0)`;
    galleryIntro.style.pointerEvents = introFade > 0.9 ? "none" : "auto";
  }

  galleryTicking = false;

  if (Math.abs(galleryTargetProgress - galleryCurrentProgress) > 0.0007) {
    requestGalleryUpdate();
  }
}

function requestGalleryUpdate() {
  updateGalleryActivity();
  if (galleryTicking || !galleryActive) return;
  galleryTicking = true;
  requestAnimationFrame(updateParallaxGallery);
}

if (parallaxGallery) {
  measureGallery();
  updateGalleryActivity();
  window.addEventListener("scroll", requestGalleryUpdate, { passive: true });
  window.addEventListener("resize", () => {
    measureGallery();
    requestGalleryUpdate();
  });
  updateParallaxGallery();
}

/* -----------------------------------
   GALLERY LIGHTBOX
----------------------------------- */

const galleryLightbox = $("#gallery-lightbox");
const galleryLightboxImage = $("#gallery-lightbox-image");
const galleryLightboxCaption = $("#gallery-lightbox-caption");
const galleryLightboxClose = $(".gallery-lightbox-close");

function closeGalleryLightbox() {
  if (!galleryLightbox) return;
  galleryLightbox.classList.remove("open");
  galleryLightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (galleryLightbox) {
  $$(".gallery-photo").forEach((item) => {
    item.addEventListener("click", () => {
      const image = item.dataset.galleryImage;
      const caption = item.dataset.galleryCaption || "";
      galleryLightboxImage.src = image;
      galleryLightboxImage.alt = caption;
      galleryLightboxCaption.textContent = caption;
      galleryLightbox.classList.add("open");
      galleryLightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      galleryLightboxClose?.focus();
    });
  });

  galleryLightboxClose?.addEventListener("click", closeGalleryLightbox);

  galleryLightbox.addEventListener("click", (event) => {
    if (event.target === galleryLightbox) closeGalleryLightbox();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && galleryLightbox.classList.contains("open")) {
      closeGalleryLightbox();
    }
  });
}

/* -----------------------------------
   FOOTER YEAR
----------------------------------- */

const yearElement = $("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* -----------------------------------
   INITIAL LOAD
----------------------------------- */

updateTuition();

/* -----------------------------------
   SMOOTH ANCHOR NAVIGATION
----------------------------------- */

$$('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = targetId && document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Sections already have enough top padding to sit comfortably below
    // the sticky header. Scroll to the section itself, rather than adding
    // another header offset. This keeps clicked navigation visually aligned
    // with the position reached by normal scrolling.
    const targetTop = target.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: reducedMotion ? "auto" : "smooth",
    });

    history.pushState(null, "", targetId);
  });
});

/* End smooth anchor navigation */


// Mobile gallery motion tuning: reduce the visual "push" on narrow screens.
if (window.matchMedia("(max-width: 760px)").matches) {
  document.documentElement.style.setProperty("--gallery-mobile", "1");
}
