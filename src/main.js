import './style.css'
import blogData from './blog.json'

// Mwithiga Labs - Interactive Functions
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hey there, fellow seeker! Mwithiga Labs is online.');

    // Load Blog Posts (Lab Notes)
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) {
        blogContainer.innerHTML = blogData.map(post => `
            <div class="blog-card glass-morphism">
                <span class="blog-category">${post.category}</span>
                <span class="blog-date">${post.date}</span>
                <h3>${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="#" class="read-more">Decrypt Full Dispatch</a>
            </div>
        `).join('');
    }

    // Add subtle hover effects to tool cards
    const cards = document.querySelectorAll('.tool-card, .blog-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = 'var(--mint)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'var(--glass-border)';
        });
    });

    // Smooth scroll for nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
