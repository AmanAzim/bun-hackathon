import { ObjectId } from "mongodb";
import ShipmentController, {
  GetShipmentsParams,
} from "../controllers/shipmeptController";
import { Shipment } from "../models/shipmentSchema";

const shipmentService = {
  async handelGetShipmentById(id: string) {
    if (!ObjectId.isValid(id))
      return new Response("Shipment id not valid", { status: 400 });

    const shipment = await ShipmentController.getShipmentById(id);

    if (!shipment) {
      return new Response("Shipment Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(shipment), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async handleGetAllShipments(params: GetShipmentsParams) {
    const shipments = await ShipmentController.getShipments(params);

    return new Response(JSON.stringify(shipments), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async handleGetShipmentsCount() {
    const shipmentsCount = await ShipmentController.getShipmentsCount();

    return new Response(JSON.stringify(shipmentsCount), {
      headers: { "Content-Type": "application/json" },
    });
  },
  async handleCreateShipment(shipmentPayload: Shipment) {
    const newShipment = await ShipmentController.addShipment(shipmentPayload);

    return new Response(JSON.stringify(newShipment), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  },
  async handleUpdateShipment(id: string, shipmentPayload: Shipment) {
    if (!ObjectId.isValid(id))
      return new Response("Shipment id not valid", { status: 400 });

    const updatedShipment = await ShipmentController.updateShipment(
      id,
      shipmentPayload
    );

    if (!updatedShipment) {
      return new Response("Shipment Not Found", { status: 404 });
    }

    return new Response(JSON.stringify(updatedShipment), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  },
  async handleDeletePost(id: string) {
    if (!ObjectId.isValid(id))
      return new Response("Shipment id not valid", { status: 400 });

    const deletedShipment = await ShipmentController.deleteShipment(id);

    if (!deletedShipment) {
      return new Response("Shipment Not Found", { status: 404 });
    }

    return new Response("Shipment Deleted", { status: 200 });
  },
};

export default shipmentService;
