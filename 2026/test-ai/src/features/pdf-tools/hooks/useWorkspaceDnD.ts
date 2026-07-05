import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { usePdfToolsStore } from '../store/usePdfToolsStore'

export function useWorkspaceDnD() {
  const items = usePdfToolsStore((state) => state.items)
  const reorderItems = usePdfToolsStore((state) => state.reorderItems)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex((item) => item.id === active.id)
    const newIndex = items.findIndex((item) => item.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return

    reorderItems(oldIndex, newIndex)
  }

  return { sensors, onDragEnd, itemIds: items.map((item) => item.id) }
}
