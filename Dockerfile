# Install dependencies only when needed
FROM node:16 AS builder
WORKDIR /usr/src/app

# Install dependencies
COPY package.json package-lock.json ./
# RUN npm ci

COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

ARG API_BASE=/api/v2
ARG GOOGLE_API_KEY
ARG FIREBASE_PUSH_CERT
ENV NEXT_PUBLIC_API_BASE=${API_BASE}
ENV NEXT_PUBLIC_GOOGLE_API_KEY=${GOOGLE_API_KEY}
ENV NEXT_PUBLIC_FIREBASE_PUSH_CERT=${FIREBASE_PUSH_CERT}

RUN npm run build
# next standalone tree-shakes the json file out of socious-data for some reason
RUN cp -r node_modules/@socious/data/src/translations .next/standalone/node_modules/@socious/data/src

# Production image, copy all the files and run next
FROM node:16 AS runner

# Add Tini
ENV TINI_VERSION v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

WORKDIR /usr/src/app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder /usr/src/app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=node:node /usr/src/app/.next/standalone ./
COPY --from=builder --chown=node:node /usr/src/app/.next/static ./.next/static

USER node

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
