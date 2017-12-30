import SnakeMap from './SnakeMap'
import { Position  } from './Position'
import { Snake } from './Snake'

interface StateAttributes {

    snake: Snake,
    direction: string,
    growth: number
    turns: string[],
    end: boolean
    pill: Position

}

export default class State {

    public static init(map: SnakeMap, pill: Position): State {
        return new State(
            map,
            new Snake([map.startingPosition]),
            map.startingDirection,
            4,
            [],
            false,
            pill
        )
    }

    private itsMap: SnakeMap
    private itsSnake: Snake
    private itsGrowth: number
    private itsDirection: string
    private itsTurns: string[]
    private itsEnd: boolean
    private itsPill: Position

    private constructor(
        map: SnakeMap,
        snake: Snake,
        direction: string,
        growth: number,
        turns: string[],
        end: boolean,
        pill: Position
    ) {
        this.itsMap = map
        this.itsSnake = snake
        this.itsDirection = direction
        this.itsGrowth = growth
        this.itsTurns = turns
        this.itsEnd = end
        this.itsPill = pill
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

    public get turns(): string[] {
        return [...this.itsTurns]
    }
    public get end(): boolean {
        return this.itsEnd
    }

    public get pill(): Position {
        return this.itsPill
    }

    public transform(attributes: StateAttributes): State {
        return new State(
            this.itsMap,
            attributes.snake,
            attributes.direction,
            attributes.growth,
            attributes.turns,
            attributes.end,
            attributes.pill
        )
    }

}
