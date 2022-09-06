import { expect, test, describe } from "vitest"
import { sum } from "../util"

describe("sum", () => {
  test("test1", () => {
    expect(sum(1, 2)).toEqual(3)
  })
})
