import User, {Users} from "@/app/models/userModel";
import { dbConnect } from "@/app/lib/db";

export const PATCH = async (request, { params }) => {

    console.log("finding user");

    const cart = await request.json();
    const cartTotal = cart.reduce((acc, item) => acc + item.price, 0);

    try {
        await dbConnect();

        // Find the existing user by ID
        const existingUser = await User.findById(params.id);

        existingUser.cart = [];
        existingUser.items.push(...cart);

        if (existingUser.balance < cartTotal) {
            return new Response(JSON.stringify("Insufficient funds"), { status: 400 });
        }
        else {
            existingUser.balance -= cartTotal;
        }

        await existingUser.save();

        return new Response(JSON.stringify(existingUser), { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};