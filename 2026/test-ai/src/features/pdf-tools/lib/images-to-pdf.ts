import { PDFDocument, type PDFImage, type PDFPage } from 'pdf-lib'
import type { MarginPreset, Orientation, PageSize, WorkspaceItem } from '../types'

export type ImageInput = {
  bytes: Uint8Array
  mimeType: 'image/jpeg' | 'image/png'
  width: number
  height: number
}

export type ImagesToPdfOptions = {
  orientation: Orientation
  pageSize: PageSize
  margin: MarginPreset
}

const PAGE_SIZES_PT: Record<Exclude<PageSize, 'fit'>, [number, number]> = {
  a4: [595.28, 841.89],
  letter: [612, 792],
}

const MARGIN_PT: Record<MarginPreset, number> = {
  none: 0,
  small: 36,
  big: 72,
}

function resolvePageDimensions(
  imageWidth: number,
  imageHeight: number,
  options: ImagesToPdfOptions,
): { width: number; height: number } {
  const margin = MARGIN_PT[options.margin]

  if (options.pageSize === 'fit') {
    const ptPerPx = 72 / 96
    return {
      width: imageWidth * ptPerPx + margin * 2,
      height: imageHeight * ptPerPx + margin * 2,
    }
  }

  let [width, height] = PAGE_SIZES_PT[options.pageSize]

  if (options.orientation === 'landscape') {
    ;[width, height] = [height, width]
  } else if (options.orientation === 'auto') {
    if (imageWidth > imageHeight) {
      ;[width, height] = [height, width]
    }
  }

  return { width, height }
}

function drawImageOnPage(
  page: PDFPage,
  image: { width: number; height: number },
  embedded: PDFImage,
  margin: number,
): void {
  const pageWidth = page.getWidth()
  const pageHeight = page.getHeight()
  const availableWidth = pageWidth - margin * 2
  const availableHeight = pageHeight - margin * 2

  const scale = Math.min(
    availableWidth / image.width,
    availableHeight / image.height,
    1,
  )

  const drawWidth = image.width * scale
  const drawHeight = image.height * scale
  const x = margin + (availableWidth - drawWidth) / 2
  const y = margin + (availableHeight - drawHeight) / 2

  page.drawImage(embedded, {
    x,
    y,
    width: drawWidth,
    height: drawHeight,
  })
}

export async function embedImageOnNewPage(
  doc: PDFDocument,
  input: ImageInput,
  options: ImagesToPdfOptions,
): Promise<void> {
  const margin = MARGIN_PT[options.margin]
  const { width, height } = resolvePageDimensions(input.width, input.height, options)
  const page = doc.addPage([width, height])

  const embedded =
    input.mimeType === 'image/jpeg'
      ? await doc.embedJpg(input.bytes)
      : await doc.embedPng(input.bytes)

  drawImageOnPage(
    page,
    { width: input.width, height: input.height },
    embedded,
    margin,
  )
}

export async function imagesToPdf(
  images: ImageInput[],
  options: ImagesToPdfOptions,
): Promise<Uint8Array> {
  const doc = await PDFDocument.create()

  for (const image of images) {
    await embedImageOnNewPage(doc, image, options)
  }

  return doc.save()
}

export async function mergeWorkspaceToPdf(
  items: WorkspaceItem[],
  options: ImagesToPdfOptions,
): Promise<Uint8Array> {
  const doc = await PDFDocument.create()

  for (const item of items) {
    if (item.kind === 'pdf-page' && item.dataRef.type === 'pdf') {
      const source = await PDFDocument.load(item.dataRef.pdfBytes)
      const [copiedPage] = await doc.copyPages(source, [item.dataRef.pageIndex])
      doc.addPage(copiedPage)
      continue
    }

    if (item.kind === 'image' && item.dataRef.type === 'image') {
      const mimeType =
        item.mimeType === 'image/png' ? 'image/png' : 'image/jpeg'
      const width = item.imageWidth ?? 800
      const height = item.imageHeight ?? 600

      await embedImageOnNewPage(
        doc,
        {
          bytes: new Uint8Array(item.dataRef.imageBytes),
          mimeType,
          width,
          height,
        },
        options,
      )
    }
  }

  return doc.save()
}

export async function imageBytesToInput(
  bytes: ArrayBuffer,
  mimeType: string,
): Promise<ImageInput> {
  const blob = new Blob([bytes], { type: mimeType })
  const bitmap = await createImageBitmap(blob)
  const input: ImageInput = {
    bytes: new Uint8Array(bytes),
    mimeType: mimeType === 'image/png' ? 'image/png' : 'image/jpeg',
    width: bitmap.width,
    height: bitmap.height,
  }
  bitmap.close()
  return input
}
