# @bitx/cli

Command Line Interface for Bitx - Run the Bitx agent from the terminal without VSCode.

## Overview

This CLI uses the `@bitx/vscode-shim` package to provide a VSCode API compatibility layer, allowing the main Bitx extension to run in a Node.js environment.

## Installation

### Quick Install (Recommended)

Install the Bitx CLI with a single command:

```bash
curl -fsSL https://raw.githubusercontent.com/RooCodeInc/Bitx/main/apps/cli/install.sh | sh
```

**Requirements:**

- Node.js 20 or higher
- macOS (Intel or Apple Silicon) or Linux (x64 or ARM64)

**Custom installation directory:**

```bash
ROO_INSTALL_DIR=/opt/bitx ROO_BIN_DIR=/usr/local/bin curl -fsSL ... | sh
```

**Install a specific version:**

```bash
ROO_VERSION=0.1.0 curl -fsSL https://raw.githubusercontent.com/RooCodeInc/Bitx/main/apps/cli/install.sh | sh
```

### Updating

Re-run the install script to update to the latest version:

```bash
curl -fsSL https://raw.githubusercontent.com/RooCodeInc/Bitx/main/apps/cli/install.sh | sh
```

### Uninstalling

```bash
rm -rf ~/.bitx/cli ~/.local/bin/bitx
```

### Development Installation

For contributing or development:

```bash
# From the monorepo root.
pnpm install

# Build the main extension first.
pnpm --filter roo-cline-bitx bundle

# Build the cli.
pnpm --filter @bitx/cli build
```

## Usage

### Interactive Mode (Default)

By default, the CLI prompts for approval before executing actions:

```bash
export OPENROUTER_API_KEY=sk-or-v1-...

bitx ~/Documents/my-project -P "What is this project?"
```

You can also run without a prompt and enter it interactively in TUI mode:

```bash
bitx ~/Documents/my-project
```

In interactive mode:

- Tool executions prompt for yes/no approval
- Commands prompt for yes/no approval
- Followup questions show suggestions and wait for user input
- Browser and MCP actions prompt for approval

### Non-Interactive Mode (`-y`)

For automation and scripts, use `-y` to auto-approve all actions:

```bash
bitx ~/Documents/my-project -y -P "Refactor the utils.ts file"
```

In non-interactive mode:

- Tool, command, browser, and MCP actions are auto-approved
- Followup questions show a 60-second timeout, then auto-select the first suggestion
- Typing any key cancels the timeout and allows manual input

### Bitx Cloud Authentication

To use Bitx Cloud features (like the provider proxy), you need to authenticate:

```bash
# Log in to Bitx Cloud (opens browser)
bitx auth login

# Check authentication status
bitx auth status

# Log out
bitx auth logout
```

The `auth login` command:

1. Opens your browser to authenticate with Bitx Cloud
2. Receives a secure token via localhost callback
3. Stores the token in `~/.config/bitx/credentials.json`

Tokens are valid for 90 days. The CLI will prompt you to re-authenticate when your token expires.

**Authentication Flow:**

```
┌──────┐         ┌─────────┐         ┌───────────────┐
│  CLI │         │ Browser │         │ Bitx Cloud│
└──┬───┘         └────┬────┘         └───────┬───────┘
   │                  │                      │
   │ Open auth URL    │                      │
   │─────────────────>│                      │
   │                  │                      │
   │                  │ Authenticate         │
   │                  │─────────────────────>│
   │                  │                      │
   │                  │<─────────────────────│
   │                  │ Token via callback   │
   │<─────────────────│                      │
   │                  │                      │
   │ Store token      │                      │
   │                  │                      │
```

## Options

| Option                            | Description                                                                             | Default                       |
| --------------------------------- | --------------------------------------------------------------------------------------- | ----------------------------- |
| `[workspace]`                     | Workspace path to operate in (positional argument)                                      | Current directory             |
| `-P, --prompt <prompt>`           | The prompt/task to execute (optional in TUI mode)                                       | None                          |
| `-e, --extension <path>`          | Path to the extension bundle directory                                                  | Auto-detected                 |
| `-d, --debug`                     | Enable debug output (includes detailed debug information, prompts, paths, etc)          | `false`                       |
| `-x, --exit-on-complete`          | Exit the process when task completes (useful for testing)                               | `false`                       |
| `-y, --yes`                       | Non-interactive mode: auto-approve all actions                                          | `false`                       |
| `-k, --api-key <key>`             | API key for the LLM provider                                                            | From env var                  |
| `-p, --provider <provider>`       | API provider (anthropic, openai, openrouter, etc.)                                      | `openrouter`                  |
| `-m, --model <model>`             | Model to use                                                                            | `anthropic/claude-sonnet-4.5` |
| `-M, --mode <mode>`               | Mode to start in (code, architect, ask, debug, etc.)                                    | `code`                        |
| `-r, --reasoning-effort <effort>` | Reasoning effort level (unspecified, disabled, none, minimal, low, medium, high, xhigh) | `medium`                      |
| `--ephemeral`                     | Run without persisting state (uses temporary storage)                                   | `false`                       |
| `--no-tui`                        | Disable TUI, use plain text output                                                      | `false`                       |

## Auth Commands

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `bitx auth login`  | Authenticate with Bitx Cloud   |
| `bitx auth logout` | Clear stored authentication token  |
| `bitx auth status` | Show current authentication status |

## Environment Variables

The CLI will look for API keys in environment variables if not provided via `--api-key`:

| Provider      | Environment Variable |
| ------------- | -------------------- |
| anthropic     | `ANTHROPIC_API_KEY`  |
| openai        | `OPENAI_API_KEY`     |
| openrouter    | `OPENROUTER_API_KEY` |
| google/gemini | `GOOGLE_API_KEY`     |
| ...           | ...                  |

**Authentication Environment Variables:**

| Variable          | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `ROO_WEB_APP_URL` | Override the Bitx Cloud URL (default: `https://app.roocode.com`) |

## Architecture

```
┌─────────────────┐
│   CLI Entry     │
│   (index.ts)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ExtensionHost  │
│  (extension-    │
│   host.ts)      │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌───────┐  ┌──────────┐
│vscode │  │Extension │
│-shim  │  │ Bundle   │
└───────┘  └──────────┘
```

## How It Works

1. **CLI Entry Point** (`index.ts`): Parses command line arguments and initializes the ExtensionHost

2. **ExtensionHost** (`extension-host.ts`):

    - Creates a VSCode API mock using `@bitx/vscode-shim`
    - Intercepts `require('vscode')` to return the mock
    - Loads and activates the extension bundle
    - Manages bidirectional message flow

3. **Message Flow**:
    - CLI → Extension: `emit("webviewMessage", {...})`
    - Extension → CLI: `emit("extensionWebviewMessage", {...})`

## Development

```bash
# Watch mode for development
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm check-types

# Linting
pnpm lint
```

## Releasing

To create a new release, execute the /cli-release slash command:

```bash
bitx ~/Documents/Bitx -P "/cli-release" -y
```

The workflow will:

1. Bump the version
2. Update the CHANGELOG
3. Build the extension and CLI
4. Create a platform-specific tarball (for your current OS/architecture)
5. Test the install script
6. Create a GitHub release with the tarball attached
