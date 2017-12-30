import Game from '../Game/Game'
import SnakeMap from '../Game/SnakeMap'
import { pos, Position } from '../Game/Position'
import Painter from './Painter'

export default class Browser {

    private window: Window
    private document: Document
    private game: Game
    private painter: Painter

    constructor(window: Window, document: Document) {
        this.window = window
        this.document = document
        this.painter = new Painter(this.document.getElementById('game') as HTMLCanvasElement)
    }

    public init() {
        this.game = Game.start(
            new SnakeMap([
                'x xxxxxxxx',
                'xd       x',
                'x        x',
                'x        x',
                'x        x',
                'x        x',
                'x        x',
                'x        x',
                'x        x',
                'x xxxxxxxx'
            ]),
            Game.randomPillPlacer
        )
        this.window.setInterval(this.heartbeat.bind(this), 175)
        this.document.body.addEventListener('keydown', this.onKeyDown.bind(this))
    }

    private onKeyDown(event: KeyboardEvent) {
        const codes = []
        codes[37] = 'l'
        codes[38] = 'u'
        codes[39] = 'r'
        codes[40] = 'd'
        const direction = codes[event.keyCode]
        if (direction) {
            this.game = this.game.turn(direction)
        }
    }

    private heartbeat() {
        this.game = this.game.step()
        this.painter.paint(this.game)
    }

}
