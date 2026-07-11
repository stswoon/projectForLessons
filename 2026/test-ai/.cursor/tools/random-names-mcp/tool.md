# Tool: random-names-msp

## Purpose

Получает случайные имена людей из публичного API.

## Use when

- Пользователь просит случайные имена.
- Нужно сгенерировать тестовые данные.
- Нужно создать список пользователей для примеров.

## Input

| Name  | Type   | Required | Description                      |
|-------|--------|----------|----------------------------------|
| count | number | no       | Количество имен. По умолчанию 5. |

## Output

```json
{
  "names": [
    "John",
    "Emma",
    "Michael"
  ]
}
```

## Execute

CLI:

```bash
node .cursor/tools/random-names/index.mjs --count=10
```

MCP server (stdio):

```bash
cd .cursor/tools/random-names && npm install && npm start
```

Cursor подхватывает сервер из `.cursor/mcp.json` (инструмент `random-names`).

## Rules

- Максимум 100 имен.
- Если API недоступен — сообщить об ошибке.
- Не придумывать имена самостоятельно, если требуется именно результат сервиса.