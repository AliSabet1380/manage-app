import { v4 } from "uuid";
import { createInsertSchema } from "drizzle-zod";
import { pgTable, text, uuid } from "drizzle-orm/pg-core";

export const payments = pgTable("payments", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => v4())
    .notNull(),

  name: text("name").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),

  userId: text("user_id").notNull(),
});

export const InsertPaymentSchema = createInsertSchema(payments);
export type SelectPayment = typeof payments.$inferSelect;
