const tuitionData = {
  "kg-5": {
    label: "KG to V",
    subjects: ["English", "Mathematics", "EVS", "Hindi", "Tamil"],
    approach:
      "Foundation support for reading, writing, numbers, homework and regular practice habits."
  },

  "6-8": {
    label: "VI to VIII",
    subjects: [
      "Mathematics",
      "Science",
      "English",
      "Social Studies",
      "Hindi"
    ],
    approach:
      "Strong basics, worksheets, homework support and weekly practice checks."
  },

  "9-10": {
    label: "IX to X",
    subjects: ["Mathematics", "Science", "English", "Social Science"],
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
        "Biology",
        "English"
      ],
      commerce: [
        "Accountancy",
        "Business Studies",
        "Economics",
        "Mathematics",
        "English"
      ]
    },
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
    "Kamali Rajesh is listed as the Center Head.",

  meera:
    "Meera Ma'am is part of the academy's teaching section.",

  arun:
    "Arun Sir is part of the academy's teaching section."
};

$$(".teacher-more").forEach((button) => {
  button.addEventListener("click", () => {

    const teacher = button.dataset.teacher;

    $("#teacher-detail").textContent =
      teacherData[teacher];
  });
});


/* -----------------------------------
   ENQUIRY FORM
----------------------------------- */

$(".enquiry-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const name = formData.get("name");

  $("#form-note").textContent =
    `Thanks${name ? `, ${name}` : ""}! Your enquiry is ready to be shared with the academy.`;

  form.reset();
});


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