import Browser from './Browser/Browser'

window.document.addEventListener('DOMContentLoaded', (event: Event) => {
    new Browser(window, event.target as Document).init()
})
