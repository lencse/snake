import Game from '../Game/Game'
import SnakeMap from '../Game/SnakeMap'
import { pos, Position } from '../Game/Position'

export default class Browser {

    private game: Game
    private context: CanvasRenderingContext2D

    public init(doc: Document) {
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
            (g: Game) => {
                return pos(Math.floor(Math.random() * g.map.height) + 1, Math.floor(Math.random() * g.map.width) + 1)
            }
        )
        const canvas: HTMLCanvasElement =  doc.getElementById('game') as HTMLCanvasElement
        canvas.setAttribute('width', '800')
        canvas.setAttribute('height', '800')
        this.context = canvas.getContext('2d')
        window.setInterval(this.heartbeat.bind(this), 175)
        doc.body.addEventListener('keydown', (e: KeyboardEvent) => {
            const codes = []
            codes[37] = 'l'
            codes[38] = 'u'
            codes[39] = 'r'
            codes[40] = 'd'
            if (codes[e.keyCode]) {
                this.game = this.game.turn(codes[e.keyCode])
            }
        })
    }

    private heartbeat() {
        this.game = this.game.step()
        this.paint()
    }

    private paint() {
        const ctx = this.context
        // ctx.fillStyle = '#000'
        // ctx.fillRect(0, 0, canvas.width, canvas.height)
        const game = this.game
        for (let row = 1; row <= game.map.height; ++row) {
            for (let col = 1; col <= game.map.width; ++col) {
                ctx.fillStyle = 'x' === game.map.cell(pos(row, col)) ? '#900' : '#000'
                ctx.fillRect((col - 1) * 35, (row - 1) * 35, 35, 35)
            }
        }
        if (game.pill) {
            ctx.fillStyle = '#199'
            ctx.arc((game.pill.column - 1) * 35 + 17.5, (game.pill.row - 1) * 35 + 17.5, 13, 0, 2*Math.PI)
            ctx.fill()
        }
        game.snake.positions.forEach((position: Position) => {
            ctx.fillStyle = '#191'
            ctx.beginPath()
            ctx.arc((position.column - 1) * 35 + 17.5, (position.row - 1) * 35 + 17.5, 16.5, 0, 2*Math.PI)
            ctx.fill()
        })

    }

}
