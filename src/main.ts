import Browser from './Browser/Browser'

window.document.addEventListener('DOMContentLoaded', () => {
    const browser = new Browser()
    browser.init(window.document)
})
