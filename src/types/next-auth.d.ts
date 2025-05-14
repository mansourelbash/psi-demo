import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      picture?: string | null;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    image?: string | null;
    picture?: string | null;
  }
}
