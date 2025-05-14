import NextAuth from "next-auth";
import Facebook from "next-auth/providers/facebook";
import Apple from "next-auth/providers/apple";
import Google from "next-auth/providers/google";

if (
  !process.env.AUTH_FACEBOOK_ID ||
  !process.env.AUTH_FACEBOOK_SECRET ||
  !process.env.AUTH_APPLE_ID ||
  !process.env.AUTH_APPLE_SECRET ||
  !process.env.AUTH_GOOGLE_ID ||
  !process.env.AUTH_GOOGLE_SECRET
) {
  console.error("Missing environment variables for authentication. Please check your .env file.");
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
      authorization: {
        params: {
          scope: 'public_profile',
        },
      },
    }),
    Apple({
      clientId: process.env.AUTH_APPLE_ID,
      clientSecret: process.env.AUTH_APPLE_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async signIn(userDetail) {
      try {
        if (Object.keys(userDetail).length === 0) {
          console.error("SignIn failed, user details are empty.");
          return false;
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async redirect({ baseUrl }) {
      try {
        return `${baseUrl}`;
      } catch (error) {
        console.error("Error in redirect callback:", error);
        return baseUrl;
      }
    },
    async session({ session, token }) {
      try {
        if (session.user?.name) {
          session.user.name = token.name;
        }
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        return session;
      }
    },
    async jwt({ token, user, account }) {
      try {
        if (account) {
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.provider = account.provider;
        }
    
        if (user) {
          const customUser = user as { first_name?: string; last_name?: string };
          if (customUser.first_name && customUser.last_name) {
            token.name = `${customUser.first_name} ${customUser.last_name}`;
          }
        }
    
        return token;
      } catch (error) {
        console.error("Error in JWT callback:", error);
        return token;
      }
    },
  },
});
