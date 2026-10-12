const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#primary-navigation');

function setMenuOpen(isOpen) {
  if (!menuButton || !navigation) return;
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  navigation.classList.toggle('is-open', isOpen);
}

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  setMenuOpen(!isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenuOpen(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenuOpen(false);
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) setMenuOpen(false);
});

const homeServiceDialog = document.querySelector('#home-service-dialog');
const homeServiceCards = document.querySelectorAll('[data-home-service]');

if (homeServiceDialog && homeServiceCards.length) {
  const serviceDialogImage = homeServiceDialog.querySelector('[data-home-service-dialog-image]');
  const serviceDialogImageNote = homeServiceDialog.querySelector('[data-home-service-dialog-image-note]');
  const serviceDialogEyebrow = homeServiceDialog.querySelector('[data-home-service-dialog-eyebrow]');
  const serviceDialogTitle = homeServiceDialog.querySelector('[data-home-service-dialog-title]');
  const serviceDialogDescription = homeServiceDialog.querySelector('[data-home-service-dialog-description]');
  const serviceDialogList = homeServiceDialog.querySelector('[data-home-service-dialog-list]');
  const serviceDialogServiceLink = homeServiceDialog.querySelector('[data-home-service-dialog-service]');
  const serviceDialogClose = homeServiceDialog.querySelector('[data-home-service-dialog-close]');
  let homeServiceOpener = null;

  const homeServiceDetails = {
    documentary: {
      eyebrow: '01 / Cultural videography',
      title: 'Documentary filmmaking',
      description: 'Films and interviews shaped around lived context, cultural perspective, and careful post-production.',
      details: ['Cultural video storytelling', 'Interviews and documentary footage', 'A considered edit and post-production'],
      serviceHref: '/services/#documentary-filmmaking',
      imageNote: 'Service imagery'
    },
    'brand-content': {
      eyebrow: '02 / Brand strategy',
      title: 'Corporate branded content',
      description: 'Brand strategy and campaign creative that connect a business’s purpose with its people.',
      details: ['Brand strategy', 'Campaign creative', 'Narrative-led branded content'],
      serviceHref: '/services/#corporate-branded-content',
      imageNote: 'Service imagery'
    },
    'live-event': {
      eyebrow: '03 / Campaign production',
      title: 'Livestreaming & event production',
      description: 'Campaigns and events, from creative direction to live capture and launch-ready assets.',
      details: ['Creative direction', 'Live and event production', 'Launch-ready campaign assets'],
      serviceHref: '/services/#livestreaming-event-production',
      imageNote: 'Service imagery'
    },
    photography: {
      eyebrow: '04 / Editorial photography',
      title: 'Photography & digital media',
      description: 'Editorial images attentive to craft, place, people, and the details behind a story.',
      details: ['Editorial photography', 'Attention to craft, place, and people', 'Digital-ready visual assets'],
      serviceHref: '/services/#photography-digital-media',
      imageNote: 'Service imagery'
    },
    workshops: {
      eyebrow: 'Crafted Cinema / Workshops',
      title: 'Crafted Cinema workshops',
      description: 'Skill-building for emerging filmmakers, with the craft of filmmaking at the centre.',
      details: ['For emerging filmmakers', 'Skill-building through film', 'Ask the studio about the programme'],
      imageNote: 'Programme imagery'
    },
    'narrative-nights': {
      eyebrow: 'The Narrative Nights / Screenings',
      title: 'The Narrative Nights',
      description: 'Digital screenings and discussions of powerful stories.',
      details: ['Digital screenings', 'Discussion around powerful stories', 'A shared way to experience film'],
      imageNote: 'Programme imagery'
    }
  };

  function openHomeServiceDialog(card) {
    const details = homeServiceDetails[card.dataset.homeService];
    if (!details) return;

    if (typeof homeServiceDialog.showModal !== 'function') {
      window.location.href = details.serviceHref || '/contact/';
      return;
    }

    const cardImage = card.querySelector('img');
    homeServiceOpener = card;
    serviceDialogEyebrow.textContent = details.eyebrow;
    serviceDialogTitle.textContent = details.title;
    serviceDialogDescription.textContent = details.description;
    serviceDialogImageNote.textContent = details.imageNote;

    if (cardImage) {
      serviceDialogImage.src = cardImage.getAttribute('src');
      serviceDialogImage.alt = cardImage.alt;
    }

    serviceDialogList.replaceChildren(...details.details.map((detail) => {
      const item = document.createElement('li');
      item.textContent = detail;
      return item;
    }));

    serviceDialogServiceLink.hidden = !details.serviceHref;
    if (details.serviceHref) serviceDialogServiceLink.href = details.serviceHref;
    homeServiceDialog.showModal();
  }

  homeServiceCards.forEach((card) => {
    card.addEventListener('click', () => openHomeServiceDialog(card));
  });

  serviceDialogClose?.addEventListener('click', () => homeServiceDialog.close());
  homeServiceDialog.addEventListener('click', (event) => {
    if (event.target === homeServiceDialog) homeServiceDialog.close();
  });
  homeServiceDialog.addEventListener('close', () => {
    if (homeServiceOpener?.isConnected) homeServiceOpener.focus();
    homeServiceOpener = null;
  });
}

