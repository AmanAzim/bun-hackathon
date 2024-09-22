FROM oven/bun:latest

WORKDIR /home/bun/app

COPY ./package.json .

RUN bun install

COPY . .

EXPOSE 3000

CMD ["bun", "run" "start:dev"]