// ==UserScript==
// @name         IMDb - Custom Enhancements
// @namespace    Violentmonkey Scripts
// @match        https://www.imdb.com/*
// @version      0.2.2
// @author       ushruff
// @description  Setup custom keyboard shortcuts for IMDb
// @homepageURL  https://github.com/ush-ruff/IMDb-Custom-Enhancements/
// @downloadURL  https://github.com/ush-ruff/IMDb-Custom-Enhancements/raw/main/script.user.js
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

const KEYS = {
  "F": {
    action: () => focusSelectElement(`#suggestion-search`),
    label: "Search",
  },
  "Esc": {
    action: () => clickElement(`.ipc-page-content-container[role="presentation"] a[href$="?ref_=mv_close"]`),
    label: "Close gallery/popups",
  },
  "A": {
    action: () => clickElement(`[data-testid="hero-rating-bar__user-rating"] > .ipc-btn`),
    label: "Rate a title",
  },
  "S": {
    action: () => clickElement(`.ipc-promptable-base__panel [data-testid="rate-button"]`),
    label: "Rate a title in popup cards",
  },
  "Shift + ?": {
    action: () => showShortcuts(),
    label: "Show shortcut help",
  },
}

const MODAL_ID = "shortcut-modal"


// -------------------------------------------
// Event Listeners
// -------------------------------------------
window.addEventListener("load", () => {
  addStyle()
  setupShortcutInfo()
})

document.addEventListener("keyup", pressKey)


// -------------------------------------------
// Main Functions
// -------------------------------------------
function pressKey(e) {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return

  const keyName = normalizeKey(e)
  if (KEYS[keyName]) {
    e.preventDefault()
    KEYS[keyName].action()
  }
}

function setupShortcutInfo() {
  insertModalHTML()

  const shortcutModal = document.querySelector(`#${MODAL_ID}`)
  const closeBtn = shortcutModal.querySelector(`.${MODAL_ID}-close`)
  closeBtn.addEventListener("click", () => {shortcutModal.close()})

  window.addEventListener("click", (event) => {
    if (event.target === shortcutModal) shortcutModal.close()
  })
}


// -------------------------------------------
// Helper Functions
// -------------------------------------------
function normalizeKey(e) {
  const parts = []
  if (e.ctrlKey) parts.push("Ctrl")
  if (e.shiftKey) parts.push("Shift")
  if (e.altKey) parts.push("Alt")

  // Convert key into friendly text
  let keyText = e.key.toUpperCase()
  if (keyText === " ") keyText = "Space"
  if (keyText.length > 1 && !/F\d+/.test(keyText)) {
    // Special named keys (ArrowUp, Escape, etc.)
    keyText = keyText[0].toUpperCase() + keyText.slice(1)
  }

  parts.push(keyText)
  return parts.join(" + ")
}

function focusSelectElement(element) {
  const el = document.querySelector(element)

  if (el !== null) {
    el.focus()
    el.select()
  }
}

function clickElement(element) {
  const el = document.querySelector(element)

  if (el !== null) el.click()
}

function showShortcuts() {
  const shortcutModal = document.querySelector(`#${MODAL_ID}`)
  shortcutModal.showModal()
}

function insertModalHTML() {
  if (document.getElementById(MODAL_ID)) return

  const modal = document.createElement("dialog")
  modal.id = MODAL_ID

  const modalInner = `
    <div class="${MODAL_ID}-header">
      <h2 class="${MODAL_ID}-title">Shortcut Keys</h2>
      <span class="${MODAL_ID}-close">&times;</span>
    </div>
  `
  modal.innerHTML = modalInner

  const keyList = document.createElement("ul")

  Object.entries(KEYS).forEach(([key, {label}]) => {
    const listItem = document.createElement("li")

    const shortcutInfo = document.createElement("span")
    shortcutInfo.textContent = label
    listItem.appendChild(shortcutInfo)

    const shortcutKey = document.createElement("code")
    shortcutKey.classList.add("shortcut-key")
    shortcutKey.textContent = key
    listItem.appendChild(shortcutKey)

    keyList.appendChild(listItem)
  })

  modal.appendChild(keyList)
  document.body.appendChild(modal)
}

function addStyle() {
  const styleSheet = document.createElement("style")

  styleSheet.textContent = `
    /* Modal Styles */
    #${MODAL_ID} {
      min-width: 700px;
      padding: 1rem;
      background: #1f1f1f;
      border: unset;
      border-radius: 0.5rem;
      color: #b9b9b9;
      box-shadow: 0 0 10px 2px rgb(0 0 0 / 0.5);
      outline: none;
    }

    #${MODAL_ID}::backdrop {
      background: rgb(0 0 0 / 0.75);
    }

    .${MODAL_ID}-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-inline: 1rem;
      border-bottom: 1px solid #333;
    }

    #${MODAL_ID} .${MODAL_ID}-title {
      font-size: 1.4rem;
      font-weight: 600;
      padding-block: 0.8rem;
      border: unset;
      color: #ccc;
    }

    .${MODAL_ID}-close {
      font-size: 2rem;
      background: none;
      border: none;
      color: inherit;
      cursor: pointer;
    }

    .${MODAL_ID}-close:is(:hover, :focus) {
      border: none;
      color: #f2f2f2;
    }

    #${MODAL_ID} ul {
      margin: 0.75rem 1.2rem 0;
      padding: 0;
    }

    #${MODAL_ID} li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8rem;
      padding-block: 0.75rem;
      color: #b9b9b9;
    }

    #${MODAL_ID} li:not(:last-child) {
      border-bottom: 1px solid #333;
    }

    .shortcut-key {
      min-width: 120px;
      text-align: center;
      line-height: 2;
      background: #282828;
      border-radius: 0.2rem;
      color: #ccc;
    }
  `
  document.head.append(styleSheet)
}

