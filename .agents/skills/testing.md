---
name: testing
type: knowledge
version: 1.0.0
agent: CodeActAgent
triggers:
  - test
  - vitest
  - component test
  - content collection test
---

# Testing — Astro (Vitest)

## Utility/Store Tests

```typescript
import { describe, it, expect } from "vitest";
import { cartItems, cartTotal } from "../src/stores/cartStore";

describe("cartStore", () => {
  it("should calculate total", () => {
    cartItems.set([
      { id: "1", name: "Widget", price: 10 },
      { id: "2", name: "Gadget", price: 20 },
    ]);

    expect(cartTotal.get()).toBe(30);
  });
});
```

## Island Component Tests (React)

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";
import SearchBar from "../src/components/react/SearchBar";

describe("SearchBar", () => {
  it("should filter on input", async () => {
    render(<SearchBar items={["Apple", "Banana", "Cherry"]} />);
    await userEvent.type(screen.getByRole("searchbox"), "Ban");
    expect(screen.getByText("Banana")).toBeInTheDocument();
    expect(screen.queryByText("Apple")).not.toBeInTheDocument();
  });
});
```

## Content Collection Schema Tests

```typescript
import { describe, it, expect } from "vitest";
import { z } from "zod";

const blogSchema = z.object({
  title: z.string(),
  date: z.date(),
  tags: z.array(z.string()),
  draft: z.boolean().default(false),
});

describe("blog schema", () => {
  it("should validate a valid post", () => {
    const result = blogSchema.safeParse({
      title: "Test Post",
      date: new Date(),
      tags: ["astro", "web"],
    });
    expect(result.success).toBe(true);
  });

  it("should reject missing title", () => {
    const result = blogSchema.safeParse({ date: new Date(), tags: [] });
    expect(result.success).toBe(false);
  });
});
```

## API Endpoint Tests

```typescript
import { describe, it, expect } from "vitest";

describe("GET /api/users", () => {
  it("should return users", async () => {
    const response = await fetch("http://localhost:4321/api/users");
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(Array.isArray(data)).toBe(true);
  });
});
```

## Rules

- Test island components with their framework's testing library.
- Nano stores are framework-agnostic — test directly.
- Astro pages can't be unit tested easily — use E2E (Playwright) instead.
- `npx vitest run` for all tests.
