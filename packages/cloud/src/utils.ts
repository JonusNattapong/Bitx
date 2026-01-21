import type { ExtensionContext } from "vscode"

export function getUserAgent(context?: ExtensionContext): string {
	return `Bitx ${context?.extension?.packageJSON?.version || "unknown"}`
}
