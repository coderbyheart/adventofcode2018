export const wireLayer = (directions: string[]): [number, number][] => {
	const wire: [number, number][] = [[0, 0]]
	let pos = [0, 0] as [number, number]
	directions.forEach(direction => {
		const dir = direction[0]
		const d = direction.substr(1)
		const distance = parseInt(d, 10)
		const currentX = pos[0]
		const currentY = pos[1]
		switch (dir) {
			case 'R':
				for (let x = currentX + 1; x <= currentX + distance; x++) {
					pos = [x, currentY]
					wire.push(pos)
				}
				break
			case 'L':
				for (let x = currentX - 1; x >= currentX - distance; x--) {
					pos = [x, currentY]
					wire.push(pos)
				}
				break
			case 'U':
				for (let y = currentY + 1; y <= currentY + distance; y++) {
					pos = [currentX, y]
					wire.push(pos)
				}
				break
			case 'D':
				for (let y = currentY - 1; y >= currentY - distance; y--) {
					pos = [currentX, y]
					wire.push(pos)
				}
				break
		}
	})
	return wire
}