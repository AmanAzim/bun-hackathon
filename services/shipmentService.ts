import ShipmentController, {
  GetShipmentsParams,
} from "../controllers/shipmeptController";
import { Shipment } from "../models/shipmentSchema";

const shipmentService = {
  async handelGetShipmentById(id: string) {
    return await ShipmentController.getShipmentById(id);
  },
  async handleGetAllShipments(params: GetShipmentsParams) {
    return await ShipmentController.getShipments(params);
  },
  async handleGetShipmentsCount() {
    return await ShipmentController.getShipmentsCount();
  },
  async handleCreateShipment(shipmentPayload: Shipment) {
    return await ShipmentController.addShipment(shipmentPayload);
  },
  async handleUpdateShipment(id: string, shipmentPayload: Shipment) {
    return await ShipmentController.updateShipment(id, shipmentPayload);
  },
  async handleDeleteShipment(id: string) {
    return await ShipmentController.deleteShipment(id);
  },
};

export default shipmentService;
