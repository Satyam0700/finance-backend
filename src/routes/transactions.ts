import { Hono } from "hono";
import type { User } from "better-auth/types";
import db from "../db/index.js";
import { transactions } from "../db/schema.js";
import { withTenant } from "../../middleware/tenant-context.js";
import { protectedRoute } from "../../middleware/auth-middleware.js";

type Variables = {
  user: User;
};

export const transactionRoutes = new Hono<{ Variables: Variables }>();

transactionRoutes.use("*", protectedRoute);

transactionRoutes.get("/", withTenant, async (c) => {
    const data = await db.select().from(transactions)

    return c.json(data);
});

transactionRoutes.post("/extract", withTenant, async (c) => {
  const user = c.get("user");
  const { amount, category, description } = await c.req.json();

  const newTransaction = await db.insert(transactions).values({
    userId: user.id,
    amount,
    category,
    description
  }).returning();

  return c.json(newTransaction);
});