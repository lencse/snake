import { suite, test, slow, timeout, skip, only } from 'mocha-typescript'
import { assert } from 'chai'
import { pos } from '../src/Game/Position'
import SnakeMap from '../src/Game/SnakeMap'

@suite class SnakeTest {

    @test private map() {
        const map = new SnakeMap([
            'xxxxx',
            'x x x',
            'x   x',
            'x   x',
            'x   x',
            'xxxxx',
        ])
        assert.equal(6, map.getHeight())
        assert.equal(5, map.getWidth())
        assert.equal(' ', map.cell(pos(3, 2)))
        assert.equal('x', map.cell(pos(2, 3)))
    }

    @test private positionToString() {
        assert.equal('3,2', pos(3, 2).asString())
    }

}
