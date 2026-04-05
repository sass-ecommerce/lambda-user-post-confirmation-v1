# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

AWS Lambda for user post-confirmation logic, using Serverless Framework v4, TypeScript, and Node.js 22. Exposes a `GET /users` endpoint via API Gateway v2 (HTTP API).

## Commands

```bash
# Install dependencies
npm install

# Local development (serverless-offline)
npm run dev   # http://localhost:3000

# Type check
npm run typecheck

# Lint / format
npm run lint
npm run lint:fix
npm run format
npm run format:check

# Tests
npm test
npm run test:watch

# Deploy to AWS
serverless deploy --stage dev   # or staging / prod

# Remove deployed stack
serverless remove
```

## Architecture

- **`src/users/users.service.ts`** — pure business logic, no HTTP concerns
- **`src/users/users.controller.ts`** — Lambda handlers; wraps service calls in `APIGatewayProxyEventV2` / `APIGatewayProxyResultV2`
- **`src/users/index.ts`** — re-exports handlers; this is what `config/functions.yml` references (e.g. `src/users/index.listUsers`)
- **`config/functions.yml`** — all Lambda function declarations (handler path + HTTP event); imported by `serverless.yml`
- **`config/{stage}.yml`** — per-stage environment variables (`dev`, `staging`, `prod`); injected into `process.env` at runtime via `provider.environment`
- **`serverless.yml`** — provider config; org `gberdejo`, service `user-port-confirmation`, runtime `nodejs22.x`; esbuild bundles TypeScript on deploy with `@aws-sdk/*` excluded (provided by Lambda runtime)

## Key conventions

- All source files go under `src/`
- Tests live under `test/` and must match `**/*.test.ts`
- Prefix unused Lambda parameters with `_` (e.g. `_event`) to satisfy TypeScript strict mode
- Stage is set via `--stage` flag; defaults to `dev`
