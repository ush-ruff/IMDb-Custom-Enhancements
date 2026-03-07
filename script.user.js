// ==UserScript==
// @name         IMDb - Custom Enhancements
// @namespace    Violentmonkey Scripts
// @match        https://www.imdb.com/*
// @version      1.0.0
// @author       ushruff
// @description  Setup custom keyboard shortcuts for IMDb
// @homepageURL  https://github.com/ush-ruff/IMDb-Custom-Enhancements/
// @downloadURL  https://github.com/ush-ruff/IMDb-Custom-Enhancements/raw/main/script.user.js
// @grant        none
// @license      GNU GPLv3
// @require      https://raw.githubusercontent.com/ush-ruff/Common/main/Userscript-Helper-Lib/helpersBootstrap.js
// ==/UserScript==

const KEYS = {
  "F": {
    action: () => focusSelectElement(`#suggestion-search`),
    label: "Search",
  },
  "ESCAPE": {
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
    action: () => showShortcutInfo(MODAL_ID),
    label: "Show shortcut help",
  }
}

const MODAL_ID = "shortcut-modal"


// -------------------------------------------
// Setup Dependencies
// -------------------------------------------
const ushruffUSKit = ensureUSKit.getUSKit()
const { installKeyHandler, setupShortcutInfo, showShortcutInfo, clickElement, focusSelectElement } = window.ushruffUSKit


// -------------------------------------------
// Event Listeners
// -------------------------------------------
window.addEventListener("load", () => {
  installKeyHandler(KEYS)
  setupShortcutInfo(MODAL_ID, KEYS)
})

