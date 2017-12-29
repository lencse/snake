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
        if (other.positions.length !== this.positions.length) {
            return false
        }
        let result = true
        this.positions.forEach((position: Position, idx: number) => {
            if (!position.equals(other.positions[idx])) {
                result = false
            }
        })
        return result
    }

    public grow(direction: string): Snake {
        const positions = [...this.positions]
        positions.push(this.getHead().neighbour(direction))

        return new Snake(positions)
    }

}
