import { dbConnect } from "@/app/lib/db";
import Item, {Items} from "@/app/models/itemModel";

export async function GET() {
    try {
        await dbConnect();
        const allItems = await Item.find({}).exec();

        return new Response(JSON.stringify(allItems), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}