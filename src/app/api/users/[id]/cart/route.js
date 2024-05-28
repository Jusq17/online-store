import User, {Users} from "@/app/models/userModel";
import { dbConnect } from "@/app/lib/db";

export const PATCH = async (request, { params }) => {

    console.log("finding user");

    const item = await request.json();

    try {
        await dbConnect();

        // Find the existing user by ID
        const existingUser = await User.findById(params.id);

        existingUser.cart.push(item);

        await existingUser.save();

        return new Response(JSON.stringify("Successfully updated the User"), { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};