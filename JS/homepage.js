document.addEventListener('DOMContentLoaded', function() {
  // Carousel functionality
  const carousel = document.getElementById('carousel');
  const scrollAmount = 300; // Width of card + gap
  
  function scrollCarousel(direction) {
    carousel.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  }
  
  // Video modal functionality
  const videoModal = document.getElementById('videoModal');
  const closeModal = document.querySelector('.close-modal');
  
  document.querySelectorAll('.play-overlay').forEach(overlay => {
    overlay.addEventListener('click', function() {
      const videoId = this.getAttribute('data-video-id');
      const videoWrapper = document.querySelector('.video-wrapper');
      
      // For demo purposes - in production you would use your actual video IDs
      const videoEmbed = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                          frameborder="0" allowfullscreen></iframe>`;
      
      videoWrapper.innerHTML = videoEmbed;
      videoModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });
  });
  
  closeModal.addEventListener('click', function() {
    const videoWrapper = document.querySelector('.video-wrapper');
    videoWrapper.innerHTML = '';
    videoModal.style.display = 'none';
    document.body.style.overflow = '';
  });
  
  // Close modal when clicking outside
  videoModal.addEventListener('click', function(e) {
    if (e.target === videoModal) {
      closeModal.click();
    }
  });
  
  // Filter buttons
  document.querySelectorAll('.category-filters button').forEach(button => {
    button.addEventListener('click', function() {
      document.querySelector('.category-filters button.active').classList.remove('active');
      this.classList.add('active');
      // In a real implementation, you would filter the recipes here
    });
  });
});
