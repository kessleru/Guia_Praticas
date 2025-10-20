// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Copy to clipboard functionality
function copyToClipboard(text) {
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    // Select and copy the text
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices
    
    try {
        document.execCommand('copy');
        showNotification('Comando copiado! ✅', 'success');
    } catch (err) {
        showNotification('Erro ao copiar comando ❌', 'error');
        console.error('Erro ao copiar:', err);
    }
    
    document.body.removeChild(textarea);
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: bold;
        animation: slideInRight 0.3s ease, slideOutRight 0.3s ease 2.7s;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'block';
    } else {
        backToTopButton.style.display = 'none';
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Highlight active section in navbar
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.navbar a');

function highlightActiveSection() {
    let current = '';
    const scrollPosition = window.pageYOffset + 250; // Ajuste para melhor detecção
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            current = section.getAttribute('id');
        }
    });
    
    // Se chegou ao final da página, considera a última seção
    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 100) {
        const lastSection = sections[sections.length - 1];
        current = lastSection.getAttribute('id');
    }
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Add active class style
const navStyle = document.createElement('style');
navStyle.textContent = `
    .navbar a.active {
        background: var(--primary-color);
        color: white;
    }
`;
document.head.appendChild(navStyle);

// Add new practice functionality
function showAddPracticeInfo() {
    const message = `
Para adicionar uma nova prática, edite o arquivo HTML e adicione um novo card de prática
seguindo o padrão da Prática 01.

Ou entre em contato com o instrutor: Otávio Kessler Ustra
    `;
    
    showNotification('Funcionalidade em desenvolvimento! 🚧', 'success');
    console.log(message);
}

// Add animation to cards when they come into view
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add stagger effect for multiple elements
            const delay = index * 100;
            
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(40px) scale(0.95)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, delay);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards with smooth animations
document.querySelectorAll('.command-card, .practice-card, .card').forEach(card => {
    observer.observe(card);
});

// Add smooth fade-in for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 1s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 50);
            
            sectionObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
});

// Observe section headers
document.querySelectorAll('.section h2').forEach(header => {
    sectionObserver.observe(header);
});

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to scroll to top
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        scrollToTop();
    }
    
    // Ctrl/Cmd + / to focus search (if implemented)
    if ((e.ctrlKey || e.metaKey) && e.key === '/') {
        e.preventDefault();
        showNotification('Busca em desenvolvimento! 🔍', 'success');
    }
});

// Add search functionality (basic implementation)
let searchTimeout;
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            filterContent(searchTerm);
        }, 300);
    });
}

function filterContent(searchTerm) {
    const cards = document.querySelectorAll('.command-card, .practice-card');
    
    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    if (searchTerm === '') {
        cards.forEach(card => card.style.display = 'block');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    console.log('🐳 Mini-Curso Docker - SNCT 2025');
    console.log('📚 Instrutor: Otávio Kessler Ustra');
    console.log('🎓 IFTM Campus Ituiutaba');
    
    // Add easter egg
    console.log('%c🚀 Dica: Use Ctrl+K para voltar ao topo!', 'color: #2496ed; font-size: 14px; font-weight: bold;');
    
    initSearch();
    highlightActiveSection();
});

// Add print functionality
function printGuide() {
    window.print();
}

// Add export to PDF functionality (basic)
function exportToPDF() {
    showNotification('Use Ctrl+P e selecione "Salvar como PDF" 📄', 'success');
    setTimeout(() => {
        window.print();
    }, 1500);
}

// Add dark mode toggle (bonus feature)
let darkMode = false;

function toggleDarkMode() {
    darkMode = !darkMode;
    document.body.classList.toggle('dark-mode');
    
    if (darkMode) {
        localStorage.setItem('darkMode', 'enabled');
        showNotification('Modo escuro ativado 🌙', 'success');
    } else {
        localStorage.setItem('darkMode', 'disabled');
        showNotification('Modo claro ativado ☀️', 'success');
    }
}

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    darkMode = true;
    document.body.classList.add('dark-mode');
}

// Add dark mode styles
const darkModeStyle = document.createElement('style');
darkModeStyle.textContent = `
    body.dark-mode {
        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
        color: #e0e0e0;
    }
    
    body.dark-mode .card,
    body.dark-mode .command-card,
    body.dark-mode .practice-card,
    body.dark-mode .mini-command-card {
        background: #2d2d44;
        color: #e0e0e0;
    }
    
    body.dark-mode .navbar {
        background: #2d2d44;
    }
    
    body.dark-mode .navbar a {
        color: #e0e0e0;
    }
    
    body.dark-mode .command-box,
    body.dark-mode .mini-command-card code {
        background: #1a1a2e;
        border-color: #444;
    }
    
    body.dark-mode .examples {
        background: #1a1a2e;
    }
    
    body.dark-mode .example-item {
        background: #2d2d44;
    }
    
    body.dark-mode .step {
        background: #1a1a2e;
    }
`;
document.head.appendChild(darkModeStyle);

// Toggle practice complete status
function togglePracticeComplete(practiceId) {
    const practiceCard = document.getElementById(practiceId);
    const button = practiceCard.querySelector('.complete-practice-btn');
    const isCompleted = practiceCard.classList.contains('completed');
    
    if (!isCompleted) {
        practiceCard.classList.add('completed');
        localStorage.setItem(practiceId, 'completed');
        button.innerHTML = '✓ Prática Concluída!';
        showNotification('Prática marcada como concluída! ✅', 'success');
    } else {
        practiceCard.classList.remove('completed');
        localStorage.removeItem(practiceId);
        button.innerHTML = 'Marcar como Concluída';
        showNotification('Prática desmarcada', 'success');
    }
}

// Load saved practice states
function loadPracticeStates() {
    const practices = document.querySelectorAll('.practice-card');
    practices.forEach(practice => {
        const practiceId = practice.id;
        const isCompleted = localStorage.getItem(practiceId);
        
        if (isCompleted === 'completed') {
            practice.classList.add('completed');
            const button = practice.querySelector('.complete-practice-btn');
            if (button) {
                button.innerHTML = '✓ Prática Concluída!';
            }
        }
    });
}

// Add performance monitoring
let pageLoadTime = 0;

window.addEventListener('load', () => {
    pageLoadTime = performance.now();
    console.log(`⚡ Página carregada em ${Math.round(pageLoadTime)}ms`);
    
    // Load practice states from localStorage
    loadPracticeStates();
});

// Add error handling for images (if you add images later)
document.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
        console.warn('Erro ao carregar imagem:', e.target.src);
    }
}, true);
