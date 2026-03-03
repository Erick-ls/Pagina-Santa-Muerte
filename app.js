// Esperar a que el DOM esté completamente cargado
    document.addEventListener('DOMContentLoaded', function () {
            // Elementos del DOM
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

    // Variables para el carrusel
    let currentVideoIndex = 0;
    const totalVideos = document.querySelectorAll('.video-item').length;

    // Simular carga de la página
    setTimeout(function () {
        // Incrementar la barra de progreso
        let width = 0;
    const interval = setInterval(function () {
                    if (width >= 100) {
        clearInterval(interval);
    // Ocultar loader y mostrar contenido
    loader.classList.add('hidden');
    mainContent.style.display = 'block';
                    } else {
        width += 5;
    progress.style.width = width + '%';
                    }
                }, 50);
            }, 950);

    // Toggle del menú lateral
    sidebarToggle.addEventListener('click', function () {
        sidebar.classList.toggle('active');
            });

    // Cerrar menú lateral al hacer clic fuera de él
    document.addEventListener('click', function (event) {
                if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
                }
            });

    // Navegación del carrusel de videos
    function updateCarousel() {
        videoCarousel.style.transform = `translateX(-${currentVideoIndex * 100}%)`;
            }

    prevBtn.addEventListener('click', function () {
        currentVideoIndex = (currentVideoIndex - 1 + totalVideos) % totalVideos;
    updateCarousel();
            });

    nextBtn.addEventListener('click', function () {
        currentVideoIndex = (currentVideoIndex + 1) % totalVideos;
    updateCarousel();
            });

    // Auto-play del carrusel
    setInterval(function () {
        currentVideoIndex = (currentVideoIndex + 1) % totalVideos;
    updateCarousel();
            }, 5000);

    // Lightbox para la galería
    galleryItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const imgSrc = this.querySelector('img').src;
            const caption = this.querySelector('.gallery-caption').innerHTML;

            lightboxImage.src = imgSrc;
            lightboxCaption.innerHTML = caption;
            lightbox.classList.add('active');
        });
            });

    // Cerrar lightbox
    lightboxClose.addEventListener('click', function () {
        lightbox.classList.remove('active');
            });

    // Abrir modal de WhatsApp
    function openWhatsAppModal(e) {
                if (e) e.preventDefault();
    whatsappModal.classList.add('active');
            }

    whatsappFloat.addEventListener('click', openWhatsAppModal);

            // Agregar event listeners a los botones de servicio
            whatsappServiceBtns.forEach(btn => {
        btn.addEventListener('click', openWhatsAppModal);
            });

    // Agregar event listener al botón de amarres
    amarresWhatsappBtn.addEventListener('click', openWhatsAppModal);

    // Cerrar modal de WhatsApp
    modalClose.addEventListener('click', function () {
        whatsappModal.classList.remove('active');
            });

    modalCancel.addEventListener('click', function () {
        whatsappModal.classList.remove('active');
            });

    // Enviar mensaje por WhatsApp
    whatsappSend.addEventListener('click', function (e) {
        e.preventDefault();
    const phoneNumber = "3205057647"; // Reemplaza con tu número
    const message = "¡Bendiciones! Me interesa conectar con la energía de la Santísima Muerte. Quisiera más información sobre consagraciones, oraciones personalizadas y protección espiritual. Agradezco su guidance en mi camino devocional.";

        const whatsappUrl = `https://wa.link/buv7ho`;
    window.open(whatsappUrl, '_blank');
            });

            // Smooth scrolling para enlaces de navegación
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Cerrar el menú lateral si está abierto
                if (sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            }
        });
            });

    // Efecto parallax para el fondo
    window.addEventListener('scroll', function () {
                const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-bg, .constellation, .shape');

    parallaxElements.forEach(function (el, index) {
                    const speed = 0.5 * (index + 1) / 10;
    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
            });

    // Efecto de escritura para el texto de carga
    const loadingText = document.querySelector('.loading-text');
    const originalText = loadingText.textContent;
    let dots = 0;

    setInterval(function () {
        dots = (dots + 1) % 4;
    loadingText.textContent = originalText + '.'.repeat(dots);
            }, 500);
        });
