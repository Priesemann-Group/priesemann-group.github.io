// Measure the current layout instead of caching widths across breakpoints.
const nav = document.querySelector('#site-nav');
const menuButton = nav.querySelector('.masthead__menu-item--overflow-control button');
const menuButtonItem = menuButton.closest('li');
const overflowMenu = nav.querySelector('.hidden-links');
const visibleLinks = nav.querySelector('.visible-links');
const brand = visibleLinks.querySelector('.masthead__menu-item--lg a');
const themeItem = visibleLinks.querySelector('#theme-toggle');
const themeControl = nav.querySelector('#theme-toggle a');
const masthead = nav.closest('.masthead');
let layoutFrame = 0;

const syncMenuState = () => {
  menuButton.setAttribute('aria-expanded', String(!overflowMenu.classList.contains('hidden')));
};

const setMenuOpen = open => {
  overflowMenu.classList.toggle('hidden', !open);
  menuButton.classList.toggle('close', open);
  syncMenuState();
};

const closeMenu = () => setMenuOpen(false);

const fitsBefore = rightEdge => {
  let previousRight = nav.getBoundingClientRect().left;

  return Array.from(visibleLinks.querySelectorAll(':scope > li > a, :scope > li > button'))
    .filter(control => control.getClientRects().length)
    .every(control => {
      const bounds = control.getBoundingClientRect();
      const fits = bounds.left >= previousRight - 0.5 && bounds.right <= rightEdge + 0.5;
      previousRight = bounds.right;
      return fits;
    });
};

const layoutNavigation = () => {
  layoutFrame = 0;
  const focusedControl = nav.contains(document.activeElement) ? document.activeElement : null;
  const menuWasOpen = !overflowMenu.classList.contains('hidden');

  // Always retry the full menu: link widths can change with font size, loading,
  // selected-page styling, or the distributed desktop layout.
  while (overflowMenu.firstElementChild) {
    visibleLinks.insertBefore(overflowMenu.firstElementChild, themeItem);
  }
  nav.classList.remove('greedy-nav--compact');
  nav.classList.remove('greedy-nav--overflowing');
  nav.style.removeProperty('--nav-brand-max-width');
  menuButtonItem.classList.add('hidden');
  nav.classList.add('greedy-nav--distributed');

  if (!fitsBefore(nav.getBoundingClientRect().right)) {
    nav.classList.remove('greedy-nav--distributed');
    nav.classList.add('greedy-nav--overflowing');
    menuButtonItem.classList.remove('hidden');

    // All visible controls, including the menu button, share one flex row.
    const rightEdge = nav.getBoundingClientRect().right;
    const movableItems = Array.from(visibleLinks.children).filter(item => !item.classList.contains('persist'));

    while (!fitsBefore(rightEdge) && movableItems.length) {
      overflowMenu.prepend(movableItems.pop());
    }

    // At very narrow widths or enlarged text, keep both persistent controls
    // usable by allowing only the brand text to wrap.
    if (!fitsBefore(rightEdge)) {
      const excess = menuButton.getBoundingClientRect().right - rightEdge;
      const brandWidth = Math.max(1, brand.getBoundingClientRect().width - excess);
      nav.style.setProperty('--nav-brand-max-width', `${brandWidth}px`);
      nav.classList.add('greedy-nav--compact');
    }
  }

  const hasOverflow = overflowMenu.children.length > 0;
  menuButton.setAttribute('count', String(overflowMenu.children.length));
  setMenuOpen(hasOverflow && (menuWasOpen || (focusedControl && overflowMenu.contains(focusedControl))));

  // Match the fixed masthead's actual height, including a wrapped brand.
  const mastheadHeight = `${masthead.getBoundingClientRect().height}px`;
  document.body.style.paddingTop = mastheadHeight;
  const profileButton = document.querySelector('.author__urls-wrapper button');
  const mobileProfile = profileButton && profileButton.getBoundingClientRect().width > 0;
  document.querySelectorAll('.sidebar').forEach(sidebar => {
    sidebar.style.paddingTop = mobileProfile ? '' : mastheadHeight;
  });

  if (focusedControl && document.activeElement !== focusedControl) {
    focusedControl.focus({ preventScroll: true });
  }
  if (focusedControl === menuButton && !hasOverflow) {
    brand.focus({ preventScroll: true });
  }
};

const scheduleLayout = () => {
  if (!layoutFrame) layoutFrame = requestAnimationFrame(layoutNavigation);
};

menuButton.addEventListener('click', () => {
  setMenuOpen(overflowMenu.classList.contains('hidden'));
});

window.addEventListener('resize', scheduleLayout);
window.addEventListener('pageshow', scheduleLayout);
if (typeof ResizeObserver !== 'undefined') {
  new ResizeObserver(scheduleLayout).observe(nav);
}
if (document.fonts) {
  document.fonts.ready.then(scheduleLayout);
  document.fonts.addEventListener('loadingdone', scheduleLayout);
}
layoutNavigation();

document.addEventListener('click', event => {
  if (!nav.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !overflowMenu.classList.contains('hidden')) {
    closeMenu();
    menuButton.focus();
  }
});

themeControl.addEventListener('keydown', event => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    themeControl.click();
  }
});
