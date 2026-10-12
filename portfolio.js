const portfolioFilters = [...document.querySelectorAll('[data-filter]')];
const portfolioCards = [...document.querySelectorAll('.portfolio-card')];
const portfolioStatus = document.querySelector('.portfolio-status');

function showPortfolioCategory(category) {
  let visibleCount = 0;

  portfolioCards.forEach((card) => {
    const isVisible = category === 'all' || card.dataset.category === category;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  portfolioFilters.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === category));
  });

  if (portfolioStatus) {
    const noun = visibleCount === 1 ? 'story' : 'stories';
    portfolioStatus.textContent = category === 'all'
      ? `Showing all ${visibleCount} stories.`
      : `Showing ${visibleCount} ${noun}.`;
  }
}

portfolioFilters.forEach((button) => {
  button.addEventListener('click', () => showPortfolioCategory(button.dataset.filter));
});

const projectDetails = {
  'first-cup': {
    title: 'First Cup Coffee & Tea',
    category: 'Hospitality',
    year: '2025',
    image: '/manus-storage/first-cup-coffee_820f47be.jpg',
    imageAlt: 'Coffee being poured into a First Cup Coffee & Tea mug, with roasted beans in the frame.',
    lede: 'First Cup needed a brand identity that reflected its commitment to quality and community.',
    description: 'Livin Up created a visual system balancing warmth, authenticity, and modernity. The case notes describe a location-led look for web, social, and print, supported by photography and film that highlight the brand story and local roots.',
    deliverables: ['Brand identity and visual system', 'Location-led photography and film', 'Print, web, and social assets']
  },
  njiru: {
    title: 'N’jiru BTS Shoot',
    category: 'Culture',
    year: '2024',
    image: '/manus-storage/njiru-bts_e148e59f.jpg',
    imageAlt: 'Two frames from the N’jiru shoot: a performer among tropical plants, photographed in color and black-and-white.',
    lede: 'A behind-the-scenes story shaped around the mood, movement, and intent of the N’jiru shoot.',
    description: 'The studio documented the production process and place, building an intimate, editorial set of stills intended to feel real and campaign-ready.',
    deliverables: ['Behind-the-scenes stills', 'Production mood and process captures', 'Campaign-ready imagery']
  },
  'cafe-content': {
    title: 'Café Content Package',
    category: 'Retail',
    year: '2023',
    image: '/manus-storage/cafe-content_77a06531.jpg',
    imageAlt: 'Latte art in a First Cup Coffee & Tea cup, photographed with coffee beans.',
    lede: 'For a neighbourhood café, Livin Up built a repeatable content system with product, crew, and interior imagery.',
    description: 'The case notes describe a warm, tactile publishing rhythm designed to keep the café’s brand fresh without feeling staged, while staying recognisably local.',
    deliverables: ['Product, crew, and interior imagery', 'Social content calendar', 'Interior refresh and staff portraits']
  },
  'community-merch': {
    title: 'Community Merch Drop',
    category: 'Experiences',
    year: '2023',
    image: '/manus-storage/community-merch_5866b489.jpg',
    imageAlt: 'Promotional artwork for First Cup Coffee & Tea and Livin Up, with production cameras framing both brand marks.',
    lede: 'Livin Up designed and photographed a small merch range with local makers.',
    description: 'The identity was made to carry the story into tote bags, tees, and print promos, supported by product photography, packaging direction, and launch assets.',
    deliverables: ['Merch identity and product photography', 'Packaging direction', 'Retail-ready launch assets']
  }
};

const projectDialog = document.getElementById('project-dialog');
const projectDialogImage = document.getElementById('project-dialog-image');
const projectDialogMeta = document.getElementById('project-dialog-meta');
const projectDialogTitle = document.getElementById('project-dialog-title');
const projectDialogLede = document.getElementById('project-dialog-lede');
const projectDialogDescription = document.getElementById('project-dialog-description');
const projectDialogList = document.getElementById('project-dialog-list');
const projectDialogClose = document.querySelector('#project-dialog .project-dialog-close');
let projectDialogOpener = null;

