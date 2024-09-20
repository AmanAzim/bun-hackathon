const server = Bun.serve({
  port: Bun.env.PORT || 3000,
  fetch(request) {
    const url = new URL(request.url);

    if (url.pathname === "/") return new Response("Home");
    if (url.pathname === "/blog") return new Response("Blog");

    return new Response("404!");
  },
});

console.log(`Listening on localhost:${server.port}`);
