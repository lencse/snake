import SnakeMap from './SnakeMap'
import { Position  } from './Position'

export default class Game {

    private map: SnakeMap

    constructor(map: SnakeMap) {
        this.map = map
    }

    public isFree(position: Position): boolean {
        return ' ' === this.map.cell(position)
    }

}
