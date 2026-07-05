export type ToolMode = 'merge' | 'split' | 'images-to-pdf' | 'compress'

export type WorkspaceItemKind = 'pdf-page' | 'image'

export type PageSize = 'a4' | 'letter' | 'fit'
export type Orientation = 'portrait' | 'landscape' | 'auto'
export type MarginPreset = 'none' | 'small' | 'big'
export type ExportFormat = 'png' | 'jpeg'

export type DataRef =
  | { type: 'pdf'; pdfBytes: ArrayBuffer; pageIndex: number }
  | { type: 'image'; imageBytes: ArrayBuffer }

export type WorkspaceItem = {
  id: string
  kind: WorkspaceItemKind
  sourceFileName: string
  sourceId: string
  pageIndex: number | null
  mimeType: string
  byteLength: number
  dataRef: DataRef
  thumbnailUrl: string | null
  selected: boolean
  imageWidth?: number
  imageHeight?: number
}

export type SplitSource = {
  fileName: string
  pdfBytes: ArrayBuffer
  pageCount: number
  thumbnailUrls: string[]
} | null

export type SidebarOptions = {
  orientation: Orientation
  pageSize: PageSize
  margin: MarginPreset
  mergeAll: boolean
  imageQuality: number
  exportFormat: ExportFormat
  maxDimension: number | null
  renderScale: number
}

export const DEFAULT_SIDEBAR: SidebarOptions = {
  orientation: 'auto',
  pageSize: 'a4',
  margin: 'small',
  mergeAll: true,
  imageQuality: 0.85,
  exportFormat: 'png',
  maxDimension: null,
  renderScale: 2,
}

export const PRIMARY_LABELS: Record<ToolMode, string> = {
  merge: 'Merge PDF',
  split: 'Split PDF',
  'images-to-pdf': 'Convert to PDF',
  compress: 'Compress & Download',
}

export const PROCESSING_LABELS: Record<ToolMode, string> = {
  merge: 'Merging…',
  split: 'Splitting…',
  'images-to-pdf': 'Converting…',
  compress: 'Compressing…',
}
