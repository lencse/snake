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

    public asString(): string {
        // return '3,2'
        return `${this.row},${this.column}`
    }

}

export function pos(row: number, column: number): Position {
    return new Position(row, column)
}
