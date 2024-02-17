import { z } from "zod";
export const uploadLogoSchema = z.object({
    position: z.enum(['top', 'bottom', 'left', 'right'], { message: "Position is required" }),
  });
  