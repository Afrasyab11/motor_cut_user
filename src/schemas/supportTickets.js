import { z } from "zod";

export const supportTicketSchema = z.object({
  title: z.string({ message: "Please enter a topic" }),
  message: z.string({ message: "Please enter a message" }),
  file: z.any().optional(),
});
