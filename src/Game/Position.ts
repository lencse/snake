export class Position {

    private row: number
    private column: number

    constructor(row: number, column: number) {
        this.row = row
        this.column = column
    }

    public getRow(): number {
        return this.row
    }

    public getColumn(): number {
        return this.column
    }

    public toString(): string {
        return `${this.row},${this.column}`
    }

    public equals(other: Position): boolean {
        return other.column === this.column && other.row === this.row
    }

    public neighbour(direction: string): Position {
        return pos(this.getRow() - 1, this.getColumn())
    }
}

export function pos(row: number, column: number): Position {
    return new Position(row, column)
}
