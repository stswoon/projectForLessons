import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import type { WorkspaceItem } from '../types'

type WorkspaceItemCardProps = {
  item: WorkspaceItem
  showSelection: boolean
  onRemove: (id: string) => void
  onToggleSelect: (id: string) => void
}

function WorkspaceItemCard({
  item,
  showSelection,
  onRemove,
  onToggleSelect,
}: WorkspaceItemCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const label =
    item.kind === 'pdf-page'
      ? `${item.sourceFileName} (p.${(item.pageIndex ?? 0) + 1})`
      : item.sourceFileName

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`workspace-item-card w-[160px] shrink-0 overflow-hidden ${isDragging ? 'opacity-50' : ''}`}
    >
      <CardContent className="relative p-2">
        <div className="absolute top-1 right-1 z-10 flex gap-1">
          {showSelection && (
            <Checkbox
              checked={item.selected}
              onCheckedChange={() => onToggleSelect(item.id)}
              aria-label={`Select ${label}`}
              className="bg-background"
            />
          )}
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  className="bg-background/80"
                  onClick={() => onRemove(item.id)}
                  aria-label={`Remove ${label}`}
                >
                  <X />
                </Button>
              }
            />
            <TooltipContent>Remove</TooltipContent>
          </Tooltip>
        </div>

        <button
          type="button"
          className="absolute top-1 left-1 z-10 cursor-grab rounded bg-background/80 p-0.5 active:cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label={`Drag to reorder ${label}`}
        >
          <GripVertical className="size-4 text-muted-foreground" />
        </button>

        <div className="flex h-[180px] items-center justify-center overflow-hidden rounded-md bg-muted">
          {item.thumbnailUrl ? (
            <img
              src={item.thumbnailUrl}
              alt={label}
              className="max-h-full max-w-full object-contain"
            />
          ) : (
            <div className="h-full w-full animate-pulse bg-muted-foreground/10" />
          )}
        </div>

        <p className="mt-2 truncate text-xs text-muted-foreground" title={label}>
          {label}
        </p>

        {item.kind === 'pdf-page' && (
          <Badge variant="secondary" className="mt-1 text-[10px]">
            Vector
          </Badge>
        )}
        {item.kind === 'image' && (
          <Badge variant="outline" className="mt-1 text-[10px]">
            Image
          </Badge>
        )}
      </CardContent>
    </Card>
  )
}

export default WorkspaceItemCard
