import { fetchRandomNames } from './lib.mjs'

const args = Object.fromEntries(
  process.argv.slice(2).map(arg => {
    const [k, v] = arg.replace(/^--/, '').split('=')
    return [k, v]
  })
)

const count = Number(args.count || 5)

try {
  const names = await fetchRandomNames(count)
  console.log(JSON.stringify({ names }, null, 2))
} catch (error) {
  console.error(error instanceof Error ? error.message : 'API unavailable')
  process.exit(1)
}
