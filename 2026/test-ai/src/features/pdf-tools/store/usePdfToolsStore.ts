import { create } from 'zustand'
import { cloneArrayBuffer } from '../lib/pdf-bytes'
import { getPdfPageCount } from '../lib/pdf-split'
import {
  createImageThumbnail,
  createPdfPageThumbnail,
  getImageDimensions,
  revokeObjectUrl,
} from '../lib/thumbnails'
import type {
  SidebarOptions,
  SplitSource,
  ToolMode,
  WorkspaceItem,
} from '../types'
import { DEFAULT_SIDEBAR } from '../types'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png']
const ACCEPTED_PDF_TYPE = 'application/pdf'

function isHeic(file: File): boolean {
  const name = file.name.toLowerCase()
  return (
    name.endsWith('.heic') ||
    name.endsWith('.heif') ||
    file.type === 'image/heic' ||
    file.type === 'image/heif'
  )
}

function isAcceptedImage(file: File): boolean {
  return ACCEPTED_IMAGE_TYPES.includes(file.type)
}

function isAcceptedPdf(file: File): boolean {
  return file.type === ACCEPTED_PDF_TYPE || file.name.toLowerCase().endsWith('.pdf')
}

type PdfToolsState = {
  toolMode: ToolMode
  items: WorkspaceItem[]
  splitSource: SplitSource
  sidebar: SidebarOptions
  isProcessing: boolean
  processingLabel: string | null

  setToolMode: (mode: ToolMode) => void
  addFilesToWorkspace: (files: File[]) => Promise<string | null>
  removeItem: (id: string) => void
  toggleItemSelected: (id: string) => void
  selectAll: (selected: boolean) => void
  reorderItems: (fromIndex: number, toIndex: number) => void
  clearWorkspace: () => void
  setSplitPdf: (file: File) => Promise<string | null>
  clearSplitSource: () => void
  setSidebar: <K extends keyof SidebarOptions>(
    key: K,
    value: SidebarOptions[K],
  ) => void
  setProcessing: (isProcessing: boolean, label?: string | null) => void
  _revokeItemUrls: (item: WorkspaceItem) => void
}

async function expandPdfToItems(
  file: File,
  pdfBytes: ArrayBuffer,
): Promise<WorkspaceItem[]> {
  const storedBytes = cloneArrayBuffer(pdfBytes)
  const pageCount = await getPdfPageCount(storedBytes)
  const sourceId = crypto.randomUUID()
  const items: WorkspaceItem[] = []

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const thumbnailUrl = await createPdfPageThumbnail(storedBytes, pageIndex)
    items.push({
      id: crypto.randomUUID(),
      kind: 'pdf-page',
      sourceFileName: file.name,
      sourceId,
      pageIndex,
      mimeType: ACCEPTED_PDF_TYPE,
      byteLength: file.size,
      dataRef: { type: 'pdf', pdfBytes: storedBytes, pageIndex },
      thumbnailUrl,
      selected: true,
    })
  }

  return items
}

async function fileToImageItem(file: File): Promise<WorkspaceItem> {
  const imageBytes = await file.arrayBuffer()
  const blob = new Blob([imageBytes], { type: file.type })
  const { width, height } = await getImageDimensions(blob)
  const thumbnailUrl = await createImageThumbnail(blob)

  return {
    id: crypto.randomUUID(),
    kind: 'image',
    sourceFileName: file.name,
    sourceId: crypto.randomUUID(),
    pageIndex: null,
    mimeType: file.type,
    byteLength: file.size,
    dataRef: { type: 'image', imageBytes },
    thumbnailUrl,
    selected: true,
    imageWidth: width,
    imageHeight: height,
  }
}

