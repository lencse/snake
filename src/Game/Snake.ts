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
        return this.positions.slice(-1).pop()
    }

    public getTail(): Position {
        return this.positions[0]
    }

}
