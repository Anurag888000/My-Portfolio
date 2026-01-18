'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

function sendEmail() {
  const name = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Create mailto link
  const mailtoLink = `mailto:asish888000@gmail.com?subject=Contact%20Form%20Submission&body=Name:%20${encodeURIComponent(
    name
  )}%0AEmail:%20${encodeURIComponent(email)}%0A%0A${encodeURIComponent(
    message
  )}`;

  // Open mailto link
  window.location.href = mailtoLink;
}

// Project Carousel - Sync dots with animation
(function initCarouselDots() {
  const carousels = document.querySelectorAll('.project-carousel');
  
  carousels.forEach(carousel => {
    const dots = carousel.querySelectorAll('.carousel-dots .dot');
    if (dots.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = dots.length;
    const slideDuration = 3000; // 3 seconds per slide (matches CSS animation: 9s / 3 slides)
    
    function updateDots() {
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
      });
      currentSlide = (currentSlide + 1) % totalSlides;
    }
    
    // Initial state
    updateDots();
    
    // Sync with CSS animation timing
    setInterval(updateDots, slideDuration);
  });
})();

// Project Modal Functionality
(function initProjectModal() {
  const projectItems = document.querySelectorAll('[data-project-item]');
  const modalContainer = document.querySelector('[data-project-modal-container]');
  const modalOverlay = document.querySelector('[data-project-modal-overlay]');
  const modalCloseBtn = document.querySelector('[data-project-modal-close-btn]');
  const modalImg = document.querySelector('[data-project-modal-img]');
  const modalTitle = document.querySelector('[data-project-modal-title]');
  const modalDescription = document.querySelector('[data-project-modal-description]');
  const githubBtn = document.querySelector('[data-project-github-btn]');
  const liveBtn = document.querySelector('[data-project-live-btn]');

  if (!modalContainer) return;

  // Toggle modal
  function toggleModal() {
    modalContainer.classList.toggle('active');
    document.body.style.overflow = modalContainer.classList.contains('active') ? 'hidden' : '';
  }

  // Populate modal with project data
  function populateModal(projectItem) {
    const title = projectItem.dataset.title || '';
    let description = projectItem.dataset.description || '';
    const github = projectItem.dataset.github || '';
    const live = projectItem.dataset.live || '';
    const image = projectItem.dataset.image || '';

    // Format description: convert || to section break, | to line breaks
    description = description
      .replace(/\|\|/g, '<br><br>')  // Double pipe = section break
      .replace(/\|/g, '<br>');       // Single pipe = line break

    modalImg.src = image;
    modalImg.alt = title;
    modalTitle.textContent = title;
    modalDescription.innerHTML = description;

    // Show/hide GitHub button
    if (github) {
      githubBtn.href = github;
      githubBtn.classList.remove('hidden');
    } else {
      githubBtn.classList.add('hidden');
    }

    // Show/hide Live button
    if (live) {
      liveBtn.href = live;
      liveBtn.classList.remove('hidden');
    } else {
      liveBtn.classList.add('hidden');
    }

    toggleModal();
  }

  // Add click event to all project items
  projectItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      populateModal(this);
    });
  });

  // Close modal events
  modalCloseBtn.addEventListener('click', toggleModal);
  modalOverlay.addEventListener('click', toggleModal);

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
      toggleModal();
    }
  });
})();
