import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { usePdfToolsStore } from '@/features/pdf-tools/store/usePdfToolsStore'

vi.mock('@/features/pdf-tools/lib/thumbnails', () => ({
  createImageThumbnail: vi.fn(async () => 'blob:image-thumb'),
  createPdfPageThumbnail: vi.fn(async () => 'blob:pdf-thumb'),
  getImageDimensions: vi.fn(async () => ({ width: 100, height: 100 })),
  revokeObjectUrl: vi.fn(),
}))

vi.mock('@/features/pdf-tools/lib/pdf-split', () => ({
  getPdfPageCount: vi.fn(async () => 1),
  splitPdfToImages: vi.fn(async () => []),
}))

const fixturesDir = join(process.cwd(), 'tests', 'fixtures')

function resetStore() {
  usePdfToolsStore.setState({
    toolMode: 'merge',
    items: [],
    splitSource: null,
    sidebar: usePdfToolsStore.getState().sidebar,
    isProcessing: false,
    processingLabel: null,
  })
}

describe('usePdfToolsStore', () => {
  beforeEach(() => {
    resetStore()
  })

  it('adds a PDF to the workspace in merge mode', async () => {
    const pdfBytes = readFileSync(join(fixturesDir, 'sample.pdf'))
    const file = new File([pdfBytes], 'sample.pdf', { type: 'application/pdf' })

    const error = await usePdfToolsStore.getState().addFilesToWorkspace([file])

    expect(error).toBeNull()
    expect(usePdfToolsStore.getState().items).toHaveLength(1)
    expect(usePdfToolsStore.getState().items[0]?.kind).toBe('pdf-page')
  })

  it('rejects unsupported files in images-to-pdf mode', async () => {
    usePdfToolsStore.getState().setToolMode('images-to-pdf')
    const pdfBytes = readFileSync(join(fixturesDir, 'sample.pdf'))
    const file = new File([pdfBytes], 'sample.pdf', { type: 'application/pdf' })

    const error = await usePdfToolsStore.getState().addFilesToWorkspace([file])

    expect(error).toMatch(/Only PDF, JPG, and PNG/)
    expect(usePdfToolsStore.getState().items).toHaveLength(0)
  })

  it('loads split source PDF', async () => {
    usePdfToolsStore.getState().setToolMode('split')
    const pdfBytes = readFileSync(join(fixturesDir, 'sample.pdf'))
    const file = new File([pdfBytes], 'sample.pdf', { type: 'application/pdf' })

    const error = await usePdfToolsStore.getState().setSplitPdf(file)

    expect(error).toBeNull()
    expect(usePdfToolsStore.getState().splitSource?.pageCount).toBe(1)
    expect(usePdfToolsStore.getState().splitSource?.fileName).toBe('sample.pdf')
  })
})
