import mongoose from "mongoose";

import shipmentRoutesHandler from "./routes/shipmentRoutes";

const mongoDbUrl =
  Bun.env.MONGO_DB_URL || "mongodb://hackathon_db_24:27017/data";

const launchServer = () => {
  const server = Bun.serve({
    port: Bun.env.PORT || 3000,
    async fetch(req) {
      const { pathname, searchParams } = new URL(req.url);
      const method = req.method;

      if (pathname.includes("shipment")) {
        const response = await shipmentRoutesHandler({
          req,
          method,
          pathname,
          searchParams,
        });
        if (response) {
          return response;
        }
      }

      return new Response("Not Found", { status: 404 });
    },
  });

  console.log(`Listening on localhost:${server.port}`);
};

mongoose.connect(mongoDbUrl).then(async () => {
  console.log("mongodb started");
  launchServer();
});
