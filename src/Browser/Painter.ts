import Game from '../Game/Game'
import { pos, Position } from '../Game/Position'

export default class Painter {

    private context: CanvasRenderingContext2D

    constructor(canvas: HTMLCanvasElement) {
        canvas.setAttribute('width', '800')
        canvas.setAttribute('height', '800')
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
                this.context.fillRect((col - 1) * 35, (row - 1) * 35, 35, 35)
            }
        }
    }

    private paintPill(game: Game) {
        if (game.pill) {
            this.context.fillStyle = '#199'
            this.context.arc((game.pill.column - 1) * 35 + 17.5, (game.pill.row - 1) * 35 + 17.5, 13, 0, 2*Math.PI)
            this.context.fill()
        }
    }

    private paintSnake(game: Game) {
        game.snake.positions.forEach((position: Position) => {
            this.context.fillStyle = '#191'
            this.context.beginPath()
            this.context.arc((position.column - 1) * 35 + 17.5, (position.row - 1) * 35 + 17.5, 16.5, 0, 2*Math.PI)
            this.context.fill()
        })
    }

}
