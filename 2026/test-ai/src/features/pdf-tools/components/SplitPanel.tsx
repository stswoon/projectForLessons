import { Plus, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { usePdfToolsStore } from '../store/usePdfToolsStore'
import DropZone from './DropZone'

type SplitPanelProps = {
  onAddClick: () => void
  onDrop: (event: React.DragEvent) => void
  onDragOver: (event: React.DragEvent) => void
}

function SplitPanel({ onAddClick, onDrop, onDragOver }: SplitPanelProps) {
  const splitSource = usePdfToolsStore((state) => state.splitSource)
  const clearSplitSource = usePdfToolsStore((state) => state.clearSplitSource)
  const isProcessing = usePdfToolsStore((state) => state.isProcessing)

  if (!splitSource) {
    return (
      <div className="split-panel relative flex-1 p-6">
        <DropZone
          mode="split"
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={onAddClick}
        />
      </div>
    )
  }

  return (
    <div
      className="split-panel relative flex flex-1 flex-col bg-muted/50"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div className="flex items-center justify-between gap-2 p-4">
        <div>
          <h2 className="font-medium">{splitSource.fileName}</h2>
          <p className="text-sm text-muted-foreground">
            {splitSource.pageCount} page{splitSource.pageCount === 1 ? '' : 's'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{splitSource.pageCount} pages</Badge>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={clearSplitSource}
            disabled={isProcessing}
          >
            <X className="size-4" />
            Clear
          </Button>
          <Button
            type="button"
            size="icon-lg"
            className="size-14 rounded-full shadow-md"
            onClick={onAddClick}
            disabled={isProcessing}
            aria-label="Replace PDF"
          >
            <Plus className="size-6" />
          </Button>
        </div>
      </div>

      <ScrollArea className="w-full flex-1 px-4 pb-4">
        <div className="flex gap-4 pb-4">
          {splitSource.thumbnailUrls.map((url, index) => (
            <Card key={url} className="w-[160px] shrink-0">
              <CardContent className="p-2">
                <div className="flex h-[180px] items-center justify-center overflow-hidden rounded-md bg-muted">
                  <img
                    src={url}
                    alt={`Page ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Page {index + 1}
                </p>
              </CardContent>
            </Card>
          ))}
          {splitSource.pageCount > splitSource.thumbnailUrls.length && (
            <Card className="flex w-[160px] shrink-0 items-center justify-center">
              <CardContent className="p-2 text-center text-xs text-muted-foreground">
                +{splitSource.pageCount - splitSource.thumbnailUrls.length} more
              </CardContent>
            </Card>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default SplitPanel
