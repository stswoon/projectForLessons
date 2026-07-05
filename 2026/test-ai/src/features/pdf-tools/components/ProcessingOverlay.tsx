import { Loader2 } from 'lucide-react'
import { usePdfToolsStore } from '../store/usePdfToolsStore'

function ProcessingOverlay() {
  const isProcessing = usePdfToolsStore((state) => state.isProcessing)
  const processingLabel = usePdfToolsStore((state) => state.processingLabel)

  if (!isProcessing) return null

  return (
    <div
      className="processing-overlay fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-3 rounded-xl bg-card p-6 shadow-lg">
        <Loader2 className="size-8 animate-spin text-primary" />
        <p className="text-sm font-medium">{processingLabel ?? 'Processing…'}</p>
      </div>
    </div>
  )
}

export default ProcessingOverlay
