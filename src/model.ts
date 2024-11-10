import { z } from "zod";

export const User = z.object({
    user_id: z.string().uuid(),
    fname: z.string(),
    lname: z.string(),
    email: z.string().email(),
    created: z.coerce.date(),
});
export type User = z.infer<typeof User>;

export const Session = z.object({
    user_id: z.string().uuid(),
    expires: z.coerce.date(),
    created: z.coerce.date(),
    token: z.string(),
});
export type Session = z.infer<typeof Session>;
