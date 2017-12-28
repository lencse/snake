import { suite, test, slow, timeout, skip, only } from 'mocha-typescript'
import { assert } from 'chai'
import { pos } from '../src/Game/Position'
import SnakeMap from '../src/Game/SnakeMap'
import { Snake } from '../src/Game/Snake'

@suite class SnakeTest {

    @test private map() {
        const map = new SnakeMap([
            'xxxxx',
            'x x x',
            'x   x',
            'x 2 x',
            'x01 x',
            'xxxxx',
        ])
        assert.equal(6, map.getHeight())
        assert.equal(5, map.getWidth())
        assert.equal(' ', map.cell(pos(3, 2)))
        assert.equal('x', map.cell(pos(2, 3)))
        assert.equal(' ', map.cell(pos(5, 2)))
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

}
