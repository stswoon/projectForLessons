## Add https://github.com/mempalace/mempalace

1) `powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"`
2) `uv tool install mempalace`
3) modify `%USERPROFILE%\.cursor\mcp.json`
```
"mempalace": {
    "command": "mempalace-mcp"
}
```
4) `mempalace mcp`
5) start server `mempalace-mcp`
6) `mempalace-mcp --palace %USERPROFILE%\.mempalace`

Задолбался так и не стартанул

## Add https://github.com/basicmachines-co/basic-memory

Похоже на @modelcontextprotocol/server-memory но в MD

1) `powershell -c "irm https://astral.sh/uv/install.ps1 | iex"`
2) `uv tool install basic-memory`
3) `mkdir D:\AI-memory`
4) add mcpServers
```
"basic-memory": {
    "command": "%USERPROFILE%\\.local\\bin\\uvx.exe",
    "args": [
    "basic-memory",
    "mcp"
    ]
}
```