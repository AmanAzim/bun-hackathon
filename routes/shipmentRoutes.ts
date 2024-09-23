import shipmentService from "../services/shipmentService";

const getShipmentId = (pathname: string) => {
  return pathname.split("/")[2];
};

const shipentRoutesHandler = async ({
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
};

export default shipentRoutesHandler;
