import { HttpStatusCode } from 'axios';
import { dbConnect } from "@/app/lib/db";
import Item, {Items} from "@/app/models/itemModel";
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req) {
    try {
        await connectMongo();
        const body = await req.json();
        if (body.name) {
            const product = await Item.create(body);
            return NextResponse.json(
                { product, message: 'Your product has been created' },
                { status: HttpStatusCode.Created },
            );
        }
        return NextResponse.json({ message: 'Product name is missing' }, { status: HttpStatusCode.BadRequest });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: HttpStatusCode.BadRequest });
    }
}
export async function GET() {
    try {
        await dbConnect();
        const allItems = await Item.find({}).exec();

        return new Response(JSON.stringify(allItems), { status: HttpStatusCode.OK });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}