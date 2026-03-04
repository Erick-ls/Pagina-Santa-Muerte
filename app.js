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

    // Activar listener del video actual
    function activateVideoListener() {

        const videos = document.querySelectorAll('.video-wrapper video');
        if (videos.length === 0) return;

        // Remover eventos anteriores
        videos.forEach(video => {
            video.removeEventListener('timeupdate', handleVideoTime);
        });

        activeVideo = videos[currentVideoIndex];
        if (!activeVideo) return;

        activeVideo.addEventListener('timeupdate', handleVideoTime);
    }

    // Cuando el video llegue a 60 segundos
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

            // Reset sonido
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

        // Inicializar primer video
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
    // SIDEBAR
    // =============================
    if (sidebarToggle && sidebar) {

        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('active');
        });

        document.addEventListener('click', function (event) {
            if (!sidebar.contains(event.target) &&
                !sidebarToggle.contains(event.target) &&
                sidebar.classList.contains('active')) {

                sidebar.classList.remove('active');
            }
        });
    }

    // =============================
    // LIGHTBOX
    // =============================
    if (galleryItems.length > 0 && lightbox) {

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

        lightboxClose?.addEventListener('click', function () {
            lightbox.classList.remove('active');
        });
    }

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
        window.open(`https://wa.link/buv7ho`, '_blank');
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