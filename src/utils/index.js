export function lazyLoad() {
  var lazyImages = document.querySelectorAll("img.lazy");

  var lazyImageObserver = new IntersectionObserver(
    function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    },
    {
      rootMargin: "0px 0px 100px 0px"
    }
  );
  lazyImages.forEach(function(lazyImage) {
    lazyImageObserver.observe(lazyImage);
  });
}