export const usePdfToolsStore = create<PdfToolsState>((set, get) => ({
  toolMode: 'merge',
  items: [],
  splitSource: null,
  sidebar: { ...DEFAULT_SIDEBAR },
  isProcessing: false,
  processingLabel: null,

  setToolMode: (mode) => {
    set({ toolMode: mode })
  },

  _revokeItemUrls: (item) => {
    revokeObjectUrl(item.thumbnailUrl)
  },

  addFilesToWorkspace: async (files) => {
    const { toolMode, items, _revokeItemUrls } = get()
    const newItems: WorkspaceItem[] = []

    for (const file of files) {
      if (isHeic(file)) {
        return 'HEIC/HEIF files are not supported. Please convert to JPG or PNG first.'
      }

      if (toolMode === 'compress' || toolMode === 'images-to-pdf') {
        if (!isAcceptedImage(file)) {
          return 'Only PDF, JPG, and PNG files are supported.'
        }
        newItems.push(await fileToImageItem(file))
        continue
      }

      if (toolMode === 'merge') {
        if (isAcceptedPdf(file)) {
          const pdfBytes = await file.arrayBuffer()
          newItems.push(...(await expandPdfToItems(file, pdfBytes)))
        } else if (isAcceptedImage(file)) {
          newItems.push(await fileToImageItem(file))
        } else {
          return 'Only PDF, JPG, and PNG files are supported.'
        }
      }
    }

    if (newItems.length === 0) {
      return 'Only PDF, JPG, and PNG files are supported.'
    }

    const combined = [...items, ...newItems]
    if (combined.length > 50) {
      newItems.forEach(_revokeItemUrls)
      return 'Large documents may slow down or freeze the browser tab. Consider splitting work into smaller batches.'
    }

    set({ items: combined })
    return null
  },

  removeItem: (id) => {
    const { items, _revokeItemUrls } = get()
    const item = items.find((entry) => entry.id === id)
    if (item) {
      _revokeItemUrls(item)
    }
    set({ items: items.filter((entry) => entry.id !== id) })
  },

  toggleItemSelected: (id) => {
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item,
      ),
    })
  },

  selectAll: (selected) => {
    set({
      items: get().items.map((item) => ({ ...item, selected })),
    })
  },

  reorderItems: (fromIndex, toIndex) => {
    const items = [...get().items]
    const [moved] = items.splice(fromIndex, 1)
    if (!moved) return
    items.splice(toIndex, 0, moved)
    set({ items })
  },

  clearWorkspace: () => {
    const { items, _revokeItemUrls } = get()
    items.forEach(_revokeItemUrls)
    set({ items: [] })
  },

  setSplitPdf: async (file) => {
    if (isHeic(file)) {
      return 'HEIC/HEIF files are not supported. Please convert to JPG or PNG first.'
    }

    if (!isAcceptedPdf(file)) {
      return 'Only PDF, JPG, and PNG files are supported.'
    }

    const { splitSource, clearSplitSource } = get()
    if (splitSource) {
      clearSplitSource()
    }

    const pdfBytes = cloneArrayBuffer(await file.arrayBuffer())
    const pageCount = await getPdfPageCount(pdfBytes)

    if (pageCount > 100) {
      return 'Large documents may slow down or freeze the browser tab. Consider splitting work into smaller batches.'
    }

    const thumbnailUrls: string[] = []
    const maxThumbs = Math.min(pageCount, 5)
    for (let i = 0; i < maxThumbs; i += 1) {
      thumbnailUrls.push(await createPdfPageThumbnail(pdfBytes, i))
    }

    set({
      splitSource: {
        fileName: file.name,
        pdfBytes,
        pageCount,
        thumbnailUrls,
      },
    })

    return null
  },

  clearSplitSource: () => {
    const { splitSource } = get()
    if (splitSource) {
      splitSource.thumbnailUrls.forEach(revokeObjectUrl)
    }
    set({ splitSource: null })
  },

  setSidebar: (key, value) => {
    set({ sidebar: { ...get().sidebar, [key]: value } })
  },

  setProcessing: (isProcessing, label = null) => {
    set({ isProcessing, processingLabel: label })
  },
}))

export { isAcceptedImage, isAcceptedPdf, isHeic, ACCEPTED_IMAGE_TYPES }
