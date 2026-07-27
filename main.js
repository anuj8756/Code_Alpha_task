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

    // <-------------------- 1. GALLERY FILTER IMPLEMENTATION --------------------->
    function filterGallery(category) {
        galleryItems.forEach(item => {
            const isMatch = category === "all" || item.classList.contains(category);
            
            if (isMatch) {
                // <------------------------Ensure display configuration allows rendering--------------------------->
                              

                item.style.display = "block";

               
                // <-----------------------Let browser establish layout pipeline context before scaling visible element---------------------------------------->
                
                setTimeout(() => {
                    item.classList.add("show");
                }, 15);
            } else {
                item.classList.remove("show");

                // <-------------------Synchronize visibility termination sequence with style fade transitions--------------------------------->
                
                            setTimeout(() => {
                    if (!item.classList.contains("show")) {
                        item.style.display = "none";
                    }
                }, 400);
            }
        });
        
        // <---------------Refresh structural reference array containing current visible collection images-------------------->

        setTimeout(() => {
            activeImages = Array.from(galleryItems)
                .filter(item => item.style.display === "block")
                .map(item => item.querySelector("img"));
        }, 450);
    }

    // <----------------------Initialize gallery to default active filter view configuration------------------->
    filterGallery("all");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            document.querySelector(".filters button.active").classList.remove("active");
            button.classList.add("active");
            filterGallery(button.getAttribute("data-filter"));
        });
    });

    // <----------- 2. LIGHTBOX INTERACTIVITY CONTROL -------------->

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

    // <---------------------Handles content change fading sequence for transition navigations----------------------->

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

    //<---------------------------- Event Bindings----------------------------->

    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    // <-----------------Close view automatically if click targets backdrop element areas----------------->

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // <-----------------Keyboard bindings for cleaner UX-------------------->
    
    document.addEventListener("keydown", (e) => {
        if (!lightbox.classList.contains("open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") showNext();
        if (e.key === "ArrowLeft") showPrev();
    });
});