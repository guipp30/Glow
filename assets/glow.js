/* ─── GlowAI shared JS ─── */

/* Back button SVG path */
const BACK_CHEVRON_PATH = 'M6.62132 12C6.62132 11.3375 6.8846 10.7021 7.35277 10.2334V10.2324L13.5432 4.04296C13.9337 3.65255 14.5668 3.65247 14.9573 4.04296C15.3476 4.43345 15.3476 5.06653 14.9573 5.45702L8.76683 11.6475C8.67367 11.7411 8.62132 11.8678 8.62132 12C8.62132 12.1321 8.67367 12.2589 8.76683 12.3525L14.9573 18.543C15.3476 18.9335 15.3476 19.5665 14.9573 19.957C14.5668 20.3475 13.9337 20.3474 13.5432 19.957L7.35277 13.7676V13.7666C6.8846 13.2978 6.62132 12.6625 6.62132 12Z';

/* Inject back chevron into every .back-btn that has no children */
function initBackButtons() {
  document.querySelectorAll('.back-btn').forEach(btn => {
    if (btn.children.length > 0) return;
    btn.innerHTML = `<svg class="back-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${BACK_CHEVRON_PATH}" fill="#696361"/>
    </svg>`;
    if (!btn.getAttribute('onclick') && !btn.dataset.href) {
      btn.addEventListener('click', () => history.back());
    }
  });
}

/* Nav items config — order matches HTML */
const NAV_ITEMS = [
  { label: 'Home',     icon: 'assets/icons/home.svg',     href: 'home-welcome.html' },
  { label: 'Projects', icon: 'assets/icons/projects.svg', href: '#' },
  { label: 'Saves',    icon: 'assets/icons/bookmark.svg', href: '#' },
  { label: 'Menu',     icon: 'assets/icons/menu.svg',     href: '#' },
];

/*
 * Inject bottom nav into .phone.
 * Mark the active item via data-nav-active="Home" (or "Projects" etc.) on .phone.
 * If the attribute is absent, no item is active.
 */
function initBottomNav() {
  const phone = document.querySelector('.phone');
  if (!phone) return;

  /* Opt-out: add data-no-nav on .phone to suppress injection */
  if ('noNav' in phone.dataset) return;

  /* Skip if a .bottom-nav-wrap already exists (hand-coded in HTML) */
  if (phone.querySelector('.bottom-nav-wrap')) return;

  const activeLabel = phone.dataset.navActive || '';

  const items = NAV_ITEMS.map(({ label, icon, href }) => {
    const isActive = label === activeLabel;
    const tag = href && href !== '#' ? 'a' : 'button';
    const hrefAttr = tag === 'a' ? `href="${href}"` : '';
    return `<${tag} class="nav-item${isActive ? ' active' : ''}" ${hrefAttr}>
      <img src="${icon}" alt="" />
      <span>${label}</span>
    </${tag}>`;
  }).join('\n');

  const wrap = document.createElement('div');
  wrap.className = 'bottom-nav-wrap';
  wrap.innerHTML = `<nav class="bottom-nav">${items}</nav>`;
  phone.appendChild(wrap);
}

document.addEventListener('DOMContentLoaded', () => {
  initBackButtons();
  initBottomNav();
});
