import { DndContext, closestCenter } from '@dnd-kit/core'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { useWorkspaceDnD } from '../hooks/useWorkspaceDnD'
import { usePdfToolsStore } from '../store/usePdfToolsStore'
import DropZone from './DropZone'
import WorkspaceItemCard from './WorkspaceItemCard'

type WorkspacePanelProps = {
  onAddClick: () => void
  onDrop: (event: React.DragEvent) => void
  onDragOver: (event: React.DragEvent) => void
}

function WorkspacePanel({ onAddClick, onDrop, onDragOver }: WorkspacePanelProps) {
  const toolMode = usePdfToolsStore((state) => state.toolMode)
  const items = usePdfToolsStore((state) => state.items)
  const removeItem = usePdfToolsStore((state) => state.removeItem)
  const toggleItemSelected = usePdfToolsStore((state) => state.toggleItemSelected)
  const isProcessing = usePdfToolsStore((state) => state.isProcessing)
  const { sensors, onDragEnd, itemIds } = useWorkspaceDnD()

  const mergeAll = usePdfToolsStore((state) => state.sidebar.mergeAll)
  const showSelection = !mergeAll

  if (items.length === 0) {
    return (
      <div className="workspace-panel relative flex-1 p-6">
        <DropZone
          mode={toolMode}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={onAddClick}
        />
      </div>
    )
  }

  return (
    <div
      className="workspace-panel relative flex flex-1 flex-col bg-muted/50"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div className="flex items-center justify-end gap-2 p-4">
        <Badge variant="secondary">{items.length} items</Badge>
        <Button
          type="button"
          size="icon-lg"
          className="size-14 rounded-full shadow-md"
          onClick={onAddClick}
          disabled={isProcessing}
          aria-label="Add files"
        >
          <Plus className="size-6" />
        </Button>
      </div>

      <ScrollArea className="w-full flex-1 px-4 pb-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext items={itemIds} strategy={horizontalListSortingStrategy}>
            <div className="flex gap-4 pb-4">
              {items.map((item) => (
                <WorkspaceItemCard
                  key={item.id}
                  item={item}
                  showSelection={showSelection}
                  onRemove={removeItem}
                  onToggleSelect={toggleItemSelected}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}

export default WorkspacePanel
