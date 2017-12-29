import { pos, Position } from './Position'

export default class SnakeMap {

    private width: number
    private height: number
    private cells: Map<string, string> = new Map<string, string>()
    private startingPosition: Position
    private startingDirection: string

    constructor(spec: string[]) {
        this.height = spec.length
        this.width = spec[0].length
        spec.forEach((line: string, rowIdx: number) => {
            if (this.width !== line.length) {
                throw new Error('Invalid map format')
            }
            line.split('').forEach((elem: string, colIdx: number) => {
                const position = pos(rowIdx + 1, colIdx + 1)
                if ('x' === elem) {
                    this.cells.set(position.toString(), 'x')
                    return
                }
                if (['u', 'd', 'l', 'r'].find((needle) => elem === needle) !== undefined) {
                    this.startingPosition = position
                    this.startingDirection = elem
                }
                this.cells.set(position.toString(), ' ')
            })
        })
    }

    public getHeight(): number {
        return this.height
    }

    public getWidth(): number {
        return this.width
    }

    public cell(position: Position): string {
        return this.cells.get(position.toString())
    }

    public getStartingPosition(): Position {
        return this.startingPosition
    }

    public getStartingDirection(): string {
        return this.startingDirection
    }

}
