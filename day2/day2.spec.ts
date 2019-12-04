import { computeSequence } from "./intcode"
import { fileToArray } from "../utils/fileToArray"

const sequence = () => fileToArray('day2/input.txt', s => s.split(',').map(s => parseInt(s, 10)))[0]

describe('Intcode program', () => {
    test('Opcode 1 adds together numbers', () => {
        expect(computeSequence([1, 9, 10, 3, 99, 3, 11, 0, 99, 30, 40, 50])).toEqual([1, 9, 10, 70, 99, 3, 11, 0, 99, 30, 40, 50])
    })
    test('Opcode 2 multiplies together numbers', () => {
        expect(computeSequence([1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50], 4)).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])
    })
    test('Opcode 99 halts', () => {
        expect(computeSequence([99])).toEqual([99])
    })
    test('Unknown opcode should throw an error', () => {
        expect(() => computeSequence([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50])).toThrow(/Unknown opcode 3500/)
    })
    test.each([
        [
            [1, 0, 0, 0, 99],
            [2, 0, 0, 0, 99]
        ],
        [
            [2, 3, 0, 3, 99],
            [2, 3, 0, 6, 99]
        ],
        [
            [2, 4, 4, 5, 99, 0],
            [2, 4, 4, 5, 99, 9801]
        ],
        [
            [1, 1, 1, 4, 99, 5, 6, 0, 99],
            [30, 1, 1, 4, 2, 5, 6, 0, 99]
        ]
    ])(`%p equals %p`, (sequence, expected) => {
        expect(computeSequence(sequence)).toEqual(expected)
    })
    test('compute solution 1', async () => {
        expect(computeSequence(sequence())[0]).toEqual(4484226)
    })
    test('compute solution 2', async () => {
        expect.assertions(1)
        for (let noun = 0; noun < 100; noun++) {
            for (let verb = 0; verb < 100; verb++) {
                const s = [...sequence()]
                s[1] = noun
                s[2] = verb
                if (computeSequence(s)[0] === 19690720) {
                    const solution = 100 * noun + verb
                    expect(solution).toEqual(5696)
                }
            }
        }
    })
})