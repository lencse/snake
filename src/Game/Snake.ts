import { pos, Position } from './Position'

export class Snake {

    private itsPositions: Position[]

    constructor(positions: Position[]) {
        this.itsPositions = positions
    }

    public get length(): number {
        return this.itsPositions.length
    }

    public get head(): Position {
        return [...this.itsPositions].pop()
    }

    public get tail(): Position {
        return this.itsPositions[0]
    }

    public get positions(): Position[] {
        return [...this.itsPositions]
    }

    public equals(other: Snake): boolean {
        if (other.itsPositions.length !== this.itsPositions.length) {
            return false
        }
        let result = true
        this.itsPositions.forEach((position: Position, idx: number) => {
            if (!position.equals(other.itsPositions[idx])) {
                result = false
            }
        })
        return result
    }

    public grow(direction: string): Snake {
        const positions = [...this.itsPositions]
        positions.push(this.head.neighbour(direction))

        return new Snake(positions)
    }

    public move(direction: string): Snake {
        const positions = [...this.itsPositions.slice(1)]
        positions.push(this.head.neighbour(direction))

        return new Snake(positions)
    }

}
