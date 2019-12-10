import {
	findBestAsteroidForMonitoringStation,
	trackAsteroids,
	getAsteroidsInField,
	mapToField,
	calculateVaporization,
} from './findBestAsteroidForMonitoringStation'

const map = `
.###..#......###..#...#
#.#..#.##..###..#...#.#
#.#.#.##.#..##.#.###.##
.#..#...####.#.##..##..
#.###.#.####.##.#######
..#######..##..##.#.###
.##.#...##.##.####..###
....####.####.#########
#.########.#...##.####.
.#.#..#.#.#.#.##.###.##
#..#.#..##...#..#.####.
.###.#.#...###....###..
###..#.###..###.#.###.#
...###.##.#.##.#...#..#
#......#.#.##..#...#.#.
###.##.#..##...#..#.#.#
###..###..##.##..##.###
###.###.####....######.
.###.#####.#.#.#.#####.
##.#.###.###.##.##..##.
##.#..#..#..#.####.#.#.
.#.#.#.##.##########..#
#####.##......#.#.####.
`

const width = 23

describe('Day 10: Part 1', () => {
	it(`calculate the solution`, () => {
		expect(findBestAsteroidForMonitoringStation(map, width)).toEqual([
			19,
			11,
			230,
		])
	})
})

describe('Day 10: Part 2', () => {
	it(`calculate the solution`, () => {
		const planOfAttack = calculateVaporization(
			trackAsteroids(getAsteroidsInField(mapToField(map), width), [19, 11]),
		)
		const { asteroid: asteroid200 } = planOfAttack[199]
		expect(asteroid200[0] * 100 + asteroid200[1]).toEqual(1205)
	})
})
