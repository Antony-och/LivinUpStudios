const serviceDetailDialog = document.querySelector('#service-detail-dialog');
const serviceDetailTriggers = document.querySelectorAll('[data-service-dialog-trigger]');

if (serviceDetailDialog && serviceDetailTriggers.length) {
  const serviceDetailArt = serviceDetailDialog.querySelector('[data-service-dialog-art]');
  const serviceDetailEyebrow = serviceDetailDialog.querySelector('[data-service-dialog-eyebrow]');
  const serviceDetailTitle = serviceDetailDialog.querySelector('[data-service-dialog-title]');
  const serviceDetailDescription = serviceDetailDialog.querySelector('[data-service-dialog-description]');
  const serviceDetailList = serviceDetailDialog.querySelector('[data-service-dialog-list]');
  const serviceDetailInquiry = serviceDetailDialog.querySelector('[data-service-dialog-inquiry]');
  const serviceDetailInquiryLabel = serviceDetailDialog.querySelector('[data-service-dialog-inquiry-label]');
  const serviceDetailClose = serviceDetailDialog.querySelector('[data-service-dialog-close]');
  let serviceDetailOpener = null;

  const serviceDetails = {
    'cultural-videography': {
      capability: 'Cultural videography',
      title: 'Documentary filmmaking',
      description: 'Films and interviews developed with cultural context and followed through with thoughtful editing and post-production.',
      deliverables: ['Documentary films', 'Interviews shaped around people and place', 'Editing and post-production']
    },
    'brand-strategy': {
      capability: 'Brand strategy',
      title: 'Corporate branded content',
      description: 'Brand direction and campaign creative that connect a business’s purpose with its people.',
      deliverables: ['Brand strategy and direction', 'Campaign creative', 'Narrative-led branded content']
    },
    'campaign-production': {
      capability: 'Campaign production',
      title: 'Livestreaming & event production',
      description: 'Campaigns and events, from creative direction through live capture to launch-ready assets.',
      deliverables: ['Creative direction', 'Campaign and event production', 'Live capture and launch assets']
    },
    'editorial-photography': {
      capability: 'Editorial photography',
      title: 'Photography & digital media',
      description: 'Editorial images attentive to craft, place, people, and the details behind a story.',
      deliverables: ['Editorial photography', 'Craft- and place-led imagery', 'Digital-ready visual assets']
    },
    'content-ecosystems': {
      capability: 'Content ecosystems',
      title: 'Web development',
      description: 'A connected content rhythm supported by monthly social planning and reusable templates.',
      deliverables: ['Monthly social planning', 'Reusable publishing templates', 'Connected digital content']
    },
    'identity-design': {
      capability: 'Identity design',
      title: 'Print & packaging',
      description: 'Identity systems carried through print and packaging with a consistent visual language.',
      deliverables: ['Identity design', 'Print and packaging', 'Consistent visual applications']
    }
  };

  function openServiceDetails(trigger) {
    const details = serviceDetails[trigger.dataset.serviceDialogTrigger];
    if (!details) return;

    if (typeof serviceDetailDialog.showModal !== 'function') {
      window.location.href = trigger.dataset.inquiryHref || '/contact/';
      return;
    }
    if (serviceDetailDialog.open) return;

    const card = trigger.closest('.production-card');
    const cardArt = card?.querySelector('.production-art');
    const illustration = cardArt?.querySelector('svg')?.cloneNode(true);

    serviceDetailOpener = trigger;
    serviceDetailEyebrow.textContent = details.capability;
    serviceDetailTitle.textContent = details.title;
    serviceDetailDescription.textContent = details.description;
    serviceDetailList.replaceChildren(...details.deliverables.map((deliverable) => {
      const item = document.createElement('li');
      item.textContent = deliverable;
      return item;
    }));
    serviceDetailInquiry.href = trigger.dataset.inquiryHref || 'mailto:hello@livinup.com';
    serviceDetailInquiryLabel.textContent = `Inquire about ${details.capability}`;

    if (illustration) {
      illustration.setAttribute('aria-hidden', 'true');
      serviceDetailArt.replaceChildren(illustration);
    } else {
      serviceDetailArt.replaceChildren();
    }
    if (cardArt) {
      serviceDetailArt.style.setProperty('--service-art-base', window.getComputedStyle(cardArt).backgroundColor);
    }

    serviceDetailDialog.showModal();
  }

  serviceDetailTriggers.forEach((trigger) => {
    trigger.addEventListener('click', () => openServiceDetails(trigger));
  });

  serviceDetailClose?.addEventListener('click', () => serviceDetailDialog.close());
  serviceDetailDialog.addEventListener('click', (event) => {
    if (event.target === serviceDetailDialog) serviceDetailDialog.close();
  });
  serviceDetailDialog.addEventListener('close', () => {
    if (serviceDetailOpener?.isConnected) serviceDetailOpener.focus();
    serviceDetailOpener = null;
  });
}
