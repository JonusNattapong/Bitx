import {
	loadRooLastModelSelection,
	ROO_LAST_MODEL_SELECTION_KEY,
	saveRooLastModelSelection,
} from "../bitx-last-model-selection"

class LocalStorageMock implements Storage {
	private store = new Map<string, string>()

	get length(): number {
		return this.store.size
	}

	clear(): void {
		this.store.clear()
	}

	getItem(key: string): string | null {
		return this.store.get(key) ?? null
	}

	key(index: number): string | null {
		return Array.from(this.store.keys())[index] ?? null
	}

	removeItem(key: string): void {
		this.store.delete(key)
	}

	setItem(key: string, value: string): void {
		this.store.set(key, value)
	}
}

beforeEach(() => {
	Object.defineProperty(globalThis, "localStorage", {
		value: new LocalStorageMock(),
		configurable: true,
	})
})

describe("bitx-last-model-selection", () => {
	it("saves and loads (deduped + trimmed)", () => {
		saveRooLastModelSelection([" bitx/model-a ", "bitx/model-a", "bitx/model-b"])
		expect(loadRooLastModelSelection()).toEqual(["bitx/model-a", "bitx/model-b"])
	})

	it("ignores invalid JSON", () => {
		localStorage.setItem(ROO_LAST_MODEL_SELECTION_KEY, "{this is not json")
		expect(loadRooLastModelSelection()).toEqual([])
	})

	it("clears when empty", () => {
		localStorage.setItem(ROO_LAST_MODEL_SELECTION_KEY, JSON.stringify(["bitx/model-a"]))
		saveRooLastModelSelection([])
		expect(localStorage.getItem(ROO_LAST_MODEL_SELECTION_KEY)).toBeNull()
	})

	it("does not throw if localStorage access fails", () => {
		Object.defineProperty(globalThis, "localStorage", {
			value: {
				getItem: () => {
					throw new Error("blocked")
				},
				setItem: () => {
					throw new Error("blocked")
				},
				removeItem: () => {
					throw new Error("blocked")
				},
			},
			configurable: true,
		})

		expect(() => loadRooLastModelSelection()).not.toThrow()
		expect(() => saveRooLastModelSelection(["bitx/model-a"])).not.toThrow()
	})
})
