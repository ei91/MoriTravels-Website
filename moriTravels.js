// Initialize Swiper.js
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    keyboard: {
        enabled: true,
    },
});

let translations = {};

// Fetch translations from your JSON file
fetch('/translations.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        translations = data;
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Default to English
        changeLanguage(savedLanguage);
    })
    .catch(error => console.error('Error loading translations:', error));

// Language change function
function changeLanguage(language) {
    if (!translations[language]) {
        console.error(`Language ${language} not supported.`);
        return;
    }

    const textElements = {
        'title': document.querySelector('title'),
        'home': document.querySelector('nav .text-box h1'),
        'about': document.querySelector('.navigation-links ul li a[href="about-page.html"]'),
        'plan_trip': document.querySelector('.navigation-links ul li a[href="plantrip.html"]'),
        'contact': document.querySelector('.navigation-links ul li a[href="contact.html"]'),
        'login': document.querySelector('.navigation-links ul li a[href="login.html"]'),
        'leave_review': document.querySelector('.navigation-links .dropdown-content a[href="leaveReview.html"]'),
        'join_mailing_list': document.querySelector('.mailing-list-form button'),
        'about_us': document.querySelector('.additional-info h2'),
        'about_text': document.querySelector('.additional-info p'),
        'get_in_touch': document.querySelector('.contact-form-wrapper h2'),
        'telephone': document.querySelector('.contact-form-wrapper p.font-colour:nth-of-type(1)'),
        'email': document.querySelector('.contact-form-wrapper p.font-colour:nth-of-type(2)'),
        'faq': document.querySelector('.faq h2'),
        'faq_1_question': document.querySelector('.faq-item:nth-of-type(1) h3'),
        'faq_1_answer': document.querySelector('.faq-item:nth-of-type(1) p'),
        'faq_2_question': document.querySelector('.faq-item:nth-of-type(2) h3'),
        'faq_2_answer': document.querySelector('.faq-item:nth-of-type(2) p'),
        'faq_3_question': document.querySelector('.faq-item:nth-of-type(3) h3'),
        'faq_3_answer': document.querySelector('.faq-item:nth-of-type(3) p'),
        'faq_4_question': document.querySelector('.faq-item:nth-of-type(4) h3'),
        'faq_4_answer': document.querySelector('.faq-item:nth-of-type(4) p'),
        'about-title': document.querySelector('#h1'),
        'about-text-1': document.querySelector('.about-container p:nth-of-type(1)'),
        'about-text-2': document.querySelector('.about-container p:nth-of-type(2)'),
        'about-text-3': document.querySelector('.about-container p:nth-of-type(3)'),
        'about-text-4': document.querySelector('.about-container p:nth-of-type(4)'),
        'about-text-5': document.querySelector('.about-container p:nth-of-type(5)'),
        'about-text-6': document.querySelector('.about-container p:nth-of-type(6)'),
        'travel-services': document.querySelector('.about-container ul'),
        'flexibility': document.querySelector('.about-container p:nth-of-type(8)'),
        'contact': document.querySelector('.about-container p:last-of-type')
    };

    Object.keys(translations[language]).forEach(key => {
        if (textElements[key]) {
            if (Array.isArray(translations[language][key])) {
                textElements[key].innerHTML = translations[language][key].map(item => `<li>${item}</li>`).join('');
            } else {
                textElements[key].textContent = translations[language][key];
            }
        }
    });

    if (textElements['title']) {
        textElements['title'].textContent = translations[language].title || 'Default Title';
    }

    localStorage.setItem('selectedLanguage', language);
}

// Event listeners for dropdown menu items
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const lang = event.target.getAttribute('data-language');

        // Change language if a language option is clicked
        if (translations[lang]) {
            changeLanguage(lang);
        } else {
            // Navigate to the specified page if it's not a language change
            window.location.href = event.target.href; // Navigate to the link
        }
    });
});


// Event listeners for dropdown menu items
document.querySelectorAll('.dropdown-content a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior
        const lang = event.target.getAttribute('data-language');
        
        // Change language if a language option is clicked
        if (translations[lang]) {
            changeLanguage(lang);
        } else {
            // Navigate to the specified page if it's not a language change
            window.location.href = event.target.href; // Navigate to the link
        }
    });
});

