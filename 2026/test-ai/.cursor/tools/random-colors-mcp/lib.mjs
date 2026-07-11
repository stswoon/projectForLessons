function randomHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')
  return `#${hex}`
}

export function generateRandomColors(count = 5) {
  const safeCount = Math.min(Math.max(1, Number(count) || 5), 100)

  return Array.from({ length: safeCount }, () => randomHexColor())
}
