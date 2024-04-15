import mongoose from "mongoose";

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    url: {
        type: String,
    },
});

export default mongoose.models.Item || mongoose.model("Item", itemSchema);