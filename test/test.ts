import { suite, test, slow, timeout, skip, only } from 'mocha-typescript'
import { assert } from 'chai'
import { pos } from '../src/Game/Position'
import SnakeMap from '../src/Game/SnakeMap'
import { Snake } from '../src/Game/Snake'
import Game from '../src/Game/Game'

@suite class SnakeTest {

    @test private map() {
        const map = this.createMap()
        assert.equal(6, map.getHeight())
        assert.equal(5, map.getWidth())
        assert.equal(' ', map.cell(pos(3, 2)))
        assert.equal('x', map.cell(pos(2, 3)))
        assert.equal(' ', map.cell(pos(5, 2)))
        assert.isTrue(pos(5, 2).equals(map.getStartingPosition()))
        assert.equal('u', map.getStartingDirection())
    }

    @test private game() {
        const game = new Game(this.createMap())
        assert.isTrue(game.isFree(pos(2, 2)))
        assert.isFalse(game.isFree(pos(2, 3)))
        assert.isFalse(game.isFree(pos(5, 2)))
    }

    @test private snake() {
        const snake = new Snake([
            pos(1, 2),
            pos(2, 2),
            pos(2, 3)
        ])
        assert.equal(3, snake.getLength())
        assert.isTrue(pos(2, 3).equals(snake.getHead()))
        assert.isTrue(pos(2, 3).equals(snake.getHead()))
        assert.isTrue(pos(1, 2).equals(snake.getTail()))
    }

    private createMap(): SnakeMap {
        return new SnakeMap([
            'xxxxx',
            'x x x',
            'x   x',
            'x   x',
            'xu  x',
            'xxxxx',
        ])
    }

}