function openProjectDialog(projectId, trigger) {
  const project = projectDetails[projectId];
  if (!project || !projectDialog || !projectDialogImage || !projectDialogTitle || !projectDialogList) return;

  projectDialogOpener = trigger;
  projectDialogImage.src = project.image;
  projectDialogImage.alt = project.imageAlt;
  projectDialogMeta.textContent = `${project.category} / ${project.year}`;
  projectDialogTitle.textContent = project.title;
  projectDialogLede.textContent = project.lede;
  projectDialogDescription.textContent = project.description;
  projectDialogList.replaceChildren(...project.deliverables.map((deliverable) => {
    const item = document.createElement('li');
    item.textContent = deliverable;
    return item;
  }));
  projectDialog.showModal();
}

document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => openProjectDialog(button.dataset.project, button));
});

projectDialogClose?.addEventListener('click', () => projectDialog?.close());
projectDialog?.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});
projectDialog?.addEventListener('close', () => {
  const opener = projectDialogOpener;
  projectDialogOpener = null;
  if (opener?.isConnected) opener.focus({ preventScroll: true });
});

const howWeWorkDetails = {
  documentary: {
    meta: '01 / Cultural videography',
    title: 'Documentary filmmaking',
    lede: 'Human stories. Told with care.',
    description: 'Short films, interviews, and branded documentaries shaped around lived context and cultural perspective. Scope can include interview capture, reels or hero films, and careful post-production.',
    deliverables: ['Reels and hero films', 'Interview capture', 'Post-production'],
    ctaHref: '/services/#documentary-filmmaking',
    ctaLabel: 'Explore cultural videography',
    slides: [
      {
        type: 'image',
        src: '/manus-storage/async-images/TtWytIc8tD77g7c5OhCnvJ/image-2.webp',
        alt: 'Illustrative image of filmmakers concentrating on a cinema camera on set.',
        caption: 'Illustrative visual · documentary production'
      },
      {
        type: 'image',
        src: '/manus-storage/njiru-bts_e148e59f.jpg',
        alt: 'Two frames from the N’jiru shoot, with a performer among tropical plants in color and black-and-white.',
        caption: 'Official project photograph · N’jiru BTS Shoot'
      }
    ]
  },
  branded: {
    meta: '02 / Brand strategy',
    title: 'Corporate branded content',
    lede: 'A brand with something to say.',
    description: 'Connect a brand’s purpose with the people it hopes to reach through strategy, campaign creative, photography, and moving-image stories.',
    deliverables: ['Brand strategy and creative direction', 'Campaign-ready content', 'Brand photography and moving-image stories'],
    ctaHref: '/services/#corporate-branded-content',
    ctaLabel: 'Explore brand strategy',
    slides: [
      {
        type: 'image',
        src: '/manus-storage/async-images/TtWytIc8tD77g7c5OhCnvJ/image-3.webp',
        alt: 'Illustrative image of a small production team filming an interview in a contemporary studio.',
        caption: 'Illustrative visual · branded storytelling'
      },
      {
        type: 'image',
        src: '/manus-storage/first-cup-coffee_820f47be.jpg',
        alt: 'Coffee being poured into a First Cup Coffee & Tea mug, with roasted beans in the frame.',
        caption: 'Official project photograph · First Cup Coffee & Tea'
      },
      {
        type: 'image',
        src: '/manus-storage/community-merch_5866b489.jpg',
        alt: 'Official promotional artwork for First Cup Coffee & Tea and Livin Up, with production cameras framing both brand marks.',
        caption: 'Official campaign artwork · Community Merch Drop'
      }
    ]
  },
  live: {
    meta: '03 / Campaign production',
    title: 'Livestreaming & event production',
    lede: 'In the moment. Together.',
    description: 'From concept through rollout, shape multi-channel campaigns and event moments to feel coherent, memorable, and community-minded.',
    deliverables: ['Creative direction', 'Production planning', 'Live capture and launch assets'],
    ctaHref: '/services/#livestreaming-event-production',
    ctaLabel: 'Explore campaign production',
    slides: [
      {
        type: 'image',
        src: '/manus-storage/async-images/TtWytIc8tD77g7c5OhCnvJ/image-4.webp',
        alt: 'Illustrative image of a camera operator preparing equipment at a live event.',
        caption: 'Illustrative visual · event production'
      },
      {
        type: 'image',
        src: '/manus-storage/njiru-bts_e148e59f.jpg',
        alt: 'Two frames from the N’jiru shoot, with a performer among tropical plants in color and black-and-white.',
        caption: 'Official campaign-process photograph · N’jiru BTS Shoot'
      },
      {
        type: 'image',
        src: '/manus-storage/community-merch_5866b489.jpg',
        alt: 'Official promotional artwork for First Cup Coffee & Tea and Livin Up, with production cameras framing both brand marks.',
        caption: 'Official rollout artwork · Community Merch Drop'
      }
    ]
  },
  photography: {
    meta: '04 / Editorial photography',
    title: 'Photography & digital media',
    lede: 'Culture, captured with care.',
    description: 'Editorial portraits, product stories, and location imagery that feel natural, attentive, and true to place.',
    deliverables: ['Portrait direction', 'Commercial shoots', 'Campaign lifestyle imagery'],
    ctaHref: '/services/#photography-digital-media',
    ctaLabel: 'Explore editorial photography',
    slides: [
      {
        type: 'image',
        src: '/manus-storage/async-images/TtWytIc8tD77g7c5OhCnvJ/image-5.webp',
        alt: 'Illustrative image of an artisan’s hands at work on a cultural craft.',
        caption: 'Illustrative visual · editorial detail'
      },
      {
        type: 'image',
        src: '/manus-storage/cafe-content_77a06531.jpg',
        alt: 'Latte art in a First Cup Coffee & Tea cup, photographed with coffee beans.',
        caption: 'Official project photograph · Café Content Package'
      },
      {
        type: 'image',
        src: '/manus-storage/njiru-bts_e148e59f.jpg',
        alt: 'Two frames from the N’jiru shoot, with a performer among tropical plants in color and black-and-white.',
        caption: 'Official editorial stills · N’jiru BTS Shoot'
      }
    ]
  },
  workshops: {
    meta: '05 / Crafted Cinema workshops',
    title: 'The next frame starts here.',
    lede: 'Hands-on learning for emerging filmmakers.',
    description: 'Crafted Cinema workshops give emerging filmmakers room to practice, grow, and learn through direct camera experience.',
    deliverables: ['Hands-on learning', 'Camera practice', 'Room to practice and grow'],
    ctaHref: 'mailto:hello@livinup.com?subject=Crafted%20Cinema%20workshops',
    ctaLabel: 'Ask about a workshop',
    slides: [
      {
        type: 'image',
        src: '/manus-storage/async-images/27bP7mgCkW8g7Rq98YcxFM/image-1.webp',
        alt: 'Illustrative image of emerging filmmakers learning to use a professional camera.',
        caption: 'Illustrative workshop visual · camera practice'
      },
      {
        type: 'image',
        src: '/manus-storage/async-images/TtWytIc8tD77g7c5OhCnvJ/image-2.webp',
        alt: 'Illustrative image of filmmakers concentrating on a cinema camera on set.',
        caption: 'Illustrative visual · learning through production craft'
      }
    ]
  },
  'narrative-nights': {
    meta: '06 / The Narrative Nights',
    title: 'A story is only the beginning.',
    lede: 'Shared screenings and conversations that keep powerful stories in motion.',
    description: 'The Narrative Nights create a shared space to watch films, gather around stories, and continue the conversation after the screening.',
    deliverables: ['Shared screenings', 'Conversation around stories', 'Community gatherings'],
    ctaHref: 'mailto:hello@livinup.com?subject=The%20Narrative%20Nights',
    ctaLabel: 'Ask about a screening',
    slides: [
      {
        type: 'image',
        src: '/manus-storage/async-images/27bP7mgCkW8g7Rq98YcxFM/image-2.webp',
        alt: 'Illustrative image of a neighborhood gathering for a shared film screening.',
        caption: 'Illustrative visual · community screening'
      },
      {
        type: 'image',
        src: '/manus-storage/async-images/TtWytIc8tD77g7c5OhCnvJ/image-4.webp',
        alt: 'Illustrative image of a camera operator preparing equipment at a live event.',
        caption: 'Illustrative visual · gathering and event production'
      }
    ]
  }
};

