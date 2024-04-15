import { HttpStatusCode } from 'axios';
import { dbConnect } from "@/app/lib/db";
import Item, {Items} from "@/app/models/itemModel";

export const GET = async (request, { params }) => {
    try {
        await dbConnect()
        const item = await Item.findOne({ name: params.name }).exec();

        return new Response(JSON.stringify(item), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 });
    }
} 