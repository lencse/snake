import Browser from './Browser/Browser'

window.document.addEventListener('DOMContentLoaded', (event: Event) => {
    const browser = new Browser(window, event.target as Document)
    browser.init()
})
