import { ArrowRightCircle, ChevronDown, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Slider } from '@/components/ui/slider'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { usePdfOperations } from '../hooks/usePdfOperations'
import { usePdfToolsStore } from '../store/usePdfToolsStore'
import type { ExportFormat, MarginPreset, Orientation, PageSize, ToolMode } from '../types'
import LimitationsCallout from './LimitationsCallout'

const OPTIONS_TITLES: Record<ToolMode, string> = {
  merge: 'Merge PDF options',
  split: 'Split PDF options',
  'images-to-pdf': 'Image to PDF options',
  compress: 'Compress options',
}

function SidebarOptions() {
  const toolMode = usePdfToolsStore((state) => state.toolMode)
  const sidebar = usePdfToolsStore((state) => state.sidebar)
  const setSidebar = usePdfToolsStore((state) => state.setSidebar)
  const isProcessing = usePdfToolsStore((state) => state.isProcessing)
  const clearWorkspace = usePdfToolsStore((state) => state.clearWorkspace)
  const items = usePdfToolsStore((state) => state.items)
  const { runPrimaryAction, canSubmit, primaryLabel } = usePdfOperations()

  const showPdfOptions = toolMode === 'merge' || toolMode === 'images-to-pdf'
  const showExportFormat = toolMode === 'split' || toolMode === 'compress'
  const showQuality = toolMode === 'split' || toolMode === 'compress'
  const showRenderScale = toolMode === 'split'
  const showMaxDimension = toolMode === 'compress'
  const showMergeAll = toolMode !== 'split'

  return (
    <aside className="sidebar-options flex w-[320px] shrink-0 flex-col border-l bg-card">
      <div className="flex-1 space-y-5 overflow-y-auto p-5">
        <h2 className="text-lg font-semibold">{OPTIONS_TITLES[toolMode]}</h2>

        {showPdfOptions && (
          <>
            <div className="space-y-2">
              <Label>Page orientation</Label>
              <ToggleGroup
                value={[sidebar.orientation === 'auto' ? 'portrait' : sidebar.orientation]}
                onValueChange={(values) => {
                  const value = values[0] as Orientation | undefined
                  if (value) setSidebar('orientation', value)
                }}
                variant="outline"
                className="w-full"
                disabled={isProcessing}
              >
                <ToggleGroupItem
                  value="portrait"
                  className="flex-1 data-pressed:border-2 data-pressed:border-primary data-pressed:text-primary"
                >
                  Portrait
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="landscape"
                  className="flex-1 data-pressed:border-2 data-pressed:border-primary data-pressed:text-primary"
                >
                  Landscape
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="page-size">Page size</Label>
              <Select
                value={sidebar.pageSize}
                onValueChange={(value) => setSidebar('pageSize', value as PageSize)}
                disabled={isProcessing}
              >
                <SelectTrigger id="page-size" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a4">A4 (210 × 297 mm)</SelectItem>
                  <SelectItem value="letter">Letter (8.5 × 11 in)</SelectItem>
                  <SelectItem value="fit">Fit to image</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Margin</Label>
              <ToggleGroup
                value={[sidebar.margin]}
                onValueChange={(values) => {
                  const value = values[0] as MarginPreset | undefined
                  if (value) setSidebar('margin', value)
                }}
                variant="outline"
                className="w-full"
                disabled={isProcessing}
              >
                <ToggleGroupItem
                  value="none"
                  className="flex-1 data-pressed:border-2 data-pressed:border-primary data-pressed:text-primary"
                >
                  None
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="small"
                  className="flex-1 data-pressed:border-2 data-pressed:border-primary data-pressed:text-primary"
                >
                  Small
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="big"
                  className="flex-1 data-pressed:border-2 data-pressed:border-primary data-pressed:text-primary"
                >
                  Big
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </>
        )}

        {showMergeAll && (
          <div className="flex items-center gap-2">
            <Checkbox
              id="merge-all"
              checked={sidebar.mergeAll}
              onCheckedChange={(checked) =>
                setSidebar('mergeAll', checked === true)
              }
              disabled={isProcessing}
            />
            <Label htmlFor="merge-all">Include all workspace items</Label>
          </div>
        )}

        {showExportFormat && (
          <div className="space-y-2">
            <Label>Export format</Label>
            <ToggleGroup
              value={[sidebar.exportFormat === 'jpeg' ? 'jpeg' : 'png']}
              onValueChange={(values) => {
                const value = values[0] as ExportFormat | undefined
                if (value) setSidebar('exportFormat', value)
              }}
              variant="outline"
              className="w-full"
              disabled={isProcessing}
            >
              <ToggleGroupItem
                value="png"
                className="flex-1 data-pressed:border-2 data-pressed:border-primary data-pressed:text-primary"
              >
                PNG
              </ToggleGroupItem>
              <ToggleGroupItem
                value="jpeg"
                className="flex-1 data-pressed:border-2 data-pressed:border-primary data-pressed:text-primary"
              >
                JPG
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        )}

        {showQuality && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Image quality</Label>
              <span className="text-xs text-muted-foreground">
                {Math.round(sidebar.imageQuality * 100)}%
              </span>
            </div>
            <Slider
              value={[sidebar.imageQuality * 100]}
              min={10}
              max={100}
              step={5}
              onValueChange={(values) => {
                const value = Array.isArray(values) ? values[0] : values
                if (value !== undefined) setSidebar('imageQuality', value / 100)
              }}
              disabled={isProcessing}
            />
          </div>
        )}

        {showRenderScale && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Render scale</Label>
              <span className="text-xs text-muted-foreground">
                {sidebar.renderScale}x
              </span>
            </div>
            <Slider
              value={[sidebar.renderScale * 10]}
              min={10}
              max={40}
              step={5}
              onValueChange={(values) => {
                const value = Array.isArray(values) ? values[0] : values
                if (value !== undefined) setSidebar('renderScale', value / 10)
              }}
              disabled={isProcessing}
            />
          </div>
        )}

        {showMaxDimension && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Max dimension (px)</Label>
              <span className="text-xs text-muted-foreground">
                {sidebar.maxDimension ?? 'None'}
              </span>
            </div>
            <Slider
              value={[sidebar.maxDimension ?? 0]}
              min={0}
              max={4000}
              step={100}
              onValueChange={(values) => {
                const value = Array.isArray(values) ? values[0] : values
                if (value === undefined) return
                setSidebar('maxDimension', value === 0 ? null : value)
              }}
              disabled={isProcessing}
            />
          </div>
        )}

        <Separator />

        <Collapsible defaultOpen={false}>
          <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium">
            Limitations & supported formats
            <ChevronDown className="size-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-3">
            <LimitationsCallout mode={toolMode} />
          </CollapsibleContent>
        </Collapsible>
      </div>

      <div className="space-y-2 border-t p-5">
        {items.length > 0 && toolMode !== 'split' && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={clearWorkspace}
            disabled={isProcessing}
          >
            Clear all files
          </Button>
        )}

        <Button
          type="button"
          className="w-full"
          size="lg"
          onClick={() => void runPrimaryAction()}
          disabled={!canSubmit || isProcessing}
          aria-busy={isProcessing}
        >
          {isProcessing ? (
            <>
              <Loader2 className="animate-spin" />
              Processing…
            </>
          ) : (
            <>
              {primaryLabel}
              <ArrowRightCircle data-icon="inline-end" />
            </>
          )}
        </Button>
      </div>
    </aside>
  )
}

export default SidebarOptions
