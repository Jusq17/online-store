import User, {Users} from "@/app/models/userModel";
import { dbConnect } from "@/app/lib/db";

export const PATCH = async (request, { params }) => {

    console.log("finding user");

    const item = await request.json();

    try {
        await dbConnect();

        console.log(item);
        console.log(params.id)

        // Find the existing prompt by ID
        const existingUser = await User.findById(params.id);

        // Remove one item from the cart
        for (let i = 0; i < existingUser.cart.length; i++) {
            if (existingUser.cart[i].name === item.name) {
                existingUser.cart.splice(i, 1);
                break;
            }
        }

        console.log(item);
        console.log(existingUser);

        await existingUser.save();

        return new Response("Successfully updated the User", { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};