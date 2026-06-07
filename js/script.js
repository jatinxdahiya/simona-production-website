const heroSlides = [
    {
        id: 'JAlSBeFZCtg',
        title: 'Latest Release',
        kicker: 'Music Video'
    },
    {
        id: 'H1WVHpcIKqI',
        title: 'Visual Story',
        kicker: 'Single'
    },
    {
        id: 'LuN0hrZ6ujw',
        title: 'Simona Cut',
        kicker: 'Video'
    }
];

const heroSlider = document.querySelector('[data-hero-slider]');

if (heroSlider) {
    const heroImage = heroSlider.querySelector('[data-hero-image]');
    const heroVideo = heroSlider.querySelector('[data-hero-video]');
    const heroTitle = heroSlider.querySelector('[data-hero-title]');
    const heroKicker = heroSlider.querySelector('[data-hero-kicker]');
    const heroLink = heroSlider.querySelector('[data-hero-link]');
    const prevButton = heroSlider.querySelector('[data-hero-prev]');
    const nextButton = heroSlider.querySelector('[data-hero-next]');
    const dotsContainer = heroSlider.querySelector('[data-hero-dots]');

    let activeSlide = 0;
    let sliderTimer;

    const getThumbnailUrl = (videoId, quality = 'maxresdefault') => (
        `https://img.youtube.com/vi/${videoId}/${quality}.jpg`
    );

    const getEmbedUrl = (videoId) => (
        `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3`
    );

    const getWatchUrl = (videoId) => (
        `https://www.youtube.com/watch?v=${videoId}`
    );

    const setHeroBackground = (videoId) => {
        const maxQualityImage = new Image();

        heroImage.classList.add('is-changing');

        maxQualityImage.onload = () => {
            const quality = maxQualityImage.naturalWidth > 320 ? 'maxresdefault' : 'hqdefault';

            heroImage.style.backgroundImage = `url('${getThumbnailUrl(videoId, quality)}')`;
            heroImage.classList.remove('is-changing');
        };

        maxQualityImage.onerror = () => {
            heroImage.style.backgroundImage = `url('${getThumbnailUrl(videoId, 'hqdefault')}')`;
            heroImage.classList.remove('is-changing');
        };

        maxQualityImage.src = getThumbnailUrl(videoId);
    };

    const updateDots = () => {
        dotsContainer.querySelectorAll('.slider-dot').forEach((dot, index) => {
            dot.classList.toggle('is-active', index === activeSlide);
            dot.setAttribute('aria-pressed', index === activeSlide ? 'true' : 'false');
        });
    };

    const showSlide = (index) => {
        activeSlide = (index + heroSlides.length) % heroSlides.length;

        const slide = heroSlides[activeSlide];

        setHeroBackground(slide.id);

        heroVideo.src = getEmbedUrl(slide.id);
        heroVideo.title = `${slide.title} preview`;
        heroTitle.textContent = slide.title;
        heroKicker.textContent = slide.kicker;
        heroLink.href = getWatchUrl(slide.id);

        updateDots();
    };

    const startSlider = () => {
        window.clearInterval(sliderTimer);
        sliderTimer = window.setInterval(() => {
            showSlide(activeSlide + 1);
        }, 11000);
    };

    heroSlides.forEach((slide, index) => {
        const dot = document.createElement('button');

        dot.type = 'button';
        dot.className = 'slider-dot';
        dot.setAttribute('aria-label', `Show ${slide.title}`);
        dot.setAttribute('aria-pressed', index === activeSlide ? 'true' : 'false');

        dot.addEventListener('click', () => {
            showSlide(index);
            startSlider();
        });

        dotsContainer.appendChild(dot);
    });

    prevButton.addEventListener('click', () => {
        showSlide(activeSlide - 1);
        startSlider();
    });

    nextButton.addEventListener('click', () => {
        showSlide(activeSlide + 1);
        startSlider();
    });

    showSlide(0);
    startSlider();
}
