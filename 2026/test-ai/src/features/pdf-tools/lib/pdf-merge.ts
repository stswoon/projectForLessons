import { PDFDocument } from 'pdf-lib'

export type PdfPageRef = {
  pdfBytes: ArrayBuffer
  pageIndex: number
}

export async function mergePdfPagesInOrder(
  pages: PdfPageRef[],
): Promise<Uint8Array> {
  const doc = await PDFDocument.create()

  for (const pageRef of pages) {
    const source = await PDFDocument.load(pageRef.pdfBytes)
    const [copiedPage] = await doc.copyPages(source, [pageRef.pageIndex])
    doc.addPage(copiedPage)
  }

  return doc.save()
}
