// middleware/auth-middleware.ts
import { createMiddleware } from "hono/factory";
import { auth } from "../src/auth/auth.js"; 

export const protectedRoute = createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);

  await next();
});