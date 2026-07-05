import { useEffect } from 'react'
import { TooltipProvider } from '@/components/ui/tooltip'
import { initPdfJsWorker } from './lib/pdfjs-worker'
import { useFileDrop } from './hooks/useFileDrop'
import { usePdfToolsStore } from './store/usePdfToolsStore'
import ProcessingOverlay from './components/ProcessingOverlay'
import SidebarOptions from './components/SidebarOptions'
import SplitPanel from './components/SplitPanel'
import ToolModeTabs from './components/ToolModeTabs'
import WorkspacePanel from './components/WorkspacePanel'

function PdfToolsApp() {
  const toolMode = usePdfToolsStore((state) => state.toolMode)
  const clearWorkspace = usePdfToolsStore((state) => state.clearWorkspace)
  const clearSplitSource = usePdfToolsStore((state) => state.clearSplitSource)

  const {
    fileInputRef,
    openFilePicker,
    onInputChange,
    onDrop,
    onDragOver,
    accept,
  } = useFileDrop(toolMode)

  useEffect(() => {
    initPdfJsWorker()
  }, [])

  useEffect(() => {
    return () => {
      clearWorkspace()
      clearSplitSource()
    }
  }, [clearSplitSource, clearWorkspace])

  return (
    <TooltipProvider>
      <div className="pdf-tools-app flex min-h-svh flex-col">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-6">
            <h1 className="text-xl font-bold text-primary">PDF Tools</h1>
            <ToolModeTabs />
          </div>
        </header>

        <div className="flex min-h-0 flex-1">
          {toolMode === 'split' ? (
            <SplitPanel
              onAddClick={openFilePicker}
              onDrop={onDrop}
              onDragOver={onDragOver}
            />
          ) : (
            <WorkspacePanel
              onAddClick={openFilePicker}
              onDrop={onDrop}
              onDragOver={onDragOver}
            />
          )}

          <SidebarOptions />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          multiple={toolMode !== 'split'}
          onChange={onInputChange}
        />

        <ProcessingOverlay />
      </div>
    </TooltipProvider>
  )
}

export default PdfToolsApp
