import SnakeMap from './SnakeMap'
import { Position  } from './Position'
import { Snake } from './Snake'

interface StateDelta {

    map: SnakeMap
    snake: Snake
    growth: number
    direction: string

}

export default class State {

    public static init(map: SnakeMap): State {
        return new State(
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

    public getMap(): SnakeMap {
        return this.map
    }

    public getSnake(): Snake {
        return this.snake
    }

    public getGrowth(): number {
        return this.growth
    }

    public getDirection(): string {
        return this.direction
    }

    public transform(attributes: StateDelta): State {
        const result = new State(
            this.map,
            this.snake,
            this.direction,
            this.growth
        )
        if (null !== attributes.map) {
            result.map = attributes.map
        }
        if (null !== attributes.snake) {
            result.snake = attributes.snake
        }
        if (null !== attributes.direction) {
            result.direction = attributes.direction
        }
        if (null !== attributes.growth) {
            result.growth = attributes.growth
        }
        return result
    }

}
