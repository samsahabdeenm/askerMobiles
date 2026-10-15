/* =========================================================
   ASKER LAND PROMOTORS
   MARKDOWN CONTENT LOADER + WEBSITE FUNCTIONS
========================================================= */


/* =========================================================
   MARKDOWN TO HTML
   Simple Markdown Parser
========================================================= */

function markdownToHTML(markdown) {

    let lines = markdown
        .replace(/\r/g, "")
        .split("\n");

    let html = "";
    let inList = false;

    lines.forEach(function (line) {

        line = line.trim();

        /* Empty line */
        if (line === "") {

            if (inList) {
                html += "</ul>";
                inList = false;
            }

            return;
        }


        /* Heading 1 */
        if (line.startsWith("# ")) {

            if (inList) {
                html += "</ul>";
                inList = false;
            }

            html += "<h1>" + formatInline(line.substring(2)) + "</h1>";

            return;
        }


        /* Heading 2 */
        if (line.startsWith("## ")) {

            if (inList) {
                html += "</ul>";
                inList = false;
            }

            html += "<h2>" + formatInline(line.substring(3)) + "</h2>";

            return;
        }


        /* Heading 3 */
        if (line.startsWith("### ")) {

            if (inList) {
                html += "</ul>";
                inList = false;
            }

            html += "<h3>" + formatInline(line.substring(4)) + "</h3>";

            return;
        }


        /* Bullet List */
        if (line.startsWith("- ")) {

            if (!inList) {
                html += "<ul>";
                inList = true;
            }

            html += "<li>" + formatInline(line.substring(2)) + "</li>";

            return;
        }


        /* Normal Paragraph */
        if (inList) {
            html += "</ul>";
            inList = false;
        }

        html += "<p>" + formatInline(line) + "</p>";

    });


    /* Close remaining list */

    if (inList) {
        html += "</ul>";
    }


    return html;
}


/* =========================================================
   INLINE MARKDOWN
========================================================= */

function formatInline(text) {

    /* Bold */

    text = text.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>"
    );


    /* Italic */

    text = text.replace(
        /\*(.*?)\*/g,
        "<em>$1</em>"
    );


    /* Links */

    text = text.replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2">$1</a>'
    );


    /* Line Break */

    text = text.replace(
        /<br\s*\/?>/gi,
        "<br>"
    );


    return text;
}


/* =========================================================
   LOAD MARKDOWN FILE
========================================================= */

async function loadMarkdown(file, elementId) {

    const element = document.getElementById(elementId);

    if (!element) {
        return;
    }

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error("Unable to load " + file);
        }

        const markdown = await response.text();

        element.innerHTML = markdownToHTML(markdown);

    }

    catch (error) {

        console.error(error);

        element.innerHTML =
            "<p>Content could not be loaded.</p>";

    }
}


/* =========================================================
   LOAD ALL CONTENT
========================================================= */

async function loadAllContent() {

    await Promise.all([

        loadMarkdown(
            "content/home.md",
            "home-content"
        ),

        loadMarkdown(
            "content/about.md",
            "about-content"
        ),

        loadMarkdown(
            "content/services.md",
            "services-content"
        ),

        loadMarkdown(
            "content/why-us.md",
            "why-us-content"
        ),

        loadMarkdown(
            "content/contact.md",
            "contact-content"
        )

    ]);

}


/* =========================================================
   MOBILE MENU
========================================================= */

function setupMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");

    const navLinks =
        document.querySelectorAll(".nav-menu a");


    if (!menuToggle || !navMenu) {
        return;
    }


    /* Open / Close Menu */

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

    });


    /* Close after clicking a link */

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

        });

    });


    /* Close when clicking outside */

    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedButton =
            menuToggle.contains(event.target);


        if (!clickedInsideMenu && !clickedButton) {

            navMenu.classList.remove("active");

        }

    });


    /* Close menu when screen becomes desktop */

    window.addEventListener("resize", function () {

        if (window.innerWidth > 768) {

            navMenu.classList.remove("active");

        }

    });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

function setCurrentYear() {

    const yearElement =
        document.getElementById("current-year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

}


/* =========================================================
   CONTACT / WHATSAPP SETTINGS
========================================================= */

/*
   IMPORTANT:
   Later actual company number and social media
   links can be added here.
*/

const companyDetails = {

    whatsapp:
        "https://wa.me/918675002200",

    instagram:
        "https://www.instagram.com/asker_land_promotors",

    facebook:
        "https://www.facebook.com/AskerMobilesUdangudi",

};


/* =========================================================
   SET SOCIAL LINKS
========================================================= */

function setupSocialLinks() {

    const instagram =
        document.getElementById("instagram-link");

    const facebook =
        document.getElementById("facebook-link");

    const youtube =
        document.getElementById("youtube-link");

    const footerWhatsapp =
        document.getElementById("footer-whatsapp");

    const navWhatsapp =
        document.getElementById("nav-whatsapp");


    if (instagram) {
        instagram.href =
            companyDetails.instagram;
    }


    if (facebook) {
        facebook.href =
            companyDetails.facebook;
    }


    if (youtube) {
        youtube.href =
            companyDetails.youtube;
    }


    if (footerWhatsapp) {
        footerWhatsapp.href =
            companyDetails.whatsapp;
    }


    if (navWhatsapp) {
        navWhatsapp.href =
            companyDetails.whatsapp;
    }

}


/* =========================================================
   INITIALIZE WEBSITE
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAllContent();

        setupMobileMenu();

        setCurrentYear();

        setupSocialLinks();

    }
);
