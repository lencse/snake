import Game from '../Game/Game'
import SnakeMap from '../Game/SnakeMap'
import { pos, Position } from '../Game/Position'
import Painter from './Painter'

export default class Browser {

    private window: WindowTimers
    private document: Document
    private game: Game
    private painter: Painter
    private maps: SnakeMap[] = []

    constructor(window: WindowTimers, document: Document) {
        this.window = window
        this.document = document
        this.painter = new Painter(this.document.getElementById('game') as HTMLCanvasElement)
    }

    public init() {
        this.initMaps()
        this.game = Game.start(this.maps[2], Game.randomPillPlacer)
        this.window.setInterval(this.heartbeat.bind(this), 175)
        this.document.body.addEventListener('keydown', this.onKeyDown.bind(this))
    }

    private onKeyDown(event: KeyboardEvent) {
        const codes = { 37: 'l', 38: 'u', 39: 'r', 40: 'd', 87: 'u', 65: 'l', 83: 'd', 68: 'r' }
        const direction = codes[event.keyCode]
        if (direction) {
            this.game.turn(direction)
            event.preventDefault()
        }
    }

    private heartbeat() {
        this.game.step()
        this.painter.paint(this.game)
    }

    private initMaps() {
        const mapElements = this.document.getElementsByClassName('map')
        for (let i = 0; i < mapElements.length; ++i) {
            this.maps.push(new SnakeMap(mapElements.item(i).innerHTML.trim().split(/\s+/)))
        }

    }

}
