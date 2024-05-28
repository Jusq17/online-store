
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User, {Users} from "@/app/models/userModel";
import { dbConnect } from "@/app/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });

      console.log("Session user: ", sessionUser);

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await dbConnect();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });
        
        console.log("User exists: ", userExists);

        // if not, create a new document and save user in MongoDB
        if (!userExists) {

          const newUser = new User({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
            items: []
          });

          console.log("New user: ", newUser);

          await newUser.save();
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }
