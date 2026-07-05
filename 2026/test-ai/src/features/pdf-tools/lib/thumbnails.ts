import { getDocument } from 'pdfjs-dist'
import { toPdfJsData } from './pdf-bytes'

export type ThumbnailOptions = {
  maxEdge?: number
}

export function revokeObjectUrl(url: string | null | undefined): void {
  if (url) {
    URL.revokeObjectURL(url)
  }
}

async function canvasToObjectUrl(
  canvas: HTMLCanvasElement,
  mimeType: string,
  quality?: number,
): Promise<string> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to create thumbnail blob'))
          return
        }
        resolve(URL.createObjectURL(blob))
      },
      mimeType,
      quality,
    )
  })
}

export async function createPdfPageThumbnail(
  pdfBytes: ArrayBuffer,
  pageIndex: number,
  options?: ThumbnailOptions,
): Promise<string> {
  const maxEdge = options?.maxEdge ?? 120
  const pdf = await getDocument({ data: toPdfJsData(pdfBytes) }).promise
  const page = await pdf.getPage(pageIndex + 1)
  const viewport = page.getViewport({ scale: 1 })
  const scale = maxEdge / Math.max(viewport.width, viewport.height)
  const scaledViewport = page.getViewport({ scale })

  const canvas = document.createElement('canvas')
  canvas.width = scaledViewport.width
  canvas.height = scaledViewport.height
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('Canvas context unavailable')
  }

  await page.render({ canvasContext: context, viewport: scaledViewport, canvas }).promise
  return canvasToObjectUrl(canvas, 'image/jpeg', 0.8)
}

export async function createImageThumbnail(
  blob: Blob,
  options?: ThumbnailOptions,
): Promise<string> {
  const maxEdge = options?.maxEdge ?? 120
  const bitmap = await createImageBitmap(blob)
  const scale = maxEdge / Math.max(bitmap.width, bitmap.height)
  const width = Math.round(bitmap.width * scale)
  const height = Math.round(bitmap.height * scale)

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    throw new Error('Canvas context unavailable')
  }

  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()
  return canvasToObjectUrl(canvas, 'image/jpeg', 0.8)
}

export async function getImageDimensions(
  blob: Blob,
): Promise<{ width: number; height: number }> {
  const bitmap = await createImageBitmap(blob)
  const dimensions = { width: bitmap.width, height: bitmap.height }
  bitmap.close()
  return dimensions
}
