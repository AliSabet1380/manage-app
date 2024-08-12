import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { InsertPaymentSchema, payments } from "@/db/schema";
import { db } from "@/db/drizzle";
import { z } from "zod";
import { and, eq, inArray } from "drizzle-orm";

export const payment = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);

    const data = await db
      .select()
      .from(payments)
      .where(eq(payments.userId, auth.userId));

    return c.json({ data }, 200);
  })
  .get(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) return c.json({ error: "missing id" }, 400);
      if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);

      const [data] = await db
        .select()
        .from(payments)
        .where(and(eq(payments.id, id), eq(payments.userId, auth.userId)));

      if (!data) return c.json({ error: "not found" }, 404);

      return c.json({ data }, 200);
    }
  )
  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      InsertPaymentSchema.omit({
        id: true,
        userId: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");

      if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);

      const [data] = await db
        .insert(payments)
        .values({ ...values, userId: auth.userId })
        .returning();

      if (!data) return c.json({ error: "fail to create paymnet" }, 500);

      return c.json({ data }, 201);
    }
  )
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { ids } = c.req.valid("json");

      if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);

      const data = await db
        .delete(payments)
        .where(and(inArray(payments.id, ids), eq(payments.userId, auth.userId)))
        .returning();

      return c.json({ data }, 200);
    }
  )
  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "json",
      InsertPaymentSchema.omit({
        id: true,
        userId: true,
      })
    ),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) return c.json({ error: "missing id" }, 400);
      if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);

      const [data] = await db
        .update(payments)
        .set(values)
        .where(and(eq(payments.id, id), eq(payments.userId, auth.userId)))
        .returning();

      if (!data) return c.json({ error: "not found" }, 404);

      return c.json({ data }, 200);
    }
  )
  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) return c.json({ error: "missing id" }, 400);
      if (!auth?.userId) return c.json({ error: "unauthorized" }, 401);

      const [data] = await db
        .delete(payments)
        .where(and(eq(payments.id, id), eq(payments.userId, auth.userId)))
        .returning();

      if (!data) return c.json({ error: "payment not found" }, 404);

      return c.json({ data }, 200);
    }
  );
