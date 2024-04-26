import User, {Users} from "@/app/models/userModel";
import { dbConnect } from "@/app/lib/db";

export async function POST(request,  { params }) {

    const item = await request.json();

    try {
        await dbConnect();

        console.log(item);

        const newUser = new User({
            email: "email1",
            username: "username1",
            image: "image1",
            items: item,
            cart: []
        });

        await newUser.save();
        return new Response(JSON.stringify(newUser), { status: 201 });
    } catch (error) {
        return new Response("Failed to create new user", { status: 500 });
    }
}