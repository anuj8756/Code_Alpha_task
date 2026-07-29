document.addEventListener("DOMContentLoaded", () => {
    const filterButtons = document.querySelectorAll(".filters button");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.querySelector(".lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeBtn = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");

    let activeImages = [];
    let currentIndex = 0;

    
    function filterGallery(category) {
        galleryItems.forEach(item => {
            const isMatch = category === "all" || item.classList.contains(category);
            
            if (isMatch) {                                          

                item.style.display = "block";
          
                          
                setTimeout(() => {
                    item.classList.add("show");
                }, 15);
            } else {
                item.classList.remove("show");
                setTimeout(() => {
                    if (!item.classList.contains("show")) {
                        item.style.display = "none";
                    }
                }, 400);
            }
        });
        
        setTimeout(() => {
            activeImages = Array.from(galleryItems)
                .filter(item => item.style.display === "block")
                .map(item => item.querySelector("img"));
        }, 450);
    }

       filterGallery("all");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".filters button.active").classList.remove("active");
            button.classList.add("active");
            filterGallery(button.getAttribute("data-filter"));
        });
    });

     galleryItems.forEach(item => {
        item.querySelector("img").addEventListener("click", (e) => {
            const clickedImg = e.target;
            currentIndex = activeImages.indexOf(clickedImg);
            
            lightboxImg.src = clickedImg.src;
            lightbox.classList.add("open");
        });
    });

    function closeLightbox() {
        lightbox.classList.remove("open");
    }

      function updateLightboxImage(newIndex) {
        currentIndex = newIndex;
        lightboxImg.style.opacity = "0.3";
        
        setTimeout(() => {
            lightboxImg.src = activeImages[currentIndex].src;
            lightboxImg.style.opacity = "1";
        }, 120);
    }

    function showNext() {
        const nextIdx = (currentIndex + 1) % activeImages.length;
        updateLightboxImage(nextIdx);
    }

    function showPrev() {
        const prevIdx = (currentIndex - 1 + activeImages.length) % activeImages.length;
        updateLightboxImage(prevIdx);
    }

     closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

  
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

   
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });
});
