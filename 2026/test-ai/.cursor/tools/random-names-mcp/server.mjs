import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import { fetchRandomNames } from './lib.mjs'

const server = new McpServer({
  name: 'random-names-mcp',
  version: '1.0.0',
})

server.registerTool(
  'random-names-mcp',
  {
    title: 'Random Names MCP',
    description: 'Получает случайные имена людей из публичного API randomuser.me',
    inputSchema: {
      count: z
        .number()
        .int()
        .min(1)
        .max(100)
        .default(5)
        .describe('Количество имён. По умолчанию 5, максимум 100.'),
    },
  },
  async ({ count }) => {
    try {
      const names = await fetchRandomNames(count ?? 5)


      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify({ names }, null, 2),
          },
        ],
      }
    } catch (error) {
      return {
        content: [
          {
            type: 'text',
            text: error instanceof Error ? error.message : 'API unavailable',
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
  console.info('[random-names-mcp] MCP server running on stdio')
}

main().catch(error => {
  console.error('[random-names-mcp] Fatal error:', error)
  process.exit(1)
})
