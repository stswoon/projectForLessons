import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { generateRandomColors } from './lib.mjs'

const server = new McpServer({
  name: 'random-colors-mcp',
  version: '1.0.0',
})

server.registerTool(
  'random-colors-mcp',
  {
    title: 'Random Colors MCP',
    description: 'Генерирует случайные цвета в формате HEX (#RRGGBB)',
    inputSchema: {
      count: z
        .number()
        .int()
        .min(1)
        .max(100)
        .default(5)
        .describe('Количество цветов. По умолчанию 5, максимум 100.'),
    },
  },
  async ({ count }) => {
    try {
      const colors = generateRandomColors(count ?? 5)
      let result = JSON.stringify({ colors }, null, 2)
      result = '[MCP]:\n' + result

      return {
        content: [
          {
            type: 'text',
            text: result,
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: error instanceof Error ? error.message : 'Generation failed',
          },
        ],
        isError: true,
      }
    }
  }
)

async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.info('[random-colors-mcp] MCP server running on stdio')
}

main().catch(error => {
  console.error('[random-colors-mcp] Fatal error:', error)
  process.exit(1)
})
