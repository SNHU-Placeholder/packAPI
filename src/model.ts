import { z } from "zod";

export const User = z.object({
    user_id: z.string().uuid(),
    fname: z.string(),
    lname: z.string(),
    email: z.string().email(),
    created: z.date(),
});
export type User = z.infer<typeof User>;
