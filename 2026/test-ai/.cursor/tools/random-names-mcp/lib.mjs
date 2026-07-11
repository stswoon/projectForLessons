export async function fetchRandomNames(count = 5) {
  const safeCount = Math.min(Math.max(1, Number(count) || 5), 100)

  const response = await fetch(
    `https://randomuser.me/api/?results=${safeCount}`
  )

  if (!response.ok) {
    throw new Error('API unavailable')
  }

  const data = await response.json()

  return data.results.map(
    person => `${person.name.first} ${person.name.last}`
  )
}
