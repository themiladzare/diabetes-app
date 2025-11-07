# ---------- deps ----------
FROM node:20-bookworm-slim AS deps
WORKDIR /app

# (Optional) allow overriding registry at build time
ARG NPM_REGISTRY=https://registry.npmjs.org/

ENV NODE_ENV=development

# Harden npm networking for flaky networks (npm, not yarn)
RUN npm config set registry ${NPM_REGISTRY} \
 && npm config set fetch-retries 5 \
 && npm config set fetch-retry-factor 2 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm config set fetch-timeout 600000 \
 && npm config set fund false \
 && npm config set audit false

COPY package.json package-lock.json ./

RUN npm ci --no-audit --no-fund --loglevel=info

# ---------- builder ----------
FROM node:20-bookworm-slim AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ---------- runner ----------
FROM node:20-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

# non-root runtime user
RUN useradd -m -r -s /usr/sbin/nologin nextjs

# ---- Option A: generic copy (no standalone) ----
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/next.config.js ./next.config.js  # uncomment if needed

# Ensure the nextjs user owns the cache directory
RUN mkdir -p .next/cache/images && chown -R nextjs:nextjs .next

# ---- Option B: standalone (smaller image) ----
# If you set `output: 'standalone'` in next.config.js,
# comment Option A and use this instead:
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static
# RUN mkdir -p .next/cache/images && chown -R nextjs:nextjs .next

USER nextjs
EXPOSE 3000

# Healthcheck: basic 200 on /
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:'+(process.env.PORT||3000)).then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"

CMD ["npm", "run", "start"]
