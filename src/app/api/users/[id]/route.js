import User, {Users} from "@/app/models/userModel";
import { dbConnect } from "@/app/lib/db";

export const GET = async (request, { params }) => {
    try {
        
        await dbConnect();
        const user = await User.findById(params.id);

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}