FROM node:22-alpine

RUN apk add --no-cache libc6-compat

ENV CI=true
WORKDIR /app

# Enable pnpm properly
RUN corepack enable

# Copy dependency files first (better cache)
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
