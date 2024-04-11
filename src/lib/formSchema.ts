import { z } from "zod";

export const schema = z.object({
  file:
    typeof window === "undefined"
      ? z.any()
      : z.instanceof(FileList).refine((files) => files?.length == 1, "File is required."),
});
