import { FileUp } from 'lucide-react'
import type { ToolMode } from '../types'

type DropZoneProps = {
  mode: ToolMode
  onDrop: (event: React.DragEvent) => void
  onDragOver: (event: React.DragEvent) => void
  onClick: () => void
}

const EMPTY_COPY: Record<ToolMode, string> = {
  merge: 'Drop PDF or image files here, or click to browse',
  split: 'Drop a PDF here to split into images',
  'images-to-pdf': 'Drop JPG or PNG files here, or click to browse',
  compress: 'Drop JPG or PNG files here to compress',
}

function DropZone({ mode, onDrop, onDragOver, onClick }: DropZoneProps) {
  return (
    <button
      type="button"
      className="drop-zone flex min-h-[280px] w-full flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-border bg-background/60 p-8 text-center transition-colors hover:border-primary/50 hover:bg-background"
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={onClick}
    >
      <FileUp className="size-12 text-muted-foreground" />
      <p className="max-w-sm text-sm text-muted-foreground">{EMPTY_COPY[mode]}</p>
    </button>
  )
}

export default DropZone
