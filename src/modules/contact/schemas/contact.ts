import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Valid email required").max(320),
  message: z.string().min(10, "Message should be at least a few sentences").max(8000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
