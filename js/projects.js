document.addEventListener('DOMContentLoaded', function() {
  initProjectFilters();
});

function initProjectFilters() {
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const tags = card.getAttribute('data-tags') || '';
        const show = filterValue === 'all' || tags.includes(filterValue);

        if (show) {
          card.style.display = '';
          // Re-enable bento-wide span when showing
          if (card.classList.contains('bento-wide')) {
            card.style.gridColumn = '';
          }
          setTimeout(() => (card.style.opacity = '1'), 10);
        } else {
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.display = 'none';
            // Collapse wide cards when hidden so grid doesn't leave gaps
            if (card.classList.contains('bento-wide')) {
              card.style.gridColumn = 'span 1';
            }
          }, 250);
        }
      });
    });
  });
}
