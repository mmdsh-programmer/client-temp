FROM nrp.devpod.ir:8138/repository/applicationplatform-docker-hosted/node:20.10.0 as builder
COPY .env package.json package-lock.json .npmrc /app/
WORKDIR /app

# Copy the startup script into the image
RUN npm install --only=production --force --frozen-lockfile --verbose --no-audit --ignore-scripts
COPY . /app/
RUN set -ex && npm run build

FROM nrp.devpod.ir:8138/repository/applicationplatform-docker-hosted/node:20.10.0 as production
WORKDIR /app

COPY --from=builder /app/package.json .
COPY --from=builder /app/cacheHandler.mjs .
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.mjs .
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Set the script as the default command to run on container start
CMD ["node", "server.js"]
RUN rm -rf .npmrc
