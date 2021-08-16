import { assert } from 'chai'
import { createComplexityPlugin } from './'

describe('createComplexityPlugin', () => {
  it('requires', () => {
    assert.equal(typeof createComplexityPlugin, 'function')
  })
})
