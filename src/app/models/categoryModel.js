import mongoose from "mongoose";

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String,
    },
    items: {
        type: Array,
    }
});

export default mongoose.models.Category || mongoose.model("Category", categorySchema);