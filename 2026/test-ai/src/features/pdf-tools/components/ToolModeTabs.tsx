import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePdfToolsStore } from '../store/usePdfToolsStore'
import type { ToolMode } from '../types'

const TABS: { value: ToolMode; label: string }[] = [
  { value: 'merge', label: 'Merge' },
  { value: 'split', label: 'Split' },
  { value: 'images-to-pdf', label: 'Images to PDF' },
  { value: 'compress', label: 'Compress' },
]

function ToolModeTabs() {
  const toolMode = usePdfToolsStore((state) => state.toolMode)
  const setToolMode = usePdfToolsStore((state) => state.setToolMode)
  const isProcessing = usePdfToolsStore((state) => state.isProcessing)

  return (
    <Tabs
      value={toolMode}
      onValueChange={(value) => setToolMode(value as ToolMode)}
    >
      <TabsList className="h-10">
        {TABS.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            disabled={isProcessing}
            className="px-4"
          >
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}

export default ToolModeTabs
