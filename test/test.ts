import { suite, test, slow, timeout, skip, only } from 'mocha-typescript'
import { assert } from 'chai'
import { pos } from '../src/Game/Position'
import SnakeMap from '../src/Game/SnakeMap'
import { Snake } from '../src/Game/Snake'
import Game from '../src/Game/Game'

@suite class SnakeTest {

    @test private map() {
        const map = this.smallMap()
        assert.equal(6, map.getHeight())
        assert.equal(5, map.getWidth())
        assert.equal(' ', map.cell(pos(3, 2)))
        assert.equal('x', map.cell(pos(2, 3)))
        assert.equal(' ', map.cell(pos(5, 2)))
        assert.isTrue(pos(5, 2).equals(map.getStartingPosition()))
        assert.equal('u', map.getStartingDirection())
    }

    @test private game() {
        const game = Game.start(this.smallMap())
        assert.isTrue(game.isFree(pos(2, 2)))
        assert.isFalse(game.isFree(pos(2, 3)))
        assert.isFalse(game.isFree(pos(5, 2)))
        assert.equal(4, game.state.growth)
        assert.equal('u', game.state.direction)
        assert.isTrue(new Snake([pos(5, 2)]).equals(game.state.snake))
    }

    @test private step() {
        const game = Game.start(this.smallMap()).step()
        assert.isFalse(game.isFree(pos(5, 2)))
        assert.isFalse(game.isFree(pos(4, 2)))
        assert.equal(3, game.state.growth)
        assert.equal('u', game.state.direction)
        assert.equal(2, game.state.snake.length)
        assert.isTrue(new Snake([
            pos(5, 2),
            pos(4, 2)
        ]).equals(game.state.snake))
    }

    @test private manyStep() {
        const initial = Game.start(this.largeEmptyMap())
        assert.equal(20, initial.state.map.getHeight())
        let game = initial
        for (let i = 0; i < 4; ++i) {
            game = game.step()
        }
        assert.equal(5, game.state.snake.length)
        assert.isTrue(pos(5, 2).equals(game.state.snake.head))
        game = game.step()
        assert.equal(5, game.state.snake.length)
        assert.isTrue(pos(6, 2).equals(game.state.snake.head))
        assert.isTrue(pos(2, 2).equals(game.state.snake.tail))
    }

    @test private turn() {
        const initial = Game.start(this.smallMap())
    }

    @test private snake() {
        const snake = new Snake([
            pos(1, 2),
            pos(2, 2),
            pos(2, 3)
        ])
        assert.equal(3, snake.length)
        assert.isTrue(pos(2, 3).equals(snake.head))
        assert.isTrue(pos(1, 2).equals(snake.tail))

    }

    private smallMap(): SnakeMap {
        return new SnakeMap([
            'xxxxx',
            'x x x',
            'x   x',
            'x   x',
            'xu  x',
            'xxxxx',
        ])
    }

    private largeEmptyMap(): SnakeMap {
        return new SnakeMap([
            ' d                  ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
            '                    ',
        ])
    }

}
