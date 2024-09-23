import mongoose from "mongoose";

import shipmentService from "./services/shipmentService";

const mongoDbUrl =
  Bun.env.MONGO_DB_URL || "mongodb://hackathon_db_24:27017/data";

const getShipmentId = (pathname: string) => {
  return pathname.split("/")[2];
};

const launchServer = () => {
  const server = Bun.serve({
    port: Bun.env.PORT || 3000,
    async fetch(req) {
      const { pathname, searchParams } = new URL(req.url);
      const method = req.method;

      if (method === "GET" && pathname === "/shipment") {
        const urlParams = new URLSearchParams(searchParams);
        const params = Object.fromEntries(urlParams.entries());
        const { shopId, career, zipCode, limit, pageNumber } = params as {
          shopId?: string;
          career?: string;
          zipCode?: string;
          limit?: string;
          pageNumber?: string;
        };
        const payload = {
          filters: { shopId, career, zipCode },
          limit: limit ? +limit : undefined,
          pageNumber: pageNumber ? +pageNumber : undefined,
        };
        return shipmentService.handleGetAllShipments(payload);
      }

      if (method === "GET" && pathname === "/shipment/count") {
        return shipmentService.handleGetShipmentsCount();
      }

      if (method === "GET") {
        const id = getShipmentId(pathname);
        if (id) {
          return shipmentService.handelGetShipmentById(id);
        }
      }

      if (method === "POST" && pathname === "/shipment") {
        const body = await req.json();

        if (body) {
          return shipmentService.handleCreateShipment(body);
        }
      }

      if (method === "PATCH") {
        const body = await req.json();
        const id = getShipmentId(pathname);

        if (id) {
          return shipmentService.handleUpdateShipment(id, body);
        }
      }

      if (method === "DELETE" && pathname === "/shipment") {
        const id = getShipmentId(pathname);
        if (id) {
          return shipmentService.handleDeletePost(id);
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
