import { describe, expect, it } from 'vitest'
import { cloneArrayBuffer, toPdfJsData } from '@/features/pdf-tools/lib/pdf-bytes'

describe('pdf-bytes', () => {
  it('cloneArrayBuffer returns an independent copy', () => {
    const original = new Uint8Array([1, 2, 3]).buffer
    const copy = cloneArrayBuffer(original)

    expect(copy).not.toBe(original)
    expect(new Uint8Array(copy)).toEqual(new Uint8Array([1, 2, 3]))
  })

  it('toPdfJsData keeps the source buffer attached after repeated use', () => {
    const original = new Uint8Array([4, 5, 6]).buffer

    toPdfJsData(original)
    toPdfJsData(original)

    expect(original.byteLength).toBe(3)
    expect(() => new Uint8Array(original)).not.toThrow()
  })
})
