import SnakeMap from './SnakeMap'
import { Position  } from './Position'
import { Snake } from './Snake'
import { assign } from 'lodash'

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

    public transform(attributes: object): State {
        const result = new State(
            this.map,
            this.snake,
            this.direction,
            this.growth
        )
        return assign(result, attributes)
    }

}
