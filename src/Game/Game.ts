import SnakeMap from './SnakeMap'
import { Position  } from './Position'
import { Snake } from './Snake'

export default class Game {

    public static start(map: SnakeMap): Game {
        return new Game(
            map,
            new Snake([map.getStartingPosition()]),
            map.getStartingDirection(),
            4
        )
    }

    private map: SnakeMap
    private snake: Snake
    private growth: number
    private direction: string

    private constructor(
        map: SnakeMap,
        snake: Snake,
        direction: string,
        growth: number
    ) {
        this.map = map
        this.snake = snake
        this.direction = direction
        this.growth = growth
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

    public step(): Game {
        return new Game(
            this.map,
            0 === this.growth
                ? this.snake
                : this.snake.grow(this.getDirection()),
            this.direction,
            Math.max(0, this.growth - 1)
        )
    }

}
