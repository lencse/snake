import { suite, test, slow, timeout, skip, only } from 'mocha-typescript'
import { assert } from 'chai'
import { pos } from '../src/Game/Position'
import SnakeMap from '../src/Game/SnakeMap'
import { Snake } from '../src/Game/Snake'
import Game from '../src/Game/Game'

@suite class SnakeTest {

    private largeEmptyMap: SnakeMap =  new SnakeMap([
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

    private smallMap: SnakeMap = new SnakeMap([
        'xxxxx',
        'x x x',
        'x   x',
        'x   x',
        'xu  x',
        'xxxxx',
    ])

    @test public map() {
        const map = this.smallMap
        assert.equal(6, map.height)
        assert.equal(5, map.width)
        assert.equal(' ', map.cell(pos(3, 2)))
        assert.equal('x', map.cell(pos(2, 3)))
        assert.equal(' ', map.cell(pos(5, 2)))
        assert.isTrue(pos(5, 2).equals(map.startingPosition))
        assert.equal('u', map.startingDirection)
    }

    @test public game() {
        const game = Game.start(this.smallMap)
        assert.isTrue(game.isFree(pos(2, 2)))
        assert.isFalse(game.isFree(pos(2, 3)))
        assert.isFalse(game.isFree(pos(5, 2)))
        assert.equal(4, game.growth)
        assert.equal('u', game.direction)
        assert.isTrue(new Snake([pos(5, 2)]).equals(game.snake))
    }

    @test public step() {
        const game = Game.start(this.smallMap).step()
        assert.isFalse(game.isFree(pos(5, 2)))
        assert.isFalse(game.isFree(pos(4, 2)))
        assert.equal(3, game.growth)
        assert.equal('u', game.direction)
        assert.equal(2, game.snake.length)
        assert.isTrue(new Snake([
            pos(5, 2),
            pos(4, 2)
        ]).equals(game.snake))
    }

    @test public manyStep() {
        const initial = Game.start(this.largeEmptyMap)
        assert.equal(20, initial.map.height)
        let game = initial
        for (let i = 0; i < 4; ++i) {
            game = game.step()
        }
        assert.equal(5, game.snake.length)
        assert.isTrue(pos(5, 2).equals(game.snake.head))
        game = game.step()
        assert.equal(5, game.snake.length)
        assert.isTrue(pos(6, 2).equals(game.snake.head))
        assert.isTrue(pos(2, 2).equals(game.snake.tail))
    }

    @test public turn() {
        let game = Game.start(this.smallMap).step()
        game = game.turn('r').step()
        assert.isTrue(pos(4, 3).equals(game.snake.head))
        game = game.turn('u').step()
        assert.isTrue(pos(3, 3).equals(game.snake.head))
    }

    @test public turnsInOneRound() {
        let game = Game.start(this.smallMap).step()
        game = game.turn('r').turn('u').step().step()
        assert.isTrue(pos(3, 3).equals(game.snake.head))
    }

    @test public dontHandleTurnIfSmaeAsPrevious() {
        let game = Game.start(this.smallMap).step()
        game = game.turn('r').turn('r').turn('u').step().step()
        assert.isTrue(pos(3, 3).equals(game.snake.head))
    }

    @test public dontAllowOppositeDirection() {
        let game = Game.start(this.smallMap)
        game = game.turn('d').step()
        assert.isTrue(pos(4, 2).equals(game.snake.head))
    }

    @test public snake() {
        const snake = new Snake([
            pos(1, 2),
            pos(2, 2),
            pos(2, 3)
        ])
        assert.equal(3, snake.length)
        assert.isTrue(pos(2, 3).equals(snake.head))
        assert.isTrue(pos(1, 2).equals(snake.tail))

    }

}
