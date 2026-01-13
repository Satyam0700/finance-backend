import { createMiddleware } from "hono/factory";
import { auth } from "../src/auth/auth.js";
import  db  from "../src/db/index.js";
import { sql } from "drizzle-orm";

export const withTenant = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) return c.json({ error: "Unauthorized" }, 401);

  await db.execute(sql`SELECT set_config('auth.user_id', ${session.user.id}, true)`);

  c.set("user", session.user);
  await next();
});