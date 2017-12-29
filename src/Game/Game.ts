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
        const growth = this.itsState.growth
        const direction = this.itsState.direction
        const snake = 0 === growth
            ? this.itsState.snake.move(direction)
            : this.itsState.snake.grow(direction)
        return new Game(
            this.itsState.transform({
                direction,
                snake,
                growth: Math.max(0, growth - 1)
            })
        )
    }

    public get state(): State {
        return this.itsState
    }

}
