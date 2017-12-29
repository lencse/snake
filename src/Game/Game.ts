import SnakeMap from './SnakeMap'
import { Position  } from './Position'
import { Snake } from './Snake'

export default class Game {

    public static start(map: SnakeMap): Game {
        return new Game(
            map,
            new Snake([map.getStartingPosition()]),
            map.getStartingDirection()
        )
    }

    private map: SnakeMap
    private snake: Snake
    private growth: number = 4
    private direction: string

    private constructor(map: SnakeMap, snake: Snake, direction: string) {
        this.map = map
        this.snake = snake
        this.direction = direction
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

    public getGrowth(): number {
        return this.growth
    }

    public getDirection(): string {
        return this.direction
    }

    public getSnake(): Snake {
        return this.snake
    }

}
