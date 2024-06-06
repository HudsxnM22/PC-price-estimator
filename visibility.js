document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('inview');
            }
        });
    });

    const slidingElements = document.querySelectorAll('#about, #howTo');
    slidingElements.forEach(slidingElement => {
        observer.observe(slidingElement);
    });
});