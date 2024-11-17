// next-auth.d.ts
import NextAuth from "next-auth";

// Extend the default Session and User types
declare module "next-auth" {
  interface User {
    address?: string;
    isNewUser?: boolean;
  }

  interface Session {
    address?: string;
    inviteCode?: string;
    isNewUser?: boolean;
    user: {
      name?: string;
      address?: string; // Attach address to the user session
    };
  }

  interface JWT {
    address?: string; // Include address in JWT
    iat?: number; // Issued At (iat) timestamp
    exp?: number; // Expiration (exp) timestamp
  }
}
