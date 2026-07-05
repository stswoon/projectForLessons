import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import PdfToolsApp from '@/features/pdf-tools/PdfToolsApp'

vi.mock('@/features/pdf-tools/lib/pdfjs-worker', () => ({
  initPdfJsWorker: vi.fn(),
}))

vi.mock('@/features/pdf-tools/lib/pdf-split', () => ({
  getPdfPageCount: vi.fn(async () => 1),
  splitPdfToImages: vi.fn(async () => []),
}))

vi.mock('@/features/pdf-tools/lib/thumbnails', () => ({
  createImageThumbnail: vi.fn(async () => 'blob:image-thumb'),
  createPdfPageThumbnail: vi.fn(async () => 'blob:pdf-thumb'),
  getImageDimensions: vi.fn(async () => ({ width: 100, height: 100 })),
  revokeObjectUrl: vi.fn(),
}))

describe('PdfToolsApp', () => {
  it('renders merge mode by default', () => {
    render(<PdfToolsApp />)

    expect(screen.getByRole('heading', { name: 'PDF Tools' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Merge', selected: true })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Drop PDF or image files here/i }),
    ).toBeInTheDocument()
  })

  it('switches tool mode tabs', async () => {
    const user = userEvent.setup()
    const { container } = render(<PdfToolsApp />)

    const tablist = within(container).getByRole('tablist')
    await user.click(within(tablist).getByRole('tab', { name: 'Split' }))

    expect(within(tablist).getByRole('tab', { name: 'Split', selected: true })).toBeInTheDocument()
    expect(
      within(container).getByRole('button', { name: /Drop a PDF here to split/i }),
    ).toBeInTheDocument()
  })
})
