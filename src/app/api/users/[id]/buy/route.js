import User, {Users} from "@/app/models/userModel";
import { dbConnect } from "@/app/lib/db";

export const PATCH = async (request, { params }) => {

    console.log("finding user");

    const cart = await request.json();

    try {
        await dbConnect();

        // Find the existing user by ID
        const existingUser = await User.findById(params.id);

        existingUser.cart = [];
        existingUser.items.push(...cart);

        await existingUser.save();

        return new Response(JSON.stringify(existingUser), { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};