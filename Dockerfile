FROM node:22-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install node_modules in the image
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["pnpm", "dev"]
