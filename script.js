// ========================================
// 1. Mobile Navigation Menu
// ========================================

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const menuLinks = document.querySelectorAll(".navbar a");

// Close mobile menu
function closeMenu() {
    navbar.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    menuToggle.textContent = "☰";
}

// Toggle mobile menu
menuToggle.addEventListener("click", function () {
    const isOpen = navbar.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    menuToggle.textContent = isOpen ? "×" : "☰";
});

// Close menu when a navigation link is clicked
menuLinks.forEach(function (link) {
    link.addEventListener("click", closeMenu);
});


// ========================================
// 2. Back to Top Button
// ========================================

const backToTop = document.querySelector(".back-to-top");

function updateBackToTop() {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
}

window.addEventListener("scroll", updateBackToTop);

updateBackToTop();


// ========================================
// 3. Portfolio Projects Data
// ========================================


const portfolioProjects = [
    {
        id: 4,
        title: "Luma Interior Studio",
        description: "A responsive interior design website with interactive navigation and a functional contact form.",
        github: "https://github.com/lilysadatrasoul/luma-interior-studio",
        demo: "https://lilysadatrasoul.github.io/luma-interior-studio/",
        image: "images/luma-preview.png"
    },
    {
        id: 5,
        title: "Donya Ghahremani Portfolio",
        description: "A bilingual artist portfolio featuring dynamic artwork galleries, JSON-based content, and interactive modals.",
        github: "https://github.com/lilysadatrasoul/donya-portfolio",
        demo: "https://lilysadatrasoul.github.io/donya-portfolio/",
        image: "images/donya-preview.png"
    },
    {
        id: 1,
        title: "Tech Store",
        description: "An interactive e-commerce frontend demo featuring product filtering, a shopping cart, and dark mode.",
        github: "https://github.com/lilysadatrasoul/shop-app",
        image: "images/tech-store-preview.png"
    }
];



// ========================================
// 4. Render Project Cards
// ========================================

const projectsGrid = document.querySelector(".projects-grid");

function renderProjects(projectsToShow) {

    // Remove existing cards
    projectsGrid.replaceChildren();

    // Create cards from project data
    projectsToShow.forEach(function (project, index) {

        const card = document.createElement("div");
        card.classList.add("project-card");


        if (project.image) {
            const projectImage = document.createElement("img");

            projectImage.src = project.image;
            projectImage.alt = `Preview of ${project.title}`;
            projectImage.classList.add("project-image");
            projectImage.loading = "lazy";

            card.appendChild(projectImage);
        }


        const title = document.createElement("h3");
        title.textContent = `${index + 1}. ${project.title}`;

        const description = document.createElement("p");
        description.textContent = project.description;

        card.appendChild(title);
        card.appendChild(description);


const linksContainer = document.createElement("div");
linksContainer.classList.add("project-links");

// GitHub link
if (project.github) {
    const githubLink = document.createElement("a");

    githubLink.href = project.github;
    githubLink.target = "_blank";
    githubLink.rel = "noopener noreferrer";
    githubLink.classList.add("project-link");
    githubLink.textContent = "GitHub";

    linksContainer.appendChild(githubLink);
}

// Live Demo link
if (project.demo) {
    const demoLink = document.createElement("a");

    demoLink.href = project.demo;
    demoLink.target = "_blank";
    demoLink.rel = "noopener noreferrer";
    demoLink.classList.add("project-link", "demo-link");
    demoLink.textContent = "Live Demo";

    linksContainer.appendChild(demoLink);
}

    card.appendChild(linksContainer);

    // View Details button
    const detailsButton = document.createElement("button");

    detailsButton.textContent = "View Details";
    detailsButton.classList.add("details-button");
    detailsButton.type = "button";

    detailsButton.addEventListener("click", function () {
    showProjectDetails(project.id);
    });

    card.appendChild(detailsButton);


        projectsGrid.appendChild(card);
    });
}


// ========================================
// searching project by id
// ========================================

const projectDetails = document.querySelector("#project-details");
const detailTitle = document.querySelector("#detail-title");
const detailDescription = document.querySelector("#detail-description");

function showProjectDetails(id) {
    const project = portfolioProjects.find(item => item.id === id);

    if (!project) {
        return;
    }

    detailTitle.textContent = project.title;
    detailDescription.textContent = project.description;

    projectDetails.hidden = false;
}


// ========================================
// closing detail
// ========================================
const closeDetailsButton = document.querySelector("#close-details");

closeDetailsButton.addEventListener("click", function() {
    projectDetails.hidden = true;
});

// ========================================
// 5. Project Search and Filtering
// ========================================


const searchInput = document.querySelector("#project-search");
const noResults = document.querySelector("#no-results");
const projectCount = document.querySelector("#project-count");

function filterProjects() {
    const searchText = searchInput.value.trim().toLowerCase();

    const matchedProjects = portfolioProjects.filter(function (project) {
        const projectText = `${project.title} ${project.description}`.toLowerCase();

        return projectText.includes(searchText);
    });

    renderProjects(matchedProjects);
    projectDetails.hidden = true;


    const visibleCount = matchedProjects.length;

    if (visibleCount === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }



    const projectLabel = visibleCount === 1 ? "project" : "projects";

    projectCount.textContent = `${visibleCount} ${projectLabel} found`;
}

searchInput.addEventListener("input", filterProjects);

filterProjects();


// ========================================
// 6. Contact Form Validation
// ========================================


const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");
const formStatus = document.getElementById("form-status");

if (contactForm && submitButton && formStatus) {
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
        formStatus.textContent = "Sending your message...";

        try {
            const response = await fetch(
                "https://formspree.io/f/mljjqbvw",
                {
                    method: "POST",
                    body: new FormData(contactForm),
                    headers: {
                        Accept: "application/json"
                    }
                }
            );

            if (!response.ok) {
                throw new Error("Message could not be sent");
            }

            formStatus.textContent =
                "Your message was sent successfully!";

            contactForm.reset();

        } catch (error) {
            console.error("Contact form error:", error);

            formStatus.textContent =
                "Something went wrong. Please try again.";

        } finally {
            submitButton.disabled = false;
            submitButton.textContent = "Send Message";
        }
    });
}
