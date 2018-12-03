'use strict'

const patch = (left, top, width, height, size = 10, fabric) => {
  if (fabric === undefined) {
    fabric = []
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        fabric[j + (i * size)] = 0
      }
    }
  }

  for (let i = top; i < top + height; i++) {
    for (let j = left; j < left + width; j++) {
      fabric[j + (i * size)] += 1
    }
  }

  return fabric
}

const claimToPatch = (p, fabric, size) => {
  const [, , left, top, width, height] = p.match(/^#([0-9]+) @ ([0-9]+),([0-9]+): ([0-9]+)x([0-9]+)/)
  return patch(+left, +top, +width, +height, fabric ? Math.sqrt(fabric.length) : size, fabric)
}

const overlappingPatches = (patches, size) => {
  let fabric
  patches.forEach(p => {
    fabric = claimToPatch(p, fabric, size)
  })

  return fabric.filter(f => f > 1).length
}

module.exports = {
  overlappingPatches,
  patch,
  claimToPatch
}
