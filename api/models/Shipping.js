import mongoose from "mongoose";
import Inc from "mongoose-sequence";
const AutoIncrement = Inc(mongoose);

const ShippingSchema = new mongoose.Schema(
  {
    _id: Number,
    aircraftReg: {
      type: String,
      default: "-",
    },
    account: {
      type: String,
    },
    sender: {
      type: String,
      required: true,
    },
    senderIdNumber: {
      type: String,
      required: true,
    },
    senderUnit: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      default: "-",
    },
    receiverIdNumber: {
      type: String,
      default: "-",
    },
    receiverUnit: {
      type: String,
      default: "-",
    },
    sentDate: {
      type: String,
      default: "-",
    },
    dateReceived: {
      type: String,
      default: "-",
    },
    description: {
      type: String,
      required: true,
    },
    photos: {
      type: String,
    },
    remark: {
      type: String,
      default: "-",
    },
    progress: {
      type: String,
      default: "OPEN",
    },
  },
  { timestamps: true },
  { _id: false }
);
ShippingSchema.plugin(AutoIncrement);

export default mongoose.model("Shipping", ShippingSchema);
