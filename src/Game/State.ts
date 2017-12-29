import SnakeMap from './SnakeMap'
import { Position  } from './Position'
import { Snake } from './Snake'

interface StateAttributes {

    snake: Snake,
    direction: string,
    growth: number

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

    private itsMap: SnakeMap
    private itsSnake: Snake
    private itsGrowth: number
    private itsDirection: string

    private constructor(
        map: SnakeMap,
        snake: Snake,
        direction: string,
        growth: number
    ) {
        this.itsMap = map
        this.itsSnake = snake
        this.itsDirection = direction
        this.itsGrowth = growth
    }

    public get map(): SnakeMap {
        return this.itsMap
    }

    public get snake(): Snake {
        return this.itsSnake
    }

    public get growth(): number {
        return this.itsGrowth
    }

    public get direction(): string {
        return this.itsDirection
    }

    public transform(attributes: StateAttributes): State {
        return new State(
            this.itsMap,
            attributes.snake,
            attributes.direction,
            attributes.growth
        )
    }

}
