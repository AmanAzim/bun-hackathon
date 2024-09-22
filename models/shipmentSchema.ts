import mongoose, { Document, Schema } from "mongoose";

export interface Shipment extends Document {
  _id: mongoose.Schema.Types.ObjectId;
  shopId: String;
  trackingCode: String;
  zipCode: String;
  weight: Number;
  carrier: String;
  tags?: Schema.Types.Mixed;
  createdAt?: Date;
}

const ShipmentSchema = new Schema<Shipment>({
  shopId: {
    type: String,
    required: true,
  },
  trackingCode: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  carrier: {
    type: String,
    required: true,
    enum: ["dhl-de", "hermes", "dpd", "gls", "amazon", "ups"],
  },
  tags: {
    type: Schema.Types.Mixed,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const schema = mongoose.model("Shipments", ShipmentSchema);
export default schema;
