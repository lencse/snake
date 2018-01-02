import Game from '../Game/Game'
import { pos, Position } from '../Game/Position'

export default class Painter {

    private context: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement) {
        canvas.setAttribute('width', '2400')
        canvas.setAttribute('height', '2400')
        this.context = canvas.getContext('2d')
    }

    public paint(game: Game) {
        this.paintMap(game)
        this.paintPill(game)
        this.paintSnake(game)
    }

    private paintMap(game: Game) {
        for (let row = 1; row <= game.map.height; ++row) {
            for (let col = 1; col <= game.map.width; ++col) {
                this.context.fillStyle = 'x' === game.map.cell(pos(row, col)) ? '#900' : '#000'
                this.context.fillRect((col - 1) * 100, (row - 1) * 100, 100, 100)
            }
        }
    }

    private paintPill(game: Game) {
        if (game.pill) {
            this.context.fillStyle = '#199'
            this.context.arc((game.pill.column - 1) * 100 + 50, (game.pill.row - 1) * 100 + 50, 30, 0, 2*Math.PI)
            this.context.fill()
        }
    }

    private paintSnake(game: Game) {
        this.context.fillStyle = '#191'
        game.snake.positions.forEach((position: Position) => {
            this.context.beginPath()
            this.context.arc((position.column - 1) * 100 + 50, (position.row - 1) * 100 + 50, game.snake.head.equals(position) ? 38 : 45, 0, 2*Math.PI)
            this.context.fill()
        })
    }

}
