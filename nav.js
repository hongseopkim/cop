const navigation = document.querySelector('.site-nav');
const trigger = navigation.querySelector('button');
const links = navigation.querySelector('.nav-panel');
let openedByHover = false;

function setMenu(open, byHover = false) {
  trigger.setAttribute('aria-expanded', String(open));
  links.hidden = !open;
  openedByHover = open && byHover;
}

navigation.addEventListener('pointerenter', event => {
  if (event.pointerType === 'mouse' && links.hidden) setMenu(true, true);
});

navigation.addEventListener('pointerleave', event => {
  if (event.pointerType === 'mouse' && !links.contains(document.activeElement)) setMenu(false);
});

trigger.addEventListener('click', () => setMenu(links.hidden || openedByHover));
trigger.addEventListener('keydown', event => {
  if (event.key !== 'ArrowDown') return;
  event.preventDefault();
  setMenu(true);
  links.querySelector('a').focus();
});

navigation.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || links.hidden) return;
  event.preventDefault();
  setMenu(false);
  trigger.focus();
});

navigation.addEventListener('focusout', event => {
  if (!navigation.contains(event.relatedTarget)) setMenu(false);
});

document.addEventListener('pointerdown', event => {
  if (!navigation.contains(event.target)) setMenu(false);
});
