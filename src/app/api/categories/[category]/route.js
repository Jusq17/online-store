import { HttpStatusCode } from 'axios';
import { dbConnect } from "@/app/lib/db";
import Category, {Categories} from "@/app/models/categoryModel";
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request, { params }) => {

    try {

        await dbConnect();

        console.log(params.category);
        const category = await Category.find(params.category).exec();

        if (!category) {
            return new Response("Category not found", { status: HttpStatusCode.NOT_FOUND });
        }

        console.log("category found ", category);

        const items = category.items;

        return new Response(JSON.stringify(items), { status: HttpStatusCode.OK });
        
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}