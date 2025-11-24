# Tanstack Start oRPC Starter

Tanstack Start monorepo with:

- Tailwind CSS v4
- shadcn UI components
- Better Auth for authentication
- Drizzle for database with Turso SQLite
- oRPC for server-side functions

## Commands

### Install

```
pnpm i
```

### Run

```
pnpm -F tanstack dev
```

or just

```
pnpm dev
```

### Apps and Packages

- `apps/tanstack`: [Tanstack Start](https://tanstack.com/start/latest) app.
- `packages/ui`: shadcn based React component library isolated from the app.
- `packages/api`: oRPC package, isolated so its easier to organize and work with.
- `packages/utils`: shared utility functions.
- `packages/eslint-config`: shared ESLint config.
- `packages/typescript-config`: shared TypeScript config.
