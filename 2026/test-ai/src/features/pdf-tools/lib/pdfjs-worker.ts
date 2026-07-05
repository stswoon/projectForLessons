import { GlobalWorkerOptions } from 'pdfjs-dist'
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

export function initPdfJsWorker(): void {
  GlobalWorkerOptions.workerSrc = workerUrl
}
