import { z } from "zod";

export const User = z.object({
    user_id: z.string().uuid(),
    fname: z.string(),
    lname: z.string(),
    email: z.string().email(),
    created: z.date(),
});
export type User = z.infer<typeof User>;

export const Trip = z.object({
    trip_id: z.string().uuid(),
    user_id: z.string().uuid(),
    trip_name: z.string(),
    region: z.string().length(2).optional(),
    triplength: z.number(),
    purpose: z.string(),
    allinclusive: z.boolean(),
    airport: z.string(),
    flight_time: z.date()
})
export type Trip = z.infer<typeof Trip>;

export const Item = z.object({
    item_id: z.string().uuid(),
    trip_id: z.string().uuid(),
    user_id: z.string().uuid(),
    item_name: z.string(),
    quantity: z.string()
})
export type Item = z.infer<typeof Item>;