import type { ToolMode } from '../types'

type LimitationBlock = {
  title?: string
  lines: string[]
}

const GLOBAL_LINE =
  'All processing happens in your browser. Files are not uploaded to a server.'

const MODE_LIMITATIONS: Record<ToolMode, LimitationBlock[]> = {
  split: [
    {
      title: 'Raster export:',
      lines: [
        'Each PDF page is rendered to an image. Text is not selectable and may look softer than the original, especially at low scale.',
      ],
    },
    {
      title: 'Tip:',
      lines: ['Increase render scale for sharper output (larger file size).'],
    },
  ],
  merge: [
    {
      title: 'PDF pages (vector):',
      lines: [
        'Pages from PDF files keep vector text when merged — text stays selectable and prints sharply.',
      ],
    },
    {
      title: 'Images (raster):',
      lines: [
        'JPG and PNG files are embedded as pictures. They are not converted to editable text.',
      ],
    },
    {
      title: 'Mixed order:',
      lines: [
        'Items are combined top-to-bottom. PDF pages remain vector; images remain raster on their pages.',
      ],
    },
  ],
  'images-to-pdf': [
    {
      title: 'Images (raster):',
      lines: [
        'JPG and PNG files are embedded as pictures. They are not converted to editable text.',
      ],
    },
  ],
  compress: [
    {
      title: 'JPEG:',
      lines: ['Lower quality = smaller files and visible compression artifacts.'],
    },
    {
      title: 'PNG:',
      lines: ['Size reduction is limited; for smaller files, export as JPEG.'],
    },
    {
      title: 'Resize:',
      lines: ['Max dimension downscales the image; upscaling is not supported.'],
    },
  ],
}

type LimitationsCalloutProps = {
  mode: ToolMode
}

function LimitationsCallout({ mode }: LimitationsCalloutProps) {
  const blocks = MODE_LIMITATIONS[mode]

  return (
    <div className="limitations-callout space-y-2 text-xs text-muted-foreground">
      <p>{GLOBAL_LINE}</p>
      {blocks.map((block) => (
        <p key={block.title ?? block.lines[0]}>
          {block.title && <strong>{block.title}</strong>}{' '}
          {block.lines.join(' ')}
        </p>
      ))}
    </div>
  )
}

export default LimitationsCallout
