import SnakeMap from './SnakeMap'
import { Position  } from './Position'
import { Snake } from './Snake'
import State from './State'

export default class Game {

    public static start(map: SnakeMap): Game {
        return new Game(State.init(map))
    }

    private itsState: State

    private constructor(state: State) {
        this.itsState = state
    }

    public isFree(position: Position): boolean {
        if ('x' === this.itsState.map.cell(position)) {
            return false
        }
        if (this.itsState.snake.positions.find((needle: Position) => needle.equals(position)) !== undefined) {
            return false
        }
        return true
    }

    public step(): Game {
        const turns = this.itsState.turns
        const growth = this.itsState.growth
        const direction = 0 === turns.length
            ? this.itsState.direction
            : turns[0]
        const snake = 0 === growth
            ? this.itsState.snake.move(direction)
            : this.itsState.snake.grow(direction)
        return new Game(
            this.itsState.transform({
                direction,
                snake,
                growth: Math.max(0, growth - 1),
                turns: this.itsState.turns.slice(1)
            })
        )
    }

    public turn(direction: string): Game {
        const turns = this.itsState.turns
        turns.push(direction)
        return new Game(
            this.itsState.transform({
                direction: this.itsState.direction,
                snake: this.itsState.snake,
                growth: this.itsState.growth,
                turns,
            })
        )
    }

    public get snake(): Snake {
        return this.itsState.snake
    }

    public get map(): SnakeMap {
        return this.itsState.map
    }

    public get direction(): string {
        return this.itsState.direction
    }

    public get growth(): number {
        return this.itsState.growth
    }

}
