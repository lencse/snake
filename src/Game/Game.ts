import SnakeMap from './SnakeMap'
import { Position  } from './Position'
import { Snake } from './Snake'

export default class Game {

    private map: SnakeMap
    private snake: Snake

    constructor(map: SnakeMap) {
        this.map = map
        this.snake = new Snake([this.map.getStartingPosition()])
    }

    public isFree(position: Position): boolean {
        if ('x' === this.map.cell(position)) {
            return false
        }
        if (this.snake.getPositions().find((needle: Position) => needle.equals(position)) !== undefined) {
            return false
        }
        return true
    }

}
