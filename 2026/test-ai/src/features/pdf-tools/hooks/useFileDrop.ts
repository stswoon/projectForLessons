import { useCallback, useRef } from 'react'
import { toast } from 'sonner'
import { usePdfToolsStore } from '../store/usePdfToolsStore'
import type { ToolMode } from '../types'

export function useFileDrop(mode: ToolMode) {
  const addFilesToWorkspace = usePdfToolsStore((state) => state.addFilesToWorkspace)
  const setSplitPdf = usePdfToolsStore((state) => state.setSplitPdf)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList)
      if (files.length === 0) return

      try {
        if (mode === 'split') {
          const error = await setSplitPdf(files[0]!)
          if (error) {
            toast.error('Unsupported file', { description: error })
          }
          return
        }

        const error = await addFilesToWorkspace(files)
        if (error) {
          toast.error('Unsupported file', { description: error })
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Failed to add files'
        toast.error('Could not add files', { description: message })
      }
    },
    [addFilesToWorkspace, mode, setSplitPdf],
  )

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        void handleFiles(event.target.files)
        event.target.value = ''
      }
    },
    [handleFiles],
  )

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      if (event.dataTransfer.files.length > 0) {
        void handleFiles(event.dataTransfer.files)
      }
    },
    [handleFiles],
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'copy'
  }, [])

  const accept =
    mode === 'split'
      ? 'application/pdf,.pdf'
      : mode === 'merge'
        ? 'application/pdf,.pdf,image/jpeg,image/png,.jpg,.jpeg,.png'
        : 'image/jpeg,image/png,.jpg,.jpeg,.png'

  return {
    fileInputRef,
    openFilePicker,
    onInputChange,
    onDrop,
    onDragOver,
    accept,
    handleFiles,
  }
}
