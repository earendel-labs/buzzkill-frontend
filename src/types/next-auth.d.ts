// next-auth.d.ts
import NextAuth from "next-auth";

// Extend the default Session and User types
declare module "next-auth" {
  interface User {
    address?: string;
  }

  interface Session {
    address?: string;
    user: {
      name?: string;
      address?: string; // Attach address to the user session
    };
  }

  interface JWT {
    address?: string; // Include address in JWT
  }
}