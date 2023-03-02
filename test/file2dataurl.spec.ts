import { test, expect } from "vitest"
import { file2dataurl } from "../src/main"

test("file can be converted to dataUrl successfully", () => {
    const file = new File(['hello world'], 'hello.txt', { type: "text/plain "})
    expect(file2dataurl(file)).resolves.toBeTypeOf("string")
})