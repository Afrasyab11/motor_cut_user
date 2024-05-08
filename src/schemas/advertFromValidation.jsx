import { z } from 'zod';

export const payloadSchema = z.object({
  Label: z.string().min(1, { message: "Advert Label is required" })
});



const fileTypeValidation = z.enum([".jpeg", ".png", ".gif", ".jpg"], "FileType");

 export const uploadImagesSchema = z.object({
  files: z.array(z.object({
    name: z.string().refine((name) => {
      // Extract file extension and convert to lowercase
      const extension = name.slice(name.lastIndexOf(".")).toLowerCase();
      // Validate against allowed file types
      return fileTypeValidation.safeParse(extension).success;
    }, {
      message: "Unsupported file type",
    })
  })).min(1, { message: "At least one file is required" }),
});

