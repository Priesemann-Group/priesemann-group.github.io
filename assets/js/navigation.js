// Keep the template's responsive overflow menu accessible to keyboard users.
const nav = document.querySelector('#site-nav');
const menuButton = nav.querySelector(':scope > button');
const overflowMenu = nav.querySelector('.hidden-links');
const themeControl = nav.querySelector('#theme-toggle a');

const syncMenuState = () => {
  menuButton.setAttribute('aria-expanded', String(!overflowMenu.classList.contains('hidden')));
};

const syncNavLayout = () => {
  nav.classList.toggle('greedy-nav--distributed', menuButton.classList.contains('hidden'));
};

const closeMenu = () => {
  overflowMenu.classList.add('hidden');
  menuButton.classList.remove('close');
  syncMenuState();
};

new MutationObserver(syncMenuState).observe(overflowMenu, { attributes: true, attributeFilter: ['class'] });
new MutationObserver(syncNavLayout).observe(menuButton, { attributes: true, attributeFilter: ['class'] });
syncMenuState();
syncNavLayout();

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
