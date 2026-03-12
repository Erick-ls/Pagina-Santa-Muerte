document.addEventListener('DOMContentLoaded', function () {

    // =============================
    // ELEMENTOS DEL DOM
    // =============================
    const loader = document.getElementById('loader');
    const progress = document.getElementById('progress');
    const mainContent = document.getElementById('main-content');
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const videoCarousel = document.getElementById('video-carousel');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.getElementById('lightbox-close');
    const whatsappFloat = document.getElementById('whatsapp-float');
    const whatsappModal = document.getElementById('whatsapp-modal');
    const modalClose = document.getElementById('modal-close');
    const modalCancel = document.getElementById('modal-cancel');
    const whatsappSend = document.getElementById('whatsapp-send');
    const whatsappServiceBtns = document.querySelectorAll('.whatsapp-service-btn');
    const amarresWhatsappBtn = document.getElementById('amarres-whatsapp-btn');

    // =============================
    // CARRUSEL
    // =============================
    let currentVideoIndex = 0;
    const totalVideos = document.querySelectorAll('.video-item').length;
    let activeVideo = null;

    function activateVideoListener() {
        const videos = document.querySelectorAll('.video-wrapper video');
        if (videos.length === 0) return;

        videos.forEach(video => {
            video.removeEventListener('timeupdate', handleVideoTime);
        });

        activeVideo = videos[currentVideoIndex];
        if (!activeVideo) return;

        activeVideo.addEventListener('timeupdate', handleVideoTime);
    }

    function handleVideoTime() {
        if (this.currentTime >= 60) {
            this.currentTime = 0;
            currentVideoIndex = (currentVideoIndex + 1) % totalVideos;
            updateCarousel();
        }
    }

    function updateCarousel() {
        if (!videoCarousel || totalVideos === 0) return;

        videoCarousel.style.transform = `translateX(-${currentVideoIndex * 100}%)`;

        const videos = document.querySelectorAll('.video-wrapper video');

        videos.forEach((video, index) => {
            video.muted = true;

            const btn = video.closest('.video-wrapper')?.querySelector('.mute-btn');
            if (btn) btn.innerHTML = '<i class="fas fa-volume-mute"></i>';

            if (index === currentVideoIndex) {
                video.play();
            } else {
                video.pause();
                video.currentTime = 0;
            }
        });

        activateVideoListener();
    }

    if (prevBtn && nextBtn && totalVideos > 0) {
        prevBtn.addEventListener('click', function () {
            currentVideoIndex = (currentVideoIndex - 1 + totalVideos) % totalVideos;
            updateCarousel();
        });

        nextBtn.addEventListener('click', function () {
            currentVideoIndex = (currentVideoIndex + 1) % totalVideos;
            updateCarousel();
        });

        updateCarousel();
    }

    // =============================
    // MUTE / UNMUTE
    // =============================
    document.querySelectorAll('.mute-btn').forEach(button => {
        button.addEventListener('click', function () {
            const video = this.closest('.video-wrapper')?.querySelector('video');
            if (!video) return;

            video.muted = !video.muted;

            this.innerHTML = video.muted
                ? '<i class="fas fa-volume-mute"></i>'
                : '<i class="fas fa-volume-up"></i>';
        });
    });

    // =============================
    // LOADER
    // =============================
    if (loader && progress && mainContent) {
        setTimeout(function () {
            let width = 0;
            const interval = setInterval(function () {
                if (width >= 100) {
                    clearInterval(interval);
                    loader.classList.add('hidden');
                    mainContent.style.display = 'block';
                } else {
                    width += 5;
                    progress.style.width = width + '%';
                }
            }, 50);
        }, 950);
    }

    // =============================
    // SIDEBAR — con animación de X
    // =============================
    if (sidebarToggle && sidebar) {

        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
            sidebarToggle.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            if (!sidebar.contains(event.target) &&
                !sidebarToggle.contains(event.target) &&
                sidebar.classList.contains('active')) {

                sidebar.classList.remove('active');
                sidebarToggle.classList.remove('active');
            }
        });
    }

    // =============================
    // LIGHTBOX — galería + testimonios
    // =============================
    if (lightbox) {

        // --- Galería ---
        galleryItems.forEach(function (item) {
            item.addEventListener('click', function () {
                const img = this.querySelector('img');
                const caption = this.querySelector('.gallery-caption');

                if (!img || !caption) return;

                lightboxImage.src = img.src;
                lightboxCaption.innerHTML = caption.innerHTML;
                lightbox.classList.add('active');
            });
        });

        // --- Testimonios ---
        const testimonialImages = document.querySelectorAll('.testimonial-image');

        testimonialImages.forEach(function (item) {
            item.addEventListener('click', function () {
                const img = this.querySelector('img');
                const author = this.closest('.testimonial-card')
                    ?.querySelector('.testimonial-author')
                    ?.textContent || '';

                if (!img) return;

                lightboxImage.src = img.src;
                lightboxCaption.innerHTML = author
                    ? `<strong>${author}</strong>`
                    : '';
                lightbox.classList.add('active');
            });
        });

        // --- Cerrar con botón X ---
        lightboxClose?.addEventListener('click', function () {
            lightbox.classList.remove('active');
        });

        // --- Cerrar al hacer clic fuera de la imagen ---
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
            }
        });

    } // fin if (lightbox)

    // =============================
    // WHATSAPP MODAL
    // =============================
    function openWhatsAppModal(e) {
        if (e) e.preventDefault();
        whatsappModal?.classList.add('active');
    }

    whatsappFloat?.addEventListener('click', openWhatsAppModal);
    amarresWhatsappBtn?.addEventListener('click', openWhatsAppModal);

    whatsappServiceBtns.forEach(btn => {
        btn.addEventListener('click', openWhatsAppModal);
    });

    modalClose?.addEventListener('click', () => whatsappModal?.classList.remove('active'));
    modalCancel?.addEventListener('click', () => whatsappModal?.classList.remove('active'));

    whatsappSend?.addEventListener('click', function (e) {
        e.preventDefault();

        const phoneNumber = "13233205256";

        const message = encodeURIComponent(
            "Hola Maestro, estoy interesado en sus trabajos, me regalas mas información gracias."
        );

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        window.open(whatsappUrl, '_blank');
    });

    // =============================
    // SMOOTH SCROLL
    // =============================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));

            if (!targetElement) return;

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });

            sidebar?.classList.remove('active');
            sidebarToggle?.classList.remove('active');
        });
    });

    // =============================
    // PARALLAX
    // =============================
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.gradient-bg, .constellation, .shape');

        parallaxElements.forEach(function (el, index) {
            const speed = 0.5 * (index + 1) / 10;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // =============================
    // LOADING TEXT
    // =============================
    const loadingText = document.querySelector('.loading-text');

    if (loadingText) {
        const originalText = loadingText.textContent;
        let dots = 0;

        setInterval(function () {
            dots = (dots + 1) % 4;
            loadingText.textContent = originalText + '.'.repeat(dots);
        }, 500);
    }

});