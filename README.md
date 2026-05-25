## `useNavigation()` narrowing regression - minimal repro

In **react-router 7.15.1**, `useNavigation()`'s return type stopped being a discriminated union. Narrowing on `navigation.state` no longer narrows `navigation.location`, so code that compiled in 7.14.x now fails type-check.

### Reproduce

```bash
npm install
npm run typecheck
```

Expected output:

```
src/main.tsx(21,36): error TS18048: 'navigation.location' is possibly 'undefined'.
```

The failing code in `src/main.tsx`:

```ts
const navigation = useNavigation();
const isNavigating =
  navigation.state !== "idle" && navigation.location.pathname.length > 0;
//                               ^^^^^^^^^^^^^^^^^^^ TS18048 on 7.15.1
```

### Notes

- **The app still runs** (`npm run dev`) so this is a **type-only** regression.
- Downgrade to `v7.14.2` with `npm i react-router@7.14.2` and `npm run typecheck` which passes
