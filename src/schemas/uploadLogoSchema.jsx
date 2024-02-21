import { z } from "zod";
export const uploadLogoSchema = z.object({
  position: z.enum(["top-left", "top-right", "bottom-left", "bottom-right"], {
    message: "Position is required",
  }),
});