// Function to toggle chat visibility
function toggleChat(event) {
    if (event) event.stopPropagation(); // Prevent triggering the chatbot icon's onclick event
    const chat = document.querySelector('.chat-assistant');
    const chatIcon = document.querySelector('.chatbot-icon');
    
    chat.classList.toggle('active');
    chatIcon.style.display = chat.classList.contains('active') ? 'none' : 'block';
}

function toggleMenu() {
    const navigationLinks = document.querySelector('.navigation-links');
    navigationLinks.classList.toggle('active');

    // Prevent background scrolling when the menu is open
    if (navigationLinks.classList.contains('active')) {
        document.body.classList.add('menu-open');
    } else {
        document.body.classList.remove('menu-open');
    }
}





// Event listeners for mailing list form submission
document.querySelector('.mailing-list-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Thank you for subscribing! Get ready for amazing travel experiences.');
    this.reset();
});

// Hide spinner once the page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Fade-in and slide-in effects for sections
function revealSections() {
    const sections = document.querySelectorAll('.fade-in-section, .slide-in-section');
    sections.forEach(section => {
        const sectionPosition = section.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (sectionPosition < screenPosition) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealSections);

// Initialize date range picker
document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#date-range", {
        mode: "range",
        dateFormat: "d/m/Y",
        onChange: function(selectedDates) {
            if (selectedDates.length === 2) {
                const formattedStartDate = flatpickr.formatDate(selectedDates[0], "d/m/y");
                const formattedEndDate = flatpickr.formatDate(selectedDates[1], "d/m/y");
                document.getElementById("start-date").value = formattedStartDate;
                document.getElementById("end-date").value = formattedEndDate;
                document.getElementById("date-range").value = `${formattedStartDate} - ${formattedEndDate}`;
            }
        }
    });
});

// Chatbot functionality
function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) return;

    const chatBody = document.getElementById('chat-body');
    
    // Append user message
    const userMessage = document.createElement('div');
    userMessage.classList.add('chat-message', 'user-message');
    userMessage.textContent = userInput;
    chatBody.appendChild(userMessage);

    // Clear input
    document.getElementById('user-input').value = '';

    // Process the message
    const botResponse = processMessage(userInput);
    
    // Append bot response
    const botMessage = document.createElement('div');
    botMessage.classList.add('chat-message', 'bot-message');
    botMessage.textContent = botResponse;
    chatBody.appendChild(botMessage);
    
    // Scroll to the bottom
    chatBody.scrollTop = chatBody.scrollHeight;
}

function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        return 'Hello! How can I assist you today?';
    } else if (lowerMessage.includes('book') || lowerMessage.includes('trip')) {
        return 'I can help you plan your trip! Where would you like to go?';
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        return 'I can provide a quote for your trip. Please provide more details.';
    } else {
        return 'I\'m sorry, I didn\'t understand that. Could you please rephrase?';
    }
}

// Ensure the dropdown opens when clicked on mobile
document.querySelector('.dropbtn').addEventListener('click', function (event) {
    event.preventDefault(); // Prevents the default link behavior
    const dropdownContent = this.nextElementSibling;

    // Toggle the dropdown visibility
    if (dropdownContent.style.display === 'block') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'block';
    }
});

// Close the dropdown if clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.querySelector('.dropdown-content');
    const targetElement = event.target; 

    // Check if the clicked element is not inside the dropdown or the button
    if (!dropdown.contains(targetElement) && targetElement !== document.querySelector('.dropbtn')) {
        dropdown.style.display = 'none';
    }
});

// Update text content for the form page
const formTextElements = {
    'headline': document.querySelector('.form-container h2.headline'),
    'full_name': document.querySelector('label[for="fullname"]'),
    'email': document.querySelector('label[for="email"]'),
    'phone': document.querySelector('label[for="phone"]'),
    'destination': document.querySelector('label[for="destination"]'),
    'resort': document.querySelector('label[for="resort"]'),
    'duration': document.querySelector('label[for="date-range"]'),
    'travelers': document.querySelector('label[for="travelers"]'),
    'budget': document.querySelector('label[for="budget"]'),
    'further_enquiry': document.querySelector('label[for="enquiry"]'),
    'cta_button': document.querySelector('.form-container button.cta-button'),
};

// Update text content
Object.keys(translations[language]).forEach(key => {
    if (formTextElements[key]) {
        formTextElements[key].textContent = translations[language][key];
    }
});
