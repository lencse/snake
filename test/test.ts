import { suite, test, slow, timeout, skip, only } from 'mocha-typescript'
import { assert } from 'chai'
import { pos, Position } from '../src/Game/Position'
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

    private placerMockPills: Position[] = [
        pos(6, 3),
        pos(7, 2)
    ]

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
        const game = Game.start(this.smallMap, this.placerMock54)
        assert.isTrue(game.isFree(pos(2, 2)))
        assert.isFalse(game.isFree(pos(2, 3)))
        assert.isFalse(game.isFree(pos(5, 2)))
        assert.equal(4, game.growth)
        assert.equal('u', game.direction)
        assert.isTrue(new Snake([pos(5, 2)]).equals(game.snake))
    }

    @test public step() {
        const game = Game.start(this.smallMap, this.placerMock54).step()
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
        const initial = Game.start(this.largeEmptyMap, this.placerMock54)
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
        for (let i = 0; i < 4; ++i) {
            game = game.step()
        }
        assert.equal(0, game.growth)
        assert.equal(5, game.snake.length)
    }

    @test public turn() {
        let game = Game.start(this.smallMap, this.placerMock54).step()
        game = game.turn('r').step()
        assert.isTrue(pos(4, 3).equals(game.snake.head))
        game = game.turn('u').step()
        assert.isTrue(pos(3, 3).equals(game.snake.head))
    }

    @test public turnsInOneRound() {
        let game = Game.start(this.smallMap, this.placerMock54).step()
        game = game.turn('r').turn('u').step().step()
        assert.isTrue(pos(3, 3).equals(game.snake.head))
    }

    @test public dontHandleTurnIfSameAsPrevious() {
        let game = Game.start(this.smallMap, this.placerMock54).step()
        game = game.turn('r').turn('r').turn('u').step().step()
        assert.isTrue(pos(3, 3).equals(game.snake.head))
    }

    @test public dontAllowOppositeDirection() {
        let game = Game.start(this.smallMap, this.placerMock54)
        game = game.turn('d').step()
        assert.isTrue(pos(4, 2).equals(game.snake.head))
    }

    @test public goThroughWall() {
        let game = Game.start(this.largeEmptyMap, this.placerMock54)
        game = game.turn('r').turn('u').step().step()
        assert.isTrue(pos(20, 3).equals(game.snake.head))
    }

    @test public deathOnObstacle() {
        let game = Game.start(this.smallMap, this.placerMock54)
        game = game.turn('l').step()
        assert.isTrue(game.end)
        assert.isTrue(pos(5, 2).equals(game.snake.head))
    }

    @test public deathOnItself() {
        let game = Game.start(this.smallMap, this.placerMock54)
        game = game
            .step()
            .turn('r')
            .turn('d')
            .turn('l')
            .step()
            .step()
            .step()
        assert.isTrue(game.end)
        assert.isTrue(pos(5, 3).equals(game.snake.head))
    }

    @test public placePill() {
        let game = Game.start(this.largeEmptyMap, this.placerMock72)
        game = game.step()
        assert.isTrue(pos(7, 2).equals(game.pill))
    }

    @test public eatPill() {
        let game = Game.start(this.largeEmptyMap, this.placerMock7263.bind(this))
        for (let i = 0; i < 6; ++i) {
            game = game.step()
        }
        assert.isTrue(pos(7, 2).equals(game.snake.head))
        assert.equal(2, game.growth)
        assert.equal(6, game.snake.length)
        assert.isTrue(pos(6, 3).equals(game.pill))
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

    private placerMock54(game: Game): Position {
        return pos(5, 4)
    }

    private placerMock72(game: Game): Position {
        return pos(7, 2)
    }

    private placerMock7263(game: Game): Position {
        return this.placerMockPills.pop()
    }

}
