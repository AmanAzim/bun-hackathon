import { ObjectId } from "mongodb";
import ShipmentSchema, { Shipment } from "../models/shipmentSchema";

export type GetShipmentsParams = {
  filters: { shopId?: string; career?: string; zipCode?: string };
  limit?: number;
  pageNumber?: number;
};

const ShipmentController = {
  async getShipments(params: GetShipmentsParams) {
    const {
      filters: { shopId, career, zipCode },
      limit = 50,
      pageNumber = 1,
    } = params;
    const offset = (pageNumber - 1) * limit;

    const query: { shopId?: string; career?: string; zipCode?: string } = {};
    if (shopId) query.shopId = shopId;
    if (career) query.career = career;
    if (zipCode) query.zipCode = zipCode;

    const result = await ShipmentSchema.find(query)
      .sort({ _id: -1 })
      .skip(offset)
      .limit(limit);
    return result;
  },
  async getShipmentById(id: string) {
    const objectId = new ObjectId(id);
    return await ShipmentSchema.findOne({ _id: objectId });
  },
  async getShipmentsCount() {
    return await ShipmentSchema.countDocuments();
  },
  async addShipment(shipment: Shipment) {
    return await ShipmentSchema.create(shipment);
  },
  async updateShipment(id: string, shipment: Shipment) {
    const objectId = new ObjectId(id);
    return await ShipmentSchema.updateOne(
      { _id: objectId },
      { $set: shipment }
    );
  },
  async deleteShipment(id: string) {
    const objectId = new ObjectId(id);
    return await ShipmentSchema.deleteOne({ _id: objectId });
  },
};

export default ShipmentController;
