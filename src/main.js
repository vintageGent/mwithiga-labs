import './style.css'
import blogData from './blog.json'
import spotifyData from './spotify_data.json'

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

    // Discovery Hub Logic (Neon Night FYP)
    const masonryGrid = document.getElementById('masonry-grid');
    const refreshBtn = document.getElementById('refresh-fyp');
    const authBtn = document.getElementById('auth-spotify');

    function renderDiscovery(data) {
        if (!masonryGrid) return;

        masonryGrid.innerHTML = data.map(track => `
            <div class="masonry-item glass-morphism" style="min-height: ${track.height}">
                <img src="${track.image}" alt="${track.title}" class="card-image">
                <div class="card-overlay">
                    <div class="card-title">${track.title}</div>
                    <div class="card-artist">${track.artist}</div>
                    <div class="spotify-embed-container">
                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/${track.spotify_id}?utm_source=generator&theme=0" width="100%" height="80" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        `).join('');
    }

    if (masonryGrid) {
        renderDiscovery(spotifyData);
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            masonryGrid.innerHTML = '<div class="loading">Reshuffling neon frequencies...</div>';
            setTimeout(() => {
                const shuffled = [...spotifyData].sort(() => 0.5 - Math.random());
                renderDiscovery(shuffled);
            }, 800);
        });
    }

    if (authBtn) {
        authBtn.addEventListener('click', () => {
            alert('Seeker, the Spotify OAuth protocol is being calibrated. In the final build, this will connect your real-time FYP.');
        });
    }

    // Add subtle hover effects to tool cards
    const cards = document.querySelectorAll('.tool-card, .blog-card, .masonry-item');
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
