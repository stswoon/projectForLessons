import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

class DOMMatrixMock {
  a = 1
  b = 0
  c = 0
  d = 1
  e = 0
  f = 0

  multiplySelf() {
    return this
  }

  preMultiplySelf() {
    return this
  }

  translateSelf() {
    return this
  }

  scaleSelf() {
    return this
  }
}

vi.stubGlobal('DOMMatrix', DOMMatrixMock)
