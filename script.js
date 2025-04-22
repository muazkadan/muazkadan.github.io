// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize type animation
    initTypeAnimation();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize sticky header
    initStickyHeader();
    
    // Initialize project tabs
    initProjectTabs();
    
    // Initialize skill progress bars
    initSkillBars();
    
    // Initialize counter animation
    initCounterAnimation();
    
    // Initialize contact form
    initContactForm();
});

// Typing animation for the hero section
function initTypeAnimation() {
    new TypeIt(".typing-text", {
        strings: ["Android Developer", "Kotlin Expert", "Problem Solver", "Mobile Architect"],
        speed: 100,
        loop: true,
        breakLines: false,
        waitUntilVisible: true,
        lifeLike: true,
        loopDelay: 3000,
        startDelay: 500
    }).go();
}

// Initialize scroll animations and scroll spy
function initScrollAnimations() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                document.getElementById('nav-toggle').checked = false;
            }
        });
    });
    
    // Scroll spy for navigation
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize sticky header
function initStickyHeader() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Initialize project tabs
function initProjectTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.project-tab-content');
    
    // Load data from JSON file
    loadDataFromJSON();
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            
            // Update active button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show target content, hide others
            tabContents.forEach(content => {
                if (content.id === target) {
                    content.style.display = 'block';
                    
                    // Add fade-in animation
                    content.style.opacity = '0';
                    setTimeout(() => {
                        content.style.transition = 'opacity 0.5s ease';
                        content.style.opacity = '1';
                    }, 10);
                } else {
                    content.style.display = 'none';
                }
            });
        });
    });
}

// Load data from JSON file
function loadDataFromJSON() {
    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Render work experience
            renderWorkExperience(data.workExperience);
            
            // Render education
            renderEducation(data.education);
            
            // Render projects
            renderProjects(data.projects.personal, 'personal');
            renderProjects(data.projects.professional, 'professional');
            
            // Render articles
            renderArticles(data.articles);
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}

// Render work experience
function renderWorkExperience(experiences) {
    const timelineContainer = document.querySelector('.experience-section .timeline');
    if (!timelineContainer) return;
    
    // Clear existing content
    timelineContainer.innerHTML = '';
    
    // Add each experience item
    experiences.forEach(exp => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-date">${exp.period}</div>
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <p>${exp.company}, ${exp.location}</p>
                ${exp.description ? `<p>${exp.description}</p>` : ''}
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Render education
function renderEducation(educations) {
    const timelineContainer = document.querySelector('.education-section .timeline');
    if (!timelineContainer) return;
    
    // Clear existing content
    timelineContainer.innerHTML = '';
    
    // Add each education item
    educations.forEach(edu => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        
        timelineItem.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-date">${edu.period}</div>
            <div class="timeline-content">
                <h3>${edu.degree}</h3>
                <p>${edu.institution}, ${edu.location}</p>
                ${edu.description ? `<p>${edu.description}</p>` : ''}
            </div>
        `;
        
        timelineContainer.appendChild(timelineItem);
    });
}

// Render projects
function renderProjects(projects, tabId) {
    const projectGrid = document.querySelector(`#${tabId} .project-grid`);
    if (!projectGrid) return;
    
    // Clear existing content
    projectGrid.innerHTML = '';
    
    // Add each project
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        let linksHTML = '';
        if (project.links && project.links.length > 0) {
            linksHTML = '<div class="project-links">';
            project.links.forEach(link => {
                linksHTML += `
                    <a href="${link.url}" class="project-link">
                        <i class="${link.icon}"></i> ${link.text}
                    </a>
                `;
            });
            linksHTML += '</div>';
        }
        
        projectCard.innerHTML = `
            <div class="project-img">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                ${linksHTML}
            </div>
        `;
        
        projectGrid.appendChild(projectCard);
    });
}

// Render articles
function renderArticles(articles) {
    const articlesGrid = document.querySelector('#articles .project-grid');
    if (!articlesGrid) return;
    
    // Clear existing content
    articlesGrid.innerHTML = '';
    
    // Add each article
    articles.forEach(article => {
        const articleCard = document.createElement('div');
        articleCard.className = 'project-card article-card';
        
        let linksHTML = '';
        if (article.links && article.links.length > 0) {
            linksHTML = '<div class="project-links">';
            article.links.forEach(link => {
                linksHTML += `
                    <a href="${link.url}" class="project-link">
                        <i class="${link.icon}"></i> ${link.text}
                    </a>
                `;
            });
            linksHTML += '</div>';
        }
        
        articleCard.innerHTML = `
            <div class="project-img">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="project-info">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
                ${linksHTML}
            </div>
        `;
        
        articlesGrid.appendChild(articleCard);
    });
}

// Initialize skill progress bars
function initSkillBars() {
    const skillProgressBars = document.querySelectorAll('.skill-progress');
    
    // Apply initial styles to ensure proper animation
    skillProgressBars.forEach(bar => {
        bar.style.width = '0%';
        bar.style.transition = 'width 1.5s cubic-bezier(0.1, 0.5, 0.2, 1)';
    });
    
    // Create a function to animate the progress bars
    const animateProgressBar = (progressBar) => {
        const progressValue = progressBar.getAttribute('data-progress');
        // Delay to ensure the transition is applied
        setTimeout(() => {
            progressBar.style.width = progressValue;
        }, 100);
    };
    
    // Use Intersection Observer to trigger animation when visible
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBar(entry.target);
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Immediately animate progress bars if they're already visible
    skillProgressBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animateProgressBar(bar);
        } else {
            progressObserver.observe(bar);
        }
    });
}

// Initialize counter animation
function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent);
                let count = 0;
                let step = Math.ceil(target / 20);
                
                const updateCounter = () => {
                    if (count < target) {
                        count += step;
                        if (count > target) count = target;
                        counter.textContent = count;
                        requestAnimationFrame(updateCounter);
                    }
                };
                
                requestAnimationFrame(updateCounter);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Initialize contact form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showFormMessage('Please fill out all required fields', 'error');
                return;
            }
            
            // Simulate form submission success
            // In a real app, you would send this data to a server
            showFormMessage('Your message has been sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Show form submission message
function showFormMessage(message, type) {
    // Remove any existing message
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.classList.add('form-message', type === 'error' ? 'error' : 'success');
    messageElement.textContent = message;
    
    // Add message to form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.appendChild(messageElement);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            messageElement.classList.add('fade-out');
            setTimeout(() => {
                messageElement.remove();
            }, 500);
        }, 5000);
    }
}

// Add custom CSS for form messages
const formMessageStyles = document.createElement('style');
formMessageStyles.textContent = `
    .form-message {
        padding: 12px;
        margin-top: 20px;
        border-radius: 5px;
        font-size: 14px;
        transition: opacity 0.5s ease;
    }
    
    .form-message.success {
        background-color: rgba(16, 185, 129, 0.1);
        color: #10B981;
        border: 1px solid #10B981;
    }
    
    .form-message.error {
        background-color: rgba(239, 68, 68, 0.1);
        color: #EF4444;
        border: 1px solid #EF4444;
    }
    
    .form-message.fade-out {
        opacity: 0;
    }
`;
document.head.appendChild(formMessageStyles);