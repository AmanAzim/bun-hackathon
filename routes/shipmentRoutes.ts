import { ObjectId } from "mongodb";
import shipmentService from "../services/shipmentService";

const getShipmentId = (pathname: string) => {
  return pathname.split("/")[2];
};

const getValidShipmentById = async (id: string) => {
  if (!ObjectId.isValid(id)) {
    return new Response("Shipment id not valid", { status: 400 });
  }
  const shipment = await shipmentService.handelGetShipmentById(id);
  if (!shipment) {
    return new Response("Shipment Not Found", { status: 404 });
  }
  return shipment;
};

const shipmentRoutesHandler = async ({
  method,
  pathname,
  searchParams,
  req,
}: {
  method: string;
  pathname: string;
  searchParams: URLSearchParams;
  req: Request;
}) => {
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
    const shipments = await shipmentService.handleGetAllShipments(payload);

    return new Response(JSON.stringify(shipments), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (method === "GET" && pathname === "/shipment/count") {
    const shipmentsCount = await shipmentService.handleGetShipmentsCount();
    return new Response(JSON.stringify(shipmentsCount), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (method === "POST") {
    const body = await req.json();

    if (body) {
      const newShipment = await shipmentService.handleCreateShipment(body);

      return new Response(JSON.stringify(newShipment), {
        headers: { "Content-Type": "application/json" },
        status: 201,
      });
    }
  }

  const id = getShipmentId(pathname);
  const shipment = await getValidShipmentById(id);

  if (method === "GET") {
    return new Response(JSON.stringify(shipment), {
      headers: { "Content-Type": "application/json" },
    });
  }

  if (method === "PATCH") {
    const body = await req.json();

    const updatedShipment = await shipmentService.handleUpdateShipment(
      id,
      body
    );

    if (!updatedShipment) {
      return new Response("Failed to update shipment", { status: 404 });
    }

    return new Response(JSON.stringify(updatedShipment), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  }

  if (method === "DELETE") {
    const deletedShipment = await shipmentService.handleDeleteShipment(id);

    if (!deletedShipment) {
      return new Response("Failed to delete shipment", { status: 404 });
    }

    return new Response("Shipment Deleted", { status: 200 });
  }

  return new Response("Not Found", { status: 404 });
};

export default shipmentRoutesHandler;
