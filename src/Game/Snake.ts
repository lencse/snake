import { pos, Position } from './Position'

export class Snake {

    private positions: Position[]

    constructor(positions: Position[]) {
        this.positions = positions
    }

    public getLength(): number {
        return this.positions.length
    }

    public getHead(): Position {
        return [...this.positions].pop()
    }

    public getTail(): Position {
        return this.positions[0]
    }

    public getPositions(): Position[] {
        return [...this.positions]
    }

    public equals(other: Snake): boolean {
        let result = true
        this.positions.forEach((position: Position, idx: number) => {
            if (!position.equals(other.positions[idx])) {
                result = false
            }
        })
        return result
    }

}
