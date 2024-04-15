import { HttpStatusCode } from 'axios';
import { dbConnect } from "@/app/lib/db";
import Item, {Items} from "@/app/models/itemModel";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {

    const { name, price, quantity, url } = await request.json();

    try {
        await dbConnect();
        const newItem = new Item({
            name,
            price,
            quantity,
            url
        });

        await newItem.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}