export class Position {

    private itsRow: number
    private itsColumn: number

    constructor(row: number, column: number) {
        this.itsRow = row
        this.itsColumn = column
    }

    public get row(): number {
        return this.itsRow
    }

    public get column(): number {
        return this.itsColumn
    }

    public toString(): string {
        return `${this.row},${this.column}`
    }

    public equals(other: Position): boolean {
        return other.itsColumn === this.itsColumn && other.itsRow === this.itsRow
    }

    public neighbour(direction: string): Position {
        if ('u' === direction) {
            return pos(this.row - 1, this.column)
        }
        if ('d' === direction) {
            return pos(this.row + 1, this.column)
        }
        if ('l' === direction) {
            return pos(this.row, this.column - 1)
        }
        if ('r' === direction) {
            return pos(this.row, this.column + 1)
        }
    }
}

export function pos(row: number, column: number): Position {
    return new Position(row, column)
}
