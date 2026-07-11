import { generateRandomColors } from './lib.mjs'

const args = Object.fromEntries(
  process.argv.slice(2).map(arg => {
    const [k, v] = arg.replace(/^--/, '').split('=')
    return [k, v]
  })
)

const count = Number(args.count || 5)

try {
  const colors = generateRandomColors(count)
  console.log(JSON.stringify({ colors }, null, 2))
} catch (error) {
  console.error(error instanceof Error ? error.message : 'Generation failed')
  process.exit(1)
}
