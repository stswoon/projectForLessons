import { getDocument } from 'pdfjs-dist'
import { toPdfJsData } from './pdf-bytes'

export type SplitPageResult = {
  pageIndex: number
  blob: Blob
  width: number
  height: number
}

export type SplitPdfOptions = {
  format: 'png' | 'jpeg'
  quality?: number
  scale?: number
  onProgress?: (current: number, total: number) => void
}

export async function splitPdfToImages(
  pdfBytes: ArrayBuffer,
  options: SplitPdfOptions,
): Promise<SplitPageResult[]> {
  const scale = options.scale ?? 2
  const quality = options.quality ?? 0.92
  const mimeType = options.format === 'png' ? 'image/png' : 'image/jpeg'

  const pdf = await getDocument({ data: toPdfJsData(pdfBytes) }).promise
  const total = pdf.numPages
  const results: SplitPageResult[] = []

  for (let pageNumber = 1; pageNumber <= total; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber)
    const viewport = page.getViewport({ scale })

    const canvas = document.createElement('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('Canvas context unavailable')
    }

    await page.render({ canvasContext: context, viewport, canvas }).promise

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(new Error(`Failed to render page ${pageNumber}`))
            return
          }
          resolve(result)
        },
        mimeType,
        options.format === 'jpeg' ? quality : undefined,
      )
    })

    results.push({
      pageIndex: pageNumber - 1,
      blob,
      width: viewport.width,
      height: viewport.height,
    })

    options.onProgress?.(pageNumber, total)
  }

  return results
}

export async function getPdfPageCount(pdfBytes: ArrayBuffer): Promise<number> {
  const pdf = await getDocument({ data: toPdfJsData(pdfBytes) }).promise
  return pdf.numPages
}
