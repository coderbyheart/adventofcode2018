'use strict'

/* global describe, it, test, expect  */

const { readFileSync } = require('fs')
const input = readFileSync('./day16.txt', 'utf-8')

const addr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) + (reg[B] || 0)
  return reg
}
const addi = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) + B
  return reg
}
const mulr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) * (reg[B] || 0)
  return reg
}
const muli = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) * B
  return reg
}
const banr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) & (reg[B] || 0)
  return reg
}
const bani = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) & B
  return reg
}
const borr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) | (reg[B] || 0)
  return reg
}
const bori = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) | B
  return reg
}
const setr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0)
  return reg
}
const seti = (A, B, C, reg) => {
  reg[C] = A
  return reg
}
const gtir = (A, B, C, reg) => {
  reg[C] = A > (reg[B] || 0) ? 1 : 0
  return reg
}
const gtri = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) > B ? 1 : 0
  return reg
}
const gtrr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) > (reg[B] || 0) ? 1 : 0
  return reg
}
const eqir = (A, B, C, reg) => {
  reg[C] = A === (reg[B] || 0) ? 1 : 0
  return reg
}
const eqri = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) === B ? 1 : 0
  return reg
}
const eqrr = (A, B, C, reg) => {
  reg[C] = (reg[A] || 0) === (reg[B] || 0) ? 1 : 0
  return reg
}

describe('opcodes', () => {
  describe('Addition', () => {
    describe('addr (add register)', () => {
      it('stores into register C the result of adding register A and register B.', () => {
        expect(addr(0, 1, 2, [7, 11])).toEqual([7, 11, 18])
      })
    })

    describe('addi (add immediate)', () => {
      it('stores into register C the result of adding register A and value B.', () => {
        expect(addi(0, 4, 0, [3])).toEqual([7])
        expect(addi(2, 1, 2, [3, 2, 1, 1])).toEqual([3, 2, 2, 1])
      })
    })
  })
  describe('Multiplication', () => {
    describe('mulr (multiply register)', () => {
      it('stores into register C the result of multiplying register A and register B.', () => {
        expect(mulr(0, 1, 2, [7, 11])).toEqual([7, 11, 77])
        expect(mulr(2, 1, 2, [3, 2, 1, 1])).toEqual([3, 2, 2, 1])
      })
    })
    describe('muli (multiply immediate)', () => {
      it('stores into register C the result of multiplying register A and value B.', () => {
        expect(muli(0, 7, 1, [11])).toEqual([11, 77])
      })
    })
  })
  describe('Bitwise AND', () => {
    describe('banr (bitwise AND register)', () => {
      it('stores into register C the result of the bitwise AND of register A and register B.', () => {
        expect(banr(0, 1, 2, [7, 11])).toEqual([7, 11, 7 & 11])
      })
    })
    describe('bani (bitwise AND immediate)', () => {
      it('stores into register C the result of the bitwise AND of register A and value B.', () => {
        expect(bani(0, 7, 1, [11])).toEqual([11, 7 & 11])
      })
    })
  })
  describe('Bitwise OR', () => {
    describe('borr (bitwise OR register)', () => {
      it('stores into register C the result of the bitwise OR of register A and register B.', () => {
        expect(borr(0, 1, 2, [7, 11])).toEqual([7, 11, 7 | 11])
      })
    })
    describe('bori (bitwise OR immediate)', () => {
      it('stores into register C the result of the bitwise OR of register A and value B.', () => {
        expect(bori(0, 7, 1, [11])).toEqual([11, 7 | 11])
      })
    })
  })
  describe('Assignment', () => {
    describe('setr (set register)', () => {
      it('copies the contents of register A into register C. (Input B is ignored.)', () => {
        expect(setr(0, 9, 1, [7])).toEqual([7, 7])
      })
    })
    describe('seti (set immediate)', () => {
      it('stores value A into register C. (Input B is ignored.)', () => {
        expect(seti(7, 9, 0, [])).toEqual([7])
        expect(seti(2, 1, 2, [3, 2, 1, 1])).toEqual([3, 2, 2, 1])
      })
    })
  })
  describe('Greater-than testing', () => {
    describe('gtir (greater-than immediate/register)', () => {
      it('sets register C to 1 if value A is greater than register B. Otherwise, register C is set to 0.', () => {
        expect(gtir(8, 0, 1, [7])).toEqual([7, 1])
        expect(gtir(7, 0, 1, [7])).toEqual([7, 0])
      })
    })
    describe('gtri (greater-than register/immediate)', () => {
      it('sets register C to 1 if register A is greater than value B. Otherwise, register C is set to 0.', () => {
        expect(gtri(0, 7, 1, [8])).toEqual([8, 1])
        expect(gtri(0, 7, 1, [7])).toEqual([7, 0])
      })
    })
    describe('gtrr (greater-than register/register)', () => {
      it('sets register C to 1 if register A is greater than register B. Otherwise, register C is set to 0.', () => {
        expect(gtrr(0, 1, 2, [8, 7])).toEqual([8, 7, 1])
        expect(gtrr(0, 1, 2, [7, 7])).toEqual([7, 7, 0])
      })
    })
  })
  describe('Equality testing', () => {
    describe('eqir (equal immediate/register)', () => {
      it('sets register C to 1 if value A is equal to register B. Otherwise, register C is set to 0.', () => {
        expect(eqir(7, 0, 1, [7])).toEqual([7, 1])
        expect(eqir(8, 0, 1, [7])).toEqual([7, 0])
      })
    })
    describe('eqri (equal register/immediate)', () => {
      it('sets register C to 1 if register A is equal to value B. Otherwise, register C is set to 0.', () => {
        expect(eqri(0, 7, 1, [7])).toEqual([7, 1])
        expect(eqri(0, 7, 1, [8])).toEqual([8, 0])
      })
    })
    describe('eqrr (equal register/register)', () => {
      it('sets register C to 1 if register A is equal to register B. Otherwise, register C is set to 0.', () => {
        expect(eqrr(0, 1, 2, [7, 7])).toEqual([7, 7, 1])
        expect(eqrr(0, 1, 2, [8, 7])).toEqual([8, 7, 0])
      })
    })
  })
})

