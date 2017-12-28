import { suite, test, slow, timeout, skip, only } from 'mocha-typescript'
import { assert } from 'chai'
import { Snake } from '../src/Snake'

@suite class SudokuTest {

    @test "creation"() {
        let snake = new Snake()
        assert.isDefined(snake)
    }

}