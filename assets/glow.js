/* ─── GlowAI shared JS ─── */

/* Custom cursor */
const cursorRounded = document.querySelector(".rounded");

const moveCursor = (e) => {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
  const cursorWidth = cursorRounded.clientWidth; // Get the actual width of the cursor
  const cursorHeight = cursorRounded.clientHeight; // Get the actual height of the cursor

  cursorRounded.style.transform = `translate3d(${mouseX - cursorWidth / 2}px, ${
    mouseY - cursorHeight / 2
  }px, 0)`;
};

window.addEventListener("mousemove", moveCursor);

/* Back button SVG path */
const BACK_CHEVRON_PATH =
  "M6.62132 12C6.62132 11.3375 6.8846 10.7021 7.35277 10.2334V10.2324L13.5432 4.04296C13.9337 3.65255 14.5668 3.65247 14.9573 4.04296C15.3476 4.43345 15.3476 5.06653 14.9573 5.45702L8.76683 11.6475C8.67367 11.7411 8.62132 11.8678 8.62132 12C8.62132 12.1321 8.67367 12.2589 8.76683 12.3525L14.9573 18.543C15.3476 18.9335 15.3476 19.5665 14.9573 19.957C14.5668 20.3475 13.9337 20.3474 13.5432 19.957L7.35277 13.7676V13.7666C6.8846 13.2978 6.62132 12.6625 6.62132 12Z";

/* Inject back chevron into every .back-btn that has no children */
function initBackButtons() {
  document.querySelectorAll(".back-btn").forEach((btn) => {
    if (btn.children.length > 0) return;
    btn.innerHTML = `<svg class="back-chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${BACK_CHEVRON_PATH}" fill="#696361"/>
    </svg>`;
    if (!btn.getAttribute("onclick") && !btn.dataset.href) {
      btn.addEventListener("click", () => history.back());
    }
  });
}

/* Nav items config */
const NAV_ITEMS = [
  { label: "Home", icon: "assets/icons/home.svg", href: "index.html" },
  {
    label: "Projects",
    icon: "assets/icons/projects.svg",
    href: "folders.html",
  },
  { label: "Saves", icon: "assets/icons/bookmark.svg", href: "#" },
  {
    label: "Menu",
    icon: "assets/icons/menu.svg",
    href: "#",
    onclick: "glowOpenMenu()",
  },
];

function initBottomNav() {
  const phone = document.querySelector(".phone");
  if (!phone) return;
  if ("noNav" in phone.dataset) return;
  if (phone.querySelector(".bottom-nav-wrap")) return;

  const activeLabel = phone.dataset.navActive || "";

  const items = NAV_ITEMS.map(({ label, icon, href, onclick }) => {
    const isActive = label === activeLabel;
    const tag = href && href !== "#" ? "a" : "button";
    const hrefAttr = tag === "a" ? `href="${href}"` : "";
    const onclickAttr = onclick ? `onclick="${onclick}"` : "";
    return `<${tag} class="nav-item${isActive ? " active" : ""}" ${hrefAttr} ${onclickAttr}>
      <img src="${icon}" alt="" />
      <span>${label}</span>
    </${tag}>`;
  }).join("\n");

  const wrap = document.createElement("div");
  wrap.className = "bottom-nav-wrap";
  wrap.innerHTML = `<nav class="bottom-nav">${items}</nav>`;
  phone.appendChild(wrap);
}

/* ─── Slide-in overlay menu ─── */
const CHEVRON_R = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#b2a8a3" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const CHEVRON_R_EDIT = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#e16d3e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const PERSON_SVG = `<svg width="26" height="26" viewBox="0 0 26 26" fill="none"><circle cx="13" cy="9" r="5" stroke="#696361" stroke-width="1.8"/><path d="M4 23c0-4.418 4.029-8 9-8s9 3.582 9 8" stroke="#696361" stroke-width="1.8" stroke-linecap="round"/></svg>`;
const CLOSE_SVG = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#696361" stroke-width="1.8" stroke-linecap="round"/></svg>`;

function menuRows(items) {
  return items
    .map(
      ([label, right]) =>
        `<div class="menu-row"><span>${label}</span>${
          right
            ? `<span class="menu-row-right">${right}&nbsp;${CHEVRON_R}</span>`
            : CHEVRON_R
        }</div>`,
    )
    .join("");
}

function buildMenuOverlay() {
  return `<div class="menu-overlay" id="glowMenuOverlay" aria-hidden="true">
    <div class="menu-backdrop" onclick="glowCloseMenu()"></div>
    <div class="menu-panel">
      <div class="menu-close-row">
        <button class="menu-close-btn" onclick="glowCloseMenu()" aria-label="Close menu">${CLOSE_SVG}</button>
      </div>
      <div class="menu-profile-row">
        <div class="menu-avatar">${PERSON_SVG}</div>
        <div class="menu-user">
          <span class="menu-user-name">Lucas Fernandes</span>
          <span class="menu-user-email">lucas@email.com</span>
          <button class="menu-edit-btn">Edit Profile ${CHEVRON_R_EDIT}</button>
        </div>
      </div>
      <div class="menu-stats-row">
        <div class="menu-stat-card"><span class="menu-stat-num">1</span><span class="menu-stat-lbl">Projects</span></div>
        <div class="menu-stat-card"><span class="menu-stat-num">1</span><span class="menu-stat-lbl">Rooms</span></div>
        <div class="menu-stat-card"><span class="menu-stat-num">€21</span><span class="menu-stat-lbl">Saved</span></div>
      </div>
      <div class="menu-sep"></div>
      <p class="menu-section-lbl">My Account</p>
      ${menuRows([["Change Email"], ["Change Password"], ["Notifications"], ["Language", "English"]])}
      <p class="menu-section-lbl">App Preferences</p>
      ${menuRows([
        ["Currency", "EUR"],
        ["Measurement Units", "Metric"],
        ["Default Room Style", "Modern"],
      ])}
      <p class="menu-section-lbl">Support</p>
      ${menuRows([["Help Centre"], ["Send Feedback"], ["Rate the App"]])}
      <p class="menu-section-lbl">Legal</p>
      ${menuRows([["Privacy Policy"], ["Terms of Service"]])}
    </div>
  </div>`;
}

function initMenuOverlay() {
  const phone = document.querySelector(".phone");
  if (!phone || "noNav" in phone.dataset) return;
  const tmp = document.createElement("div");
  tmp.innerHTML = buildMenuOverlay();
  phone.appendChild(tmp.firstElementChild);
}

window.glowOpenMenu = function () {
  const o = document.getElementById("glowMenuOverlay");
  if (o) {
    o.classList.add("open");
    o.setAttribute("aria-hidden", "false");
  }
};
window.glowCloseMenu = function () {
  const o = document.getElementById("glowMenuOverlay");
  if (o) {
    o.classList.remove("open");
    o.setAttribute("aria-hidden", "true");
  }
};

document.addEventListener("DOMContentLoaded", () => {
  initBackButtons();
  initBottomNav();
  initMenuOverlay();
});
