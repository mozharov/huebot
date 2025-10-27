FROM node:22.19-slim AS base
WORKDIR /app

FROM base AS pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.19.0
COPY . .

FROM pnpm AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM pnpm AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base
# Install wget for healthchecks
RUN apt-get update && apt-get install -y wget && rm -rf /var/lib/apt/lists/*

COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=pnpm /app/package.json /app/package.json
COPY --from=pnpm /app/drizzle /app/drizzle

CMD [ "node", "dist/main" ]
