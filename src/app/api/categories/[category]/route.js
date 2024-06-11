// This is the API route for fetching all items in a category

import { dbConnect } from "@/app/lib/db";
import Category, {Categories} from "@/app/models/categoryModel";

export const GET = async (request, { params }) => {

    try {

        await dbConnect();

        console.log(params.category);
        const category = await Category.findOne({ name: params.category });

        console.log("category found ", category.name);

        const items = category.items;

        return new Response(JSON.stringify(items), { status: 200 });
        
    } catch (error) {
        return new Response("Failed to fetch items from category", { status: 500 });
    }
}