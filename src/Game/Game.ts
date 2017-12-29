import SnakeMap from './SnakeMap'
import { Position  } from './Position'
import { Snake } from './Snake'
import State from './State'

export default class Game {

    public static start(map: SnakeMap): Game {
        return new Game(State.init(map))
    }

    private state: State

    private constructor(state: State) {
        this.state = state
    }

    public isFree(position: Position): boolean {
        if ('x' === this.state.getMap().cell(position)) {
            return false
        }
        if (this.state.getSnake().getPositions().find((needle: Position) => needle.equals(position)) !== undefined) {
            return false
        }
        return true
    }

    public step(): Game {
        const growth = this.state.getGrowth()
        const direction = this.state.getDirection()
        const snake = 0 === growth
            ? this.state.getSnake().move(direction)
            : this.state.getSnake().grow(direction)
        return new Game(
            this.state.transform({
                direction,
                snake,
                growth: Math.max(0, growth - 1)
            })
        )
    }

    public getState(): State {
        return this.state
    }

}
