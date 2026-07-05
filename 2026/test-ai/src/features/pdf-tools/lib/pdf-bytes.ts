/** Copy bytes so pdfjs worker transfers do not detach the original buffer. */
export function cloneArrayBuffer(bytes: ArrayBuffer): ArrayBuffer {
  return bytes.slice(0)
}

/** Safe payload for pdfjs getDocument — always uses a copy. */
export function toPdfJsData(bytes: ArrayBuffer): Uint8Array {
  return new Uint8Array(bytes.slice(0))
}
