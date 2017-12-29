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
        return new Game(
            this.state.transform({
                map: null,
                snake: 0 === this.state.getGrowth()
                    ? this.state.getSnake().move(this.state.getDirection())
                    : this.state.getSnake().grow(this.state.getDirection()),
                direction: null,
                growth: Math.max(0, this.state.getGrowth() - 1)
            })
        )
    }

    public getState(): State {
        return this.state
    }

}
