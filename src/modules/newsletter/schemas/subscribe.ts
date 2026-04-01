import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.string().email("Valid email required").max(320),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;
