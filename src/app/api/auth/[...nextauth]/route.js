import NextAuth from "next-auth";
import connectDB from "@/config/connectDB";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import UsersModel from "@/models/UsersModel";
import bcrypt from "bcryptjs";

const authOptions = {
   providers: [
      CredentialsProvider({
         //this is to authenticate the user
         name: "credentials",

         async authorize(credentials) {
            const { email, password } = credentials;

            // if (!email && !password) return true;

            try {
               await connectDB();
               const details = await UsersModel.findOne({ email }).select(
                  "+password"
               );
               const isMatch = await bcrypt.compare(password, details.password);
               if (isMatch) {
                  return details;
               } else {
                  return null;
               }
            } catch (err) {
               console.log(err);
               return null;
            }
         },
      }),

      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_SECRET,

         authorization: {
            params: {
               prompt: "consent",
               access_type: "offline",
               response_type: "code",
            },
         },
      }),
   ],
   jwt: {
      maxAge: 30 * 24 * 60 * 60, // 30 days
   },
   callbacks: {
      async signIn(params) {
         if (params?.account.provider === "google") {
            const { email, name, picture: image } = params.profile;
            try {
               connectDB();
               let user = await UsersModel.find({ email });
               if (user.length == 0) {
                  user = await UsersModel.create({
                     email,
                     name,
                     image,
                  });
               }

               return true;
            } catch (error) {
               console.log(error);
               return error.message;
            }
         } else if (params?.account.provider === "credentials") {
            return true;
         }
      },

      async jwt({ token, user, trigger, session }) {
         //since user , account, profile and isNewUser are only passed the first time the callback is run

         if (trigger === "update") {
            return { ...token, picture: session.user.image };
         }

         if (user) {
            let res;
            //user._id and user.userType exists only when the user logs in with credentials
            //other wise we have to look for it in the database
            if (!user?._id) {
               res = await UsersModel.findOne({ email: user.email });
            }
            // user has more data when used credentials provider and less when used google provider
            // here we are doing user._id, user.userType because
            // google provider does not reutrn data from the database
            // unlike credentials provider which returns data from the database
            token.userId = user._id || res._id;
            token.role = user.userType || res.userType;
            token.status = user.status || res.status;
         }
         return token;
      },

      async session({ session, token }) {
         session.userId = token.userId;
         session.role = token.role;
         session.status = token.status;
         return session;
      },
   },
   pages: {
      signIn: "/auth/signIn",
      // error: "/error",
   },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };
