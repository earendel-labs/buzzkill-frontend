// next-auth.d.ts

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    address?: string;
    user?: {
      name?: string;
      [key: string]: any;
    };
  }
}
