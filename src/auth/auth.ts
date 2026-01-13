import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db  from "../db/index.js";
import * as schema from "../db/schema.js";

const baseURL = process.env.BACKEND_URL || "http://localhost:8000";
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
const secret = process.env.BETTER_AUTH_SECRET || "your-secret-key";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: [frontendUrl], 
  baseURL: baseURL,
  secret: secret,
});

// import { betterAuth } from "better-auth";
// import { drizzleAdapter } from "better-auth/adapters/drizzle";

// import { db } from "../db/index.js";
// import * as schema from "../db/schema.js";

// export const auth = betterAuth({
//   emailAndPassword: {
//     enabled: true,
//   },
//   // ADD THIS SECTION:
//   trustedOrigins: ["http://localhost:3000"], 
  
//   // Also ensure your BETTER_AUTH_URL is correct here
//   // Usually it points to the backend itself
//   baseURL: "http://localhost:8000",

//   database: drizzleAdapter(db, {
//     provider: "pg",
//     schema: {
//       ...schema,
//     },
//   }),
// });
 
// export const auth = createAuth({
//   advanced: {
//     crossSubDomainCookies: {
//       enabled: true
//     }
//   }
// })