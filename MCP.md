# MCP servers

## GoHighLevel / LeadConnector (`ghl`)

Configured in [`.mcp.json`](./.mcp.json). It connects to the LeadConnector remote
MCP endpoint (`https://services.leadconnectorhq.com/mcp/`) through the
[`mcp-remote`](https://www.npmjs.com/package/mcp-remote) bridge, authenticating
with a GoHighLevel **Private Integration Token**.

### Setup

1. Create a Private Integration Token in GHL: **Settings → Private Integrations**.
2. Copy `.env.example` to `.env` and paste the token:
   ```bash
   cp .env.example .env
   # edit .env and set GHL_MCP_TOKEN=pit-...
   ```
3. Make sure the token is exported into your environment before launching Claude
   Code (Claude Code expands `${GHL_MCP_TOKEN}` in `.mcp.json`):
   ```bash
   set -a && source .env && set +a
   ```
4. Start Claude Code from this directory and approve the `ghl` server when prompted.

### Security

- The token lives **only** in `.env`, which is git-ignored. Never hardcode it in
  `.mcp.json` or commit it.
- Rotate the token immediately if it is ever exposed (shared in chat, logs, a
  screenshot, etc.).