const howWorkDialog = document.getElementById('how-work-dialog');
const howWorkImage = document.getElementById('how-work-dialog-image');
const howWorkVideo = document.getElementById('how-work-dialog-video');
const howWorkMeta = document.getElementById('how-work-dialog-meta');
const howWorkTitle = document.getElementById('how-work-dialog-title');
const howWorkLede = document.getElementById('how-work-dialog-lede');
const howWorkDescription = document.getElementById('how-work-dialog-description');
const howWorkList = document.getElementById('how-work-dialog-list');
const howWorkCaption = document.getElementById('how-work-dialog-caption');
const howWorkCount = document.getElementById('how-work-slide-count');
const howWorkCta = document.getElementById('how-work-dialog-cta');
const howWorkCtaLabel = document.getElementById('how-work-dialog-cta-label');
const howWorkClose = document.getElementById('how-work-dialog-close');
const howWorkPrevious = document.getElementById('how-work-prev');
const howWorkNext = document.getElementById('how-work-next');
let howWorkDialogOpener = null;
let activeHowWork = null;
let activeHowWorkSlide = 0;

function renderHowWorkSlide() {
  if (!activeHowWork || !howWorkImage || !howWorkVideo || !howWorkCaption || !howWorkCount) return;

  const slide = activeHowWork.slides[activeHowWorkSlide];
  const slideNumber = activeHowWorkSlide + 1;
  howWorkCount.textContent = `Slide ${slideNumber} of ${activeHowWork.slides.length}`;
  howWorkCaption.textContent = slide.caption;

  if (slide.type === 'video') {
    howWorkImage.hidden = true;
    howWorkVideo.hidden = false;
    howWorkVideo.pause();
    howWorkVideo.removeAttribute('src');
    if (slide.poster) howWorkVideo.poster = slide.poster;
    else howWorkVideo.removeAttribute('poster');
    howWorkVideo.src = slide.src;
    howWorkVideo.setAttribute('aria-label', slide.alt || 'Project video');
    howWorkVideo.load();
    return;
  }

  howWorkVideo.pause();
  howWorkVideo.removeAttribute('src');
  howWorkVideo.removeAttribute('poster');
  howWorkVideo.load();
  howWorkVideo.hidden = true;
  howWorkImage.hidden = false;
  howWorkImage.src = slide.src;
  howWorkImage.alt = slide.alt;
}

