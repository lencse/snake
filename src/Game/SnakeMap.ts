import { pos, Position } from './Position'

export default class SnakeMap {

    private width: number
    private height: number
    private cells: Map<string, string> = new Map<string, string>()

    constructor(spec: string[]) {
        this.height = spec.length
        this.width = spec[0].length
        spec.forEach((line: string, rowIdx: number) => {
            if (this.width !== line.length) {
                throw new Error('Invalid map format')
            }
            line.split('').forEach((elem: string, colIdx: number) => {
                this.cells.set(pos(rowIdx + 1, colIdx + 1).asString(), elem)
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
        return this.cells.get(position.asString())
    }

}
