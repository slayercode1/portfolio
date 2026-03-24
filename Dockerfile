FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci

FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npx prisma generate

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME="0.0.0.0"

LABEL org.opencontainers.image.source="https://github.com/slayercode1/portfolio" \
      org.opencontainers.image.description="Portfolio Next.js application" \
      org.opencontainers.image.licenses="MIT"

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/prisma ./prisma
# Only this script is needed at runtime (not the whole scripts/ folder)
COPY scripts/create-admin.js ./scripts/create-admin.js

RUN chown -R nextjs:nodejs /app

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -qO- http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"]

# Extends runner with Prisma CLI for the init container in docker-compose
FROM runner AS runner-with-migrations

USER root

RUN --mount=type=cache,target=/root/.npm \
    npm install -g prisma@7

# Needed by prisma db push (schema has no inline url)
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --chmod=755 scripts/docker-entrypoint.sh /app/scripts/docker-entrypoint.sh

RUN chown -R nextjs:nodejs /app

USER nextjs

CMD ["/app/scripts/docker-entrypoint.sh"]
