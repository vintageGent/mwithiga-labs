import './style.css'
import blogData from './blog.json'

// Mwithiga Labs - Interactive Functions
document.addEventListener('DOMContentLoaded', () => {
    console.log('Hey there, fellow seeker! Mwithiga Labs is online.');

    // Load Blog Posts (Lab Notes)
    const blogContainer = document.getElementById('blog-container');
    const modal = document.getElementById('dispatch-modal');
    const closeBtn = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalCategory = document.getElementById('modal-category');
    const modalDate = document.getElementById('modal-date');
    const modalBody = document.getElementById('modal-body');

    if (blogContainer) {
        blogContainer.innerHTML = blogData.map(post => `
            <div class="blog-card glass-morphism">
                <span class="blog-category">${post.category}</span>
                <span class="blog-date">${post.date}</span>
                <h3>${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a href="#" class="read-more" data-id="${post.id}">Decrypt Full Dispatch</a>
            </div>
        `).join('');

        // Handle Read More clicks
        blogContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('read-more')) {
                e.preventDefault();
                const postId = parseInt(e.target.getAttribute('data-id'));
                const post = blogData.find(p => p.id === postId);

                if (post) {
                    modalTitle.textContent = post.title;
                    modalCategory.textContent = post.category;
                    modalDate.textContent = post.date;
                    modalBody.innerHTML = `<p>${post.content}</p>`;
                    modal.style.display = 'block';
                    document.body.style.overflow = 'hidden'; // Prevent scrolling
                }
            }
        });
    }

    // Modal Close Logic
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });


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

    // Mobile Drawer Logic
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const closeDrawerBtn = document.getElementById('close-drawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function toggleDrawer() {
        mobileDrawer.classList.toggle('open');
        drawerOverlay.classList.toggle('active');
        mobileToggle.classList.toggle('active');

        // Prevent body scrolling when menu is open
        if (mobileDrawer.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }

    function closeDrawer() {
        mobileDrawer.classList.remove('open');
        drawerOverlay.classList.remove('active');
        mobileToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleDrawer);
    }

    if (closeDrawerBtn) {
        closeDrawerBtn.addEventListener('click', closeDrawer);
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener('click', closeDrawer);
    }

    // Close drawer when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
    });

    // Smooth scroll for nav links (both desktop and mobile)
    const allNavLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    allNavLinks.forEach(link => {
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
