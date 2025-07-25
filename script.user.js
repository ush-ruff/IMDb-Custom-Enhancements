// ==UserScript==
// @name         IMDb - Custom Enhancements
// @namespace    Violentmonkey Scripts
// @match        https://www.imdb.com/*
// @version      0.1.0
// @author       ushruff
// @description  Setup custom keyboard shortcuts for IMDb
// @homepageURL  https://github.com/ush-ruff/IMDb-Custom-Enhancements/
// @downloadURL  https://github.com/ush-ruff/IMDb-Custom-Enhancements/raw/main/script.user.js
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

const KEYS = {
  70:         () => focusSelectElement(`#suggestion-search`),                                                     // key: f
  27:         () => clickElement(`.ipc-page-content-container[role="presentation"] a[href$="?ref_=mv_close"]`),   // key: esc
  82:         () => clickElement(`[data-testid="hero-rating-bar__user-rating"] > .ipc-btn`),                      // key: r
  'shift+82': () => clickElement(`.ipc-promptable-base__panel [data-testid="rate-button"]`),                      // key: shift + r
}


// -------------------------------------------
// Event Listeners
// -------------------------------------------
document.addEventListener("keyup", pressKey)


// -------------------------------------------
// Main Functions
// -------------------------------------------
function pressKey(e) {
  let key = e.keyCode

  if (e.ctrlKey) key = `ctrl+${key}`
  if (e.shiftKey) key = `shift+${key}`
  if (e.altKey) key = `alt+${key}`

  if (e.target.tagName == "INPUT" || e.target.tagName == "TEXTAREA") return

  if (key in KEYS) {
    return KEYS[key]()
  }
}


// -------------------------------------------
// Helper Functions
// -------------------------------------------
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
