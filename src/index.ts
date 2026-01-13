import 'dotenv/config';
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from './auth/auth.js'
import { transactionRoutes } from './routes/transactions.js'

const app = new Hono()

const corsOrigin = process.env.CORS_ORIGIN || "http://localhost:3000";
const port = parseInt(process.env.PORT || "8000", 10);

app.use("*", cors({
  origin: corsOrigin,
  credentials: true,
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"]
}));

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});
app.route("/api/transaction", transactionRoutes)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

serve({
  fetch: app.fetch,
  port: port
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
