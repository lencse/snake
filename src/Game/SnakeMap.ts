import { pos, Position } from './Position'

export default class SnakeMap {

    private itsWidth: number
    private itsHeight: number
    private cells: Map<string, string> = new Map<string, string>()
    private itsStartingPosition: Position
    private itsStartingDirection: string

    constructor(spec: string[]) {
        this.itsHeight = spec.length
        this.itsWidth = spec[0].length
        spec.forEach((line: string, rowIdx: number) => {
            if (this.itsWidth !== line.length) {
                throw new Error('Invalid map format')
            }
            line.split('').forEach((elem: string, colIdx: number) => {
                const position = pos(rowIdx + 1, colIdx + 1)
                if ('x' === elem) {
                    this.cells.set(position.toString(), 'x')
                    return
                }
                if (['u', 'd', 'l', 'r'].find((needle) => elem === needle) !== undefined) {
                    this.itsStartingPosition = position
                    this.itsStartingDirection = elem
                }
                this.cells.set(position.toString(), ' ')
            })
        })
    }

    public get height(): number {
        return this.itsHeight
    }

    public get width(): number {
        return this.itsWidth
    }

    public cell(position: Position): string {
        return this.cells.get(position.toString())
    }

    public get startingPosition(): Position {
        return this.itsStartingPosition
    }

    public get startingDirection(): string {
        return this.itsStartingDirection
    }

}
