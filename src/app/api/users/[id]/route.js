import User, {Users} from "@/app/models/userModel";
import { dbConnect } from "@/app/lib/db";

export const PATCH = async (request, { params }) => {

    console.log("finding user");

    const item = await request.json();

    buying = params.bought;

    try {
        await dbConnect();

        console.log(item);

        // Find the existing prompt by ID
        const existingUser = await User.findOne({ email: "juseljus@gmail.com" });

        if (buying) {
            existingUser.items.push(item);
        } else {
            existingUser.cart.push(item);
        }

        console.log(item);
        console.log(existingUser);

        await existingUser.save();

        return new Response("Successfully updated the User", { status: 200 });
    } catch (error) {
        return new Response("Error Updating User", { status: 500 });
    }
};

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