# Builder image
FROM node:lts-alpine as builder

ENV NEXT_TELEMETRY_DISABLED 1

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Resulting image
FROM node:lts-alpine as runner

ENV NEXT_TELEMETRY_DISABLED 1

WORKDIR /app

RUN apk add --no-cache dumb-init

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ENV HOST 0.0.0.0
ENV PORT 3000
ENV NODE_ENV production

EXPOSE 3000

CMD ["dumb-init", "node", "server.js"]