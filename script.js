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
    "Meet Dr. Vaanshika Rajesh.With a genuine passion for teaching, Dr. Vaanshika Rajesh brings a friendly and engaging approach to Science. She focuses on making concepts easy to understand while creating a comfortable space for students to learn and ask questions. Her teaching combines clarity, patience, and a little fun, making even challenging topics feel approachable. Her aim is simple, to help every student understand better, learn confidently, and enjoy the process.",

  himaya:
    "Meet Himaya Rajesh.Vivid, lively, and determined, Himaya brings energy and enthusiasm into every classroom. She makes challenging concepts feel simple, engaging, and easier to connect with. With her fun teaching style and focused approach, she inspires students to learn with confidence and curiosity. Learning with her isn’t just studying, it’s understanding, exploring, and enjoying the journey."
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