import User, {Users} from "@/app/models/userModel";
import { dbConnect } from "@/app/lib/db";

export const PATCH = async (request, { params }) => {
    const item = await request.json();

    try {
        await dbConnect();

        // Find the existing prompt by ID
        const existingUser = await User.findById(params.id);

        if (!existingUser) {
            return new Response("User not found", { status: 404 });
        }

        // Update the prompt with new data
        existingUser.item = item;

        console.log(item);
        console.log(existingUser);

        await existingUser.save();

        return new Response("Successfully updated the User", { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};

export const GET = async (request, { params }) => {
    try {
        await dbConnect();
        const user = await User.findById(params.id);

        console.log(params.id);
        console.log("user", user.items);

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}