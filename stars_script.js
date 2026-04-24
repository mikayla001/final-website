// Function to generate star graphics from a rating value (0 to 5, supports .5 increments)
function renderStars(ratingValue, container) {
    if (!container) return;
    
    // Clear container
    container.innerHTML = '';
    
    // Clamp rating between 0 and 5
    let rating = Math.min(5, Math.max(0, ratingValue));
    
    // Calculate full stars, half star, empty stars
    const fullStars = Math.floor(rating);
    const hasHalfStar = (rating - fullStars) >= 0.25;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        const starSpan = document.createElement('span');
        starSpan.className = 'star-graphic star-full';
        container.appendChild(starSpan);
    }
    
    // Add half star if needed
    if (hasHalfStar) {
        const halfStarSpan = document.createElement('span');
        halfStarSpan.className = 'star-graphic star-half';
        container.appendChild(halfStarSpan);
    }
    
    // Add empty stars
    let totalStarsDisplayed = fullStars + (hasHalfStar ? 1 : 0);
    const emptyStars = 5 - totalStarsDisplayed;
    
    for (let i = 0; i < emptyStars; i++) {
        const emptyStarSpan = document.createElement('span');
        emptyStarSpan.className = 'star-graphic star-empty';
        container.appendChild(emptyStarSpan);
    }
    
    // Add numeric rating display
    let ratingNumberSpan = container.parentNode.querySelector('.rating-number');
    if (!ratingNumberSpan) {
        ratingNumberSpan = document.createElement('span');
        ratingNumberSpan.className = 'rating-number';
        container.parentNode.appendChild(ratingNumberSpan);
    }
    
    // Format rating display
    if (rating === Math.floor(rating)) {
        ratingNumberSpan.textContent = `${rating} / 5 ★`;
    } else {
        ratingNumberSpan.textContent = `${rating} / 5 ★`;
    }
}

// Initialize ALL rating displays on page load - FIXED to loop through all
function initAllRatings() {
    const ratingContainers = document.querySelectorAll('.stars-display');
    console.log('Found', ratingContainers.length, 'rating containers'); // Debug line
    
    ratingContainers.forEach(container => {
        const ratingAttr = container.getAttribute('data-rating');
        if (ratingAttr !== null) {
            const rating = parseFloat(ratingAttr);
            if (!isNaN(rating)) {
                renderStars(rating, container);
            } else {
                renderStars(0, container);
            }
        }
    });
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllRatings);
} else {
    initAllRatings();
}