const heroSlideshow = document.querySelector('[data-hero-slideshow]');

if (heroSlideshow) {
  const slides = Array.from(heroSlideshow.querySelectorAll('[data-hero-slide]'));
  const previousButton = heroSlideshow.querySelector('[data-hero-previous]');
  const nextButton = heroSlideshow.querySelector('[data-hero-next]');
  const toggleButton = heroSlideshow.querySelector('[data-hero-toggle]');
  const slideCount = heroSlideshow.querySelector('[data-hero-count]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  if (slides.length > 1 && previousButton && nextButton && toggleButton && slideCount) {
    let currentIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
    let userPaused = false;
    let userStarted = false;
    let pointerInside = false;
    let focusInside = false;
    let timerId;

    const wantsAutoplay = () => !userPaused && (!reducedMotion.matches || userStarted);
    const canAutoplay = () => wantsAutoplay() && !pointerInside && !focusInside && !document.hidden;

    function updateToggle() {
      const shouldPlay = wantsAutoplay();
      toggleButton.setAttribute('aria-pressed', String(!shouldPlay));
      toggleButton.setAttribute('aria-label', shouldPlay ? 'Pause hero slideshow' : 'Play hero slideshow');
      const icon = toggleButton.querySelector('span');
      if (icon) icon.textContent = shouldPlay ? 'Ⅱ' : '▶';
    }

    function showSlide(nextIndex) {
      slides[currentIndex].classList.remove('is-active');
      currentIndex = (nextIndex + slides.length) % slides.length;
      slides[currentIndex].classList.add('is-active');
      slideCount.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    }

    function scheduleNextSlide() {
      window.clearTimeout(timerId);
      if (!canAutoplay()) return;
      timerId = window.setTimeout(() => {
        showSlide(currentIndex + 1);
        scheduleNextSlide();
      }, 7000);
    }

    previousButton.addEventListener('click', () => {
      showSlide(currentIndex - 1);
      scheduleNextSlide();
    });

    nextButton.addEventListener('click', () => {
      showSlide(currentIndex + 1);
      scheduleNextSlide();
    });

    toggleButton.addEventListener('click', () => {
      if (wantsAutoplay()) {
        userPaused = true;
        userStarted = false;
      } else {
        userPaused = false;
        userStarted = true;
      }
      updateToggle();
      scheduleNextSlide();
    });

    heroSlideshow.addEventListener('pointerenter', () => {
      pointerInside = true;
      scheduleNextSlide();
    });

    heroSlideshow.addEventListener('pointerleave', () => {
      pointerInside = false;
      scheduleNextSlide();
    });

    heroSlideshow.addEventListener('focusin', () => {
      focusInside = true;
      scheduleNextSlide();
    });

    heroSlideshow.addEventListener('focusout', (event) => {
      if (event.relatedTarget && heroSlideshow.contains(event.relatedTarget)) return;
      window.setTimeout(() => {
        focusInside = heroSlideshow.contains(document.activeElement);
        scheduleNextSlide();
      }, 0);
    });

    document.addEventListener('visibilitychange', scheduleNextSlide);
    reducedMotion.addEventListener?.('change', () => {
      userStarted = false;
      updateToggle();
      scheduleNextSlide();
    });

    updateToggle();
    scheduleNextSlide();
  }
}
