import { suite, test, slow, timeout, skip, only } from 'mocha-typescript'
import { assert } from 'chai'
import { pos, Position } from '../src/Game/Position'
import SnakeMap from '../src/Game/SnakeMap'
import { Snake } from '../src/Game/Snake'
import Game from '../src/Game/Game'

@suite class GameTest {

    private largeEmptyMap: SnakeMap =  new SnakeMap([
        '.d..................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
        '....................',
    ])

    private smallMap: SnakeMap = new SnakeMap([
        'XXXXX',
        'X.X.X',
        'X...X',
        'X...X',
        'Xu..X',
        'XXXXX',
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
        const game = Game.start(this.largeEmptyMap, this.placerMock54)
        assert.equal(20, game.map.height)
        for (let i = 0; i < 4; ++i) {
            game.step()
        }
        assert.equal(5, game.snake.length)
        assert.isTrue(pos(5, 2).equals(game.snake.head))
        game.step()
        assert.equal(5, game.snake.length)
        assert.isTrue(pos(6, 2).equals(game.snake.head))
        assert.isTrue(pos(2, 2).equals(game.snake.tail))
        for (let i = 0; i < 4; ++i) {
            game.step()
        }
        assert.equal(0, game.growth)
        assert.equal(5, game.snake.length)
    }

    @test public turn() {
        const game = Game.start(this.smallMap, this.placerMock54).step()
        game.turn('r').step()
        assert.isTrue(pos(4, 3).equals(game.snake.head))
        game.turn('u').step()
        assert.isTrue(pos(3, 3).equals(game.snake.head))
    }

    @test public turnsInOneRound() {
        const game = Game.start(this.smallMap, this.placerMock54).step()
        game.turn('r').turn('u').step().step()
        assert.isTrue(pos(3, 3).equals(game.snake.head))
    }

    @test public dontHandleTurnIfSameAsPrevious() {
        const game = Game.start(this.smallMap, this.placerMock54).step()
        game.turn('r').turn('r').turn('u').step().step()
        assert.isTrue(pos(3, 3).equals(game.snake.head))
    }

    @test public dontAllowOppositeDirection() {
        const game = Game.start(this.smallMap, this.placerMock54)
        game.turn('d').step()
        assert.isTrue(pos(4, 2).equals(game.snake.head))
    }

    @test public goThroughWall() {
        const game = Game.start(this.largeEmptyMap, this.placerMock54)
        game.turn('r').turn('u').step().step()
        assert.isTrue(pos(20, 3).equals(game.snake.head))
    }

    @test public deathOnObstacle() {
        const game = Game.start(this.smallMap, this.placerMock54)
        game.turn('l').step()
        assert.isTrue(game.end)
        assert.isTrue(pos(5, 2).equals(game.snake.head))
    }

    @test public deathOnItself() {
        const pills = [
            pos(5, 4),
            pos(4, 2)
        ]
        const game = Game.start(this.smallMap, (g) => pills.pop())
        game.step()
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
        const game = Game.start(this.largeEmptyMap, this.placerMock72)
        game.step()
        assert.isTrue(pos(7, 2).equals(game.pill))
    }

    @test public dontPlacePillOnSnake() {
        const pills = [
            pos(5, 2),
            pos(2, 2)
        ]
        const game = Game.start(this.smallMap, (g) => pills.pop())
        game.step()
        assert.isTrue(pos(2, 2).equals(game.pill))
    }

    @test public dontPlacePillOnObstacle() {
        const pills = [
            pos(1, 2),
            pos(2, 2)
        ]
        const game = Game.start(this.smallMap, (g) => pills.pop())
        game.step()
        assert.isTrue(pos(2, 2).equals(game.pill))
    }

    @test public eatPill() {
        const pills = [
            pos(6, 3),
            pos(7, 2)
        ]
        const game = Game.start(this.largeEmptyMap, (g) => pills.pop())
        for (let i = 0; i < 6; ++i) {
            game.step()
        }
        assert.isTrue(pos(7, 2).equals(game.snake.head))
        assert.equal(2, game.growth)
        assert.equal(6, game.snake.length)
        assert.isTrue(pos(6, 3).equals(game.pill))
    }

    @test public dontBiteOwnTail() {
        const pills = [
            pos(8, 8),
            pos(3, 2)
        ]
        const game = Game.start(this.largeEmptyMap, (g) => pills.pop())
        for (let i = 0; i < 10; ++i) {
            game.step()
        }
        game.turn('r').turn('u')
        for (let i = 0; i < 4; ++i) {
            game.step()
        }
        game.turn('l').step()
        assert.isFalse(game.end)
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

}
