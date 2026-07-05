import { toast } from 'sonner'
import { compressImage } from '../lib/image-compress'
import { imageBytesToInput, imagesToPdf, mergeWorkspaceToPdf } from '../lib/images-to-pdf'
import { downloadBlob, downloadUint8Array } from '../lib/download'
import { splitPdfToImages } from '../lib/pdf-split'
import { usePdfToolsStore } from '../store/usePdfToolsStore'
import { PRIMARY_LABELS, PROCESSING_LABELS } from '../types'
import type { WorkspaceItem } from '../types'

function getBaseName(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.')
  return dotIndex > 0 ? fileName.slice(0, dotIndex) : fileName
}

function getActiveItems(
  items: WorkspaceItem[],
  mergeAll: boolean,
): WorkspaceItem[] {
  return mergeAll ? items : items.filter((item) => item.selected)
}

export function usePdfOperations() {
  const toolMode = usePdfToolsStore((state) => state.toolMode)
  const items = usePdfToolsStore((state) => state.items)
  const splitSource = usePdfToolsStore((state) => state.splitSource)
  const sidebar = usePdfToolsStore((state) => state.sidebar)
  const setProcessing = usePdfToolsStore((state) => state.setProcessing)

  const runPrimaryAction = async () => {
    try {
      setProcessing(true, PROCESSING_LABELS[toolMode])

      if (toolMode === 'split') {
        if (!splitSource) {
          toast.error('Add a PDF to split')
          return
        }

        const pages = await splitPdfToImages(splitSource.pdfBytes, {
          format: sidebar.exportFormat,
          quality: sidebar.imageQuality,
          scale: sidebar.renderScale,
          onProgress: (current, total) => {
            setProcessing(true, `Rendering page ${current} of ${total}…`)
          },
        })

        const baseName = getBaseName(splitSource.fileName)
        const ext = sidebar.exportFormat === 'jpeg' ? 'jpg' : 'png'

        for (const page of pages) {
          downloadBlob(
            page.blob,
            `${baseName}-page-${page.pageIndex + 1}.${ext}`,
          )
        }

        toast.success('Split complete', {
          description: `${pages.length} file(s) downloaded`,
        })
        return
      }

      if (toolMode === 'merge') {
        const activeItems = getActiveItems(items, sidebar.mergeAll)
        if (activeItems.length === 0) {
          toast.error('Add files to merge')
          return
        }

        const pdfBytes = await mergeWorkspaceToPdf(activeItems, {
          orientation: sidebar.orientation,
          pageSize: sidebar.pageSize,
          margin: sidebar.margin,
        })

        downloadUint8Array(pdfBytes, 'merged.pdf', 'application/pdf')
        toast.success('Merge complete', {
          description: 'Your merged PDF has been downloaded',
        })
        return
      }

      if (toolMode === 'images-to-pdf') {
        const activeItems = getActiveItems(items, sidebar.mergeAll)
        if (activeItems.length === 0) {
          toast.error('Add images to convert')
          return
        }

        const imageInputs = await Promise.all(
          activeItems.map(async (item) => {
            if (item.dataRef.type !== 'image') {
              throw new Error('Images to PDF mode requires image files')
            }
            return imageBytesToInput(item.dataRef.imageBytes, item.mimeType)
          }),
        )

        const pdfBytes = await imagesToPdf(imageInputs, {
          orientation: sidebar.orientation,
          pageSize: sidebar.pageSize,
          margin: sidebar.margin,
        })

        downloadUint8Array(pdfBytes, 'converted.pdf', 'application/pdf')
        toast.success('Conversion complete', {
          description: 'Your PDF has been downloaded',
        })
        return
      }

      if (toolMode === 'compress') {
        const activeItems = getActiveItems(items, sidebar.mergeAll)
        if (activeItems.length === 0) {
          toast.error('Add images to compress')
          return
        }

        for (const item of activeItems) {
          if (item.dataRef.type !== 'image') continue

          const blob = new Blob([item.dataRef.imageBytes], { type: item.mimeType })
          const format = item.mimeType === 'image/png' && sidebar.exportFormat === 'png'
            ? 'png'
            : 'jpeg'

          const result = await compressImage(blob, {
            format,
            quality: sidebar.imageQuality,
            maxDimension: sidebar.maxDimension,
          })

          const baseName = getBaseName(item.sourceFileName)
          const ext = format === 'jpeg' ? 'jpg' : 'png'
          downloadBlob(result.blob, `${baseName}-compressed.${ext}`)
        }

        toast.success('Compression complete', {
          description: `${activeItems.length} file(s) downloaded`,
        })
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Processing failed'
      toast.error('Processing failed', { description: message })
    } finally {
      setProcessing(false, null)
    }
  }

  const canSubmit = (() => {
    if (toolMode === 'split') return splitSource !== null
    if (items.length === 0) return false
    const activeItems = getActiveItems(items, sidebar.mergeAll)
    return activeItems.length > 0
  })()

  return {
    runPrimaryAction,
    canSubmit,
    primaryLabel: PRIMARY_LABELS[toolMode],
  }
}