const opcodes = {
  'addr': addr,
  'addi': addi,
  'mulr': mulr,
  'muli': muli,
  'banr': banr,
  'bani': bani,
  'borr': borr,
  'bori': bori,
  'setr': setr,
  'seti': seti,
  'gtir': gtir,
  'gtri': gtri,
  'gtrr': gtrr,
  'eqir': eqir,
  'eqri': eqri,
  'eqrr': eqrr
}

const equals = (a, b) => a.length === b.length && a.reduce((equal, v, k) => equal ? v === b[k] : equal, true)

const findMatchingOpcodes = (before, [A, B, C], after) => Object.keys(opcodes).filter(opcode => equals(opcodes[opcode](A, B, C, [...before]), after)).sort((a, b) => a > b ? 1 : -1)

describe('equals', () => {
  it('should compare registers', () => {
    expect(equals([], [])).toEqual(true)
    expect(equals([1, 2, 3], [1, 2, 3])).toEqual(true)
    expect(equals([1, 2, 3], [1, 2, 2])).toEqual(false)
    expect(equals([1, 2, 3], [1, 2, 3, 4])).toEqual(false)
  })
})

describe('findMatchingOpcodes', () => {
  it('should match mulr, addi, seti for example', () => {
    expect(findMatchingOpcodes(
      [3, 2, 1, 1],
      [2, 1, 2],
      [3, 2, 2, 1]
    )).toEqual([
      'addi',
      'mulr',
      'seti'
    ])
  })
})

const findOpcodeNumbers = input => {
  // Count how often they are matched
  const opcodeMatches = input
    .split('\n\n')
    .filter(s => /^Before:/.test(s))
    .map(s => {
      const [before, opWithInput, after] = s.split('\n')
      const op = JSON.parse(`[${opWithInput.replace(/ /g, ',')}]`)
      const [opNumber, ...values] = op
      return [
        opNumber,
        findMatchingOpcodes(
          JSON.parse(before.replace(/Before: /, '')),
          values,
          JSON.parse(after.replace(/After: /, ''))
        )
      ]
    })
  const opStats = opcodeMatches
    .reduce((opStats, [opNumber, matches]) => {
      if (!opStats[opNumber]) {
        opStats[opNumber] = {}
      }
      matches.forEach(match => {
        if (!opStats[opNumber][match]) {
          opStats[opNumber][match] = 1
        } else {
          opStats[opNumber][match]++
        }
      })
      return opStats
    }, {})
  return flattenOpStats(opStats)
}

// Figure out which number is which op by exclusion
const flattenOpStats = (opStats, opNumbers = {}) => {
  // we are done if all are of length 0
  if (Object.keys(opStats).filter(key => Object.keys(opStats[key]).length === 0).length === Object.keys(opStats).length) {
    return opNumbers
  }
  // Find the opStats which only have one candidate left
  const onlyOneMatch = Object.keys(opStats)
    .filter(key => Object.keys(opStats[key]).length === 1)
    .reduce((opNumbers, opCode) => {
      opNumbers[opCode] = Object.keys(opStats[opCode])[0]
      return opNumbers
    }, {})
  // remove the known ops from the opStats
  Object.keys(opStats).forEach(key => {
    Object.keys(onlyOneMatch).forEach(knownOp => {
      delete opStats[key][onlyOneMatch[knownOp]]
    })
  })
  return flattenOpStats(opStats, {
    ...opNumbers,
    ...onlyOneMatch
  })
}

describe('findOpcodeNumbers', () => {
  it('should find the ops for the numbers', () => {
    expect(findOpcodeNumbers(input.split('\n\n\n')[0])).toEqual({
      '0': 'muli',
      '1': 'borr',
      '2': 'gtri',
      '3': 'eqri',
      '4': 'gtrr',
      '5': 'eqir',
      '6': 'addi',
      '7': 'setr',
      '8': 'mulr',
      '9': 'addr',
      '10': 'bori',
      '11': 'bani',
      '12': 'seti',
      '13': 'eqrr',
      '14': 'banr',
      '15': 'gtir'
    })
  })
})

describe('Chronal Classification', () => {
  it('should solve the puzzle', () => {
    expect(input
      .split('\n\n')
      .filter(s => /^Before:/.test(s))
      .filter(s => {
        const [before, opWithInput, after] = s.split('\n')
        const op = JSON.parse(`[${opWithInput.replace(/ /g, ',')}]`)
        const [opNumber, ...values] = op
        return findMatchingOpcodes(
          JSON.parse(before.replace(/Before: /, '')),
          values,
          JSON.parse(after.replace(/After: /, ''))
        ).length >= 3
      })).toHaveLength(563)
  })
  it('should match the opcodes', () => {
    // FIXME: Implement exclusion

    const [samples, program] = input.split('\n\n\n')

    const numberedOps = findOpcodeNumbers(samples)

    const register = [0]
    program
      .split('\n')
      .filter(s => s.length)
      .forEach(opWithInput => {
        const op = JSON.parse(`[${opWithInput.replace(/ /g, ',')}]`)
        const [opNumber, ...values] = op
        opcodes[numberedOps[opNumber]](...values, register)
      })
    expect(register[0]).toEqual(629)
  })
})