function changeHowWorkSlide(direction) {
  if (!activeHowWork) return;
  const total = activeHowWork.slides.length;
  activeHowWorkSlide = (activeHowWorkSlide + direction + total) % total;
  renderHowWorkSlide();
}

function openHowWorkDialog(workId, trigger) {
  const work = howWeWorkDetails[workId];
  if (!work || !howWorkDialog || !howWorkTitle || !howWorkList) return;

  howWorkDialogOpener = trigger;
  activeHowWork = work;
  activeHowWorkSlide = 0;
  howWorkMeta.textContent = work.meta;
  howWorkTitle.textContent = work.title;
  howWorkLede.textContent = work.lede;
  howWorkDescription.textContent = work.description;
  howWorkList.replaceChildren(...work.deliverables.map((deliverable) => {
    const item = document.createElement('li');
    item.textContent = deliverable;
    return item;
  }));
  howWorkCta.href = work.ctaHref;
  howWorkCtaLabel.textContent = work.ctaLabel;
  renderHowWorkSlide();
  howWorkDialog.showModal();
}

document.querySelectorAll('[data-how-work]').forEach((button) => {
  button.addEventListener('click', () => openHowWorkDialog(button.dataset.howWork, button));
});

howWorkPrevious?.addEventListener('click', () => changeHowWorkSlide(-1));
howWorkNext?.addEventListener('click', () => changeHowWorkSlide(1));
howWorkClose?.addEventListener('click', () => howWorkDialog?.close());
howWorkDialog?.addEventListener('click', (event) => {
  if (event.target === howWorkDialog) howWorkDialog.close();
});
howWorkDialog?.addEventListener('keydown', (event) => {
  if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    changeHowWorkSlide(-1);
  } else if (event.key === 'ArrowRight') {
    event.preventDefault();
    changeHowWorkSlide(1);
  }
});
howWorkDialog?.addEventListener('close', () => {
  howWorkVideo?.pause();
  if (howWorkVideo) {
    howWorkVideo.removeAttribute('src');
    howWorkVideo.removeAttribute('poster');
    howWorkVideo.load();
    howWorkVideo.hidden = true;
  }
  const opener = howWorkDialogOpener;
  howWorkDialogOpener = null;
  activeHowWork = null;
  if (opener?.isConnected) opener.focus({ preventScroll: true });
});
