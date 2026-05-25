# `useNavigation()` narrowing regression — minimal repro

In **react-router 7.15.1**, `useNavigation()`'s return type stopped being a
discriminated union. Narrowing on `navigation.state` no longer narrows
`navigation.location`, so code that compiled in 7.14.x now fails to type-check.

## Reproduce

```bash
npm install
npm run typecheck
```

Expected output:

```
src/main.tsx(21,36): error TS18048: 'navigation.location' is possibly 'undefined'.
```

The offending code (`src/main.tsx`):

```ts
const navigation = useNavigation();
const isNavigating =
  navigation.state !== "idle" && navigation.location.pathname.length > 0;
//                               ^^^^^^^^^^^^^^^^^^^ TS18048 on 7.15.1
```

## Notes

- **The app still runs** (`npm run dev`) — this is a **type-only** regression.
  Run `npm run typecheck` to see the failure.
- **It's a regression**: downgrade with `npm i react-router@7.14.2` and
  `npm run typecheck` passes cleanly.

## Root cause

`useNavigation()` returns `Omit<Navigation, "matches" | "historyAction">`.
`Navigation` is a discriminated union (`Idle | Loading | Submitting`), and `Omit`
is not distributive over unions — it collapses the union into a single object
type where `location` is always `Location | undefined`, regardless of `state`.
So `state`-based narrowing can no longer narrow `location`.
