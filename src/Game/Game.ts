import SnakeMap from './SnakeMap'
import { Position, pos } from './Position'
import { Snake } from './Snake'
import State from './State'

export default class Game {

    public static start(map: SnakeMap, pillPlacer: (game: Game) => Position): Game {
        return new Game(State.init(map, null), pillPlacer)
    }

    private itsState: State

    private pillPlacer: (game: Game) => Position

    private constructor(state: State, pillPlacer: (game: Game) => Position) {
        this.itsState = state
        this.pillPlacer = pillPlacer
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
        const direction = 0 === turns.length
            ? this.itsState.direction
            : turns[0]
        let next = this.snake.head.neighbour(direction)
        const end = !this.isFree(next)
        if (0 === next.row) {
            next = pos(this.map.height, next.column)
        }
        if (this.map.height + 1 === next.row) {
            next = pos(1, next.column)
        }
        if (0 === next.column) {
            next = pos(next.row, this.map.width)
        }
        if (this.map.width + 1 === next.column) {
            next = pos(next.row, 1)
        }
        const growth = this.itsState.pill && this.itsState.pill.equals(next)
            ? this.itsState.growth + 3
            : this.itsState.growth
        const snake = end
            ? this.itsState.snake
            : 0 === growth
                ? this.itsState.snake.move(next)
                : this.itsState.snake.grow(next)
        const pill = null === this.pill || this.itsState.pill.equals(next)
            ? this.pillPlacer(this)
            : this.pill
        return new Game(
            this.itsState.transform({
                direction,
                snake,
                growth: Math.max(0, growth - 1),
                turns: this.itsState.turns.slice(1),
                end,
                pill
            }), this.pillPlacer
        )
    }

    public turn(direction: string): Game {
        const turns = direction === this.itsState.turns.pop() || this.opposite(direction)
            ? this.itsState.turns
            : this.itsState.turns.concat([direction])
        return new Game(
            this.itsState.transform({
                direction: this.itsState.direction,
                snake: this.itsState.snake,
                growth: this.itsState.growth,
                turns,
                end: this.itsState.end,
                pill: this.itsState.pill
            }), this.pillPlacer
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

    public get end(): boolean {
        return this.itsState.end
    }

    public get pill(): Position {
        return this.itsState.pill
    }

    private opposite(direction: string): boolean {
        const current = 0 === this.itsState.turns.length
            ? this.direction
            : this.itsState.turns.pop()
        return 'l' === direction && 'r' === current
            || 'r' === direction && 'l' === current
            || 'u' === direction && 'd' === current
            || 'd' === direction && 'u' === current
    }

}
