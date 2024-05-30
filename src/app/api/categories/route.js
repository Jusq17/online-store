// This is the API route for fetching all categories

import { dbConnect } from "@/app/lib/db";
import Category, {Categories} from "@/app/models/categoryModel";
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request, { params }) => {

    try {

        await dbConnect();

        const categories = await Category.find({});
        const categoryNames = categories.map((category) => category.name);

        return new Response(JSON.stringify(categoryNames), { status: 200 });
        
    } catch (error) {
        return new Response("Failed to fetch items from category", { status: 500 });
    }
}