export type CompressOptions = {
  format: 'jpeg' | 'png'
  quality: number
  maxDimension: number | null
}

export type CompressResult = {
  blob: Blob
  width: number
  height: number
  byteLength: number
}

export async function compressImage(
  input: Blob,
  options: CompressOptions,
): Promise<CompressResult> {
  const bitmap = await createImageBitmap(input)
  let { width, height } = bitmap

  if (options.maxDimension && Math.max(width, height) > options.maxDimension) {
    const scale = options.maxDimension / Math.max(width, height)
    width = Math.round(width * scale)
    height = Math.round(height * scale)
  }

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const context = canvas.getContext('2d')
  if (!context) {
    bitmap.close()
    throw new Error('Canvas context unavailable')
  }

  context.drawImage(bitmap, 0, 0, width, height)
  bitmap.close()

  const mimeType = options.format === 'jpeg' ? 'image/jpeg' : 'image/png'
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error('Failed to compress image'))
          return
        }
        resolve(result)
      },
      mimeType,
      options.format === 'jpeg' ? options.quality : undefined,
    )
  })

  return {
    blob,
    width,
    height,
    byteLength: blob.size,
  }
}
