function scrollToExperiencia() {
                document.getElementById('experiencia').scrollIntoView({ behavior: 'smooth' });
            }
            function scrollToLogros() {
                document.getElementById('logros-header').scrollIntoView({ behavior: 'smooth' });
            }
            function scrollToProyectos() {
                document.getElementById('proyectos-header').scrollIntoView({ behavior: 'smooth' });
            }
            function sendEmail() {
                window.location.href = "mailto:juanruaxo@gmail.com";
            }
            function createDataPoints() {
                const container = document.getElementById('dataPointsContainer');
                const pointCount = 500; // Total number of points
                const densityAreas = [
                    { x: 0.2, y: 0.3, density: 3 },   // High density area
                    { x: 0.7, y: 0.6, density: 0.5 }, // Low density area
                    { x: 0.4, y: 0.8, density: 2 },   // Medium density area
                    { x: 0.9, y: 0.2, density: 1 }    // Sparse area
                ];

                for (let i = 0; i < pointCount; i++) {
                    const point = document.createElement('div');
                    point.classList.add('data-point');

                    // Choose a density area
                    const area = densityAreas[Math.floor(Math.random() * densityAreas.length)];

                    // Calculate position with area-based density
                    const x = (area.x + (Math.random() - 0.5) * area.density) * container.offsetWidth;
                    const y = (area.y + (Math.random() - 0.5) * area.density) * container.offsetHeight;

                    point.style.left = `${x}px`;
                    point.style.top = `${y}px`;

                    // Optional: Randomize point size slightly
                    const size = 2 + Math.random();
                    point.style.width = `${size}px`;
                    point.style.height = `${size}px`;

                    // Add subtle animation delay and variation
                    point.style.animationDelay = `${Math.random() * 3}s`;
                    point.style.animation = `dataPointMovement ${3 + Math.random()}s ease-in-out infinite alternate`;

                    container.appendChild(point);
                }
            }

            // Create points on load and resize
            createDataPoints();
            window.addEventListener('resize', () => {
                const container = document.getElementById('dataPointsContainer');
                container.innerHTML = ''; // Clear existing points
                createDataPoints(); // Recreate points
            });

            // Slider functionality
            const sliders = {};

            function initSlider(sliderId, dotsId) {
                const slider = document.getElementById(sliderId);
                const slides = slider.querySelectorAll('.slider-slide');
                const dotsContainer = document.getElementById(dotsId);

                sliders[sliderId] = {
                    currentIndex: 0,
                    totalSlides: slides.length
                };

                // Create dots
                for (let i = 0; i < slides.length; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('slider-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.onclick = () => goToSlide(sliderId, i);
                    dotsContainer.appendChild(dot);
                }
            }

            function moveSlide(sliderId, direction) {
                const sliderData = sliders[sliderId];
                sliderData.currentIndex += direction;

                if (sliderData.currentIndex < 0) {
                    sliderData.currentIndex = sliderData.totalSlides - 1;
                } else if (sliderData.currentIndex >= sliderData.totalSlides) {
                    sliderData.currentIndex = 0;
                }

                updateSlider(sliderId);
            }

            function goToSlide(sliderId, index) {
                sliders[sliderId].currentIndex = index;
                updateSlider(sliderId);
            }

            function updateSlider(sliderId) {
                const slider = document.getElementById(sliderId);
                const sliderData = sliders[sliderId];
                const offset = -sliderData.currentIndex * 100;
                slider.style.transform = `translateX(${offset}%)`;

                // Update dots
                const dotsContainer = document.getElementById(sliderId + 'Dots');
                const dots = dotsContainer.querySelectorAll('.slider-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === sliderData.currentIndex);
                });
            }

            // Initialize sliders on page load
            window.addEventListener('load', () => {
                initSlider('incidentsSlider', 'incidentsSliderDots');
                initSlider('seguimientoSlider', 'seguimientoSliderDots');
                initModalSlider();
            });

            // Modal functionality
            let modalCurrentIndex = 0;
            let modalTotalSlides = 6;

            function initModalSlider() {
                const dotsContainer = document.getElementById('modalSliderDots');

                // Create dots for modal
                for (let i = 0; i < modalTotalSlides; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('modal-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.onclick = () => goToModalSlide(i);
                    dotsContainer.appendChild(dot);
                }
            }

            function openModal(sliderId = 'incidentsSlider') {
                const modal = document.getElementById('imageModal');
                modal.classList.add('active');

                // Sync with current slider position
                if (sliders[sliderId]) {
                    modalCurrentIndex = sliders[sliderId].currentIndex;
                    modalTotalSlides = sliders[sliderId].totalSlides;

                    // Update modal images based on slider
                    const modalSlider = document.getElementById('modalSlider');
                    const images = {
                        'incidentsSlider': [
                            'images/incidents_mockups/1_login.png',
                            'images/incidents_mockups/2_home.png',
                            'images/incidents_mockups/3_add_report.png',
                            'images/incidents_mockups/4_home_reports.png',
                            'images/incidents_mockups/5_my_reports.png',
                            'images/incidents_mockups/6_profile.png'
                        ],
                        'seguimientoSlider': [
                            'images/seguimiento_de_proyectos_muck_ups/1_landing_page.png',
                            'images/seguimiento_de_proyectos_muck_ups/2_public_repository.png',
                            'images/seguimiento_de_proyectos_muck_ups/3_login.png',
                            'images/seguimiento_de_proyectos_muck_ups/4_group_activities.png',
                            'images/seguimiento_de_proyectos_muck_ups/4_professor_side_start.png',
                            'images/seguimiento_de_proyectos_muck_ups/5_document_revision.png'
                        ]
                    };

                    // Update modal slider images
                    const modalSlides = modalSlider.querySelectorAll('.modal-slider-slide');
                    const sliderImages = images[sliderId] || images['incidentsSlider'];
                    modalSlides.forEach((slide, index) => {
                        const img = slide.querySelector('img');
                        if (img && sliderImages[index]) {
                            img.src = sliderImages[index];
                        }
                    });

                    // Recreate dots for current slider
                    const dotsContainer = document.getElementById('modalSliderDots');
                    dotsContainer.innerHTML = ''; // Clear existing dots

                    for (let i = 0; i < modalTotalSlides; i++) {
                        const dot = document.createElement('div');
                        dot.classList.add('modal-dot');
                        if (i === modalCurrentIndex) dot.classList.add('active');
                        dot.onclick = () => goToModalSlide(i);
                        dotsContainer.appendChild(dot);
                    }

                    updateModalSlider();
                }

                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            }

            function closeModal() {
                const modal = document.getElementById('imageModal');
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }

            function moveModalSlide(direction) {
                modalCurrentIndex += direction;

                if (modalCurrentIndex < 0) {
                    modalCurrentIndex = modalTotalSlides - 1;
                } else if (modalCurrentIndex >= modalTotalSlides) {
                    modalCurrentIndex = 0;
                }

                updateModalSlider();
            }

            function goToModalSlide(index) {
                modalCurrentIndex = index;
                updateModalSlider();
            }

            function updateModalSlider() {
                const modalSlider = document.getElementById('modalSlider');
                const offset = -modalCurrentIndex * 100;
                modalSlider.style.transform = `translateX(${offset}%)`;

                // Update dots
                const dots = document.querySelectorAll('.modal-dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === modalCurrentIndex);
                });
            }

            // Close modal when clicking outside the image
            document.getElementById('imageModal').addEventListener('click', function (e) {
                if (e.target === this) {
                    closeModal();
                }
            });

            // Close modal with ESC key
            document.addEventListener('keydown', function (e) {
                if (e.key === 'Escape') {
                    closeModal();
                }
            });