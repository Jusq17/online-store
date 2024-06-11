// This is the API route for fetching all categories

import { dbConnect } from "@/app/lib/db";
import Category, {Categories} from "@/app/models/categoryModel";

export const GET = async (request, { params }) => {

    try {

        await dbConnect();

        const categories = await Category.find({});
        const allItems = categories.map((category) => category.items);
        const allItemsFlat = allItems.flat();

        return new Response(JSON.stringify(allItemsFlat), { status: 200 });
        
    } catch (error) {
        return new Response("Failed to fetch items from category", { status: 500 });
    }
}