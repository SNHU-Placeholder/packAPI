import { z } from "zod";

export const User = z.object({
    user_id: z.string().uuid(),
    fname: z.string(),
    lname: z.string(),
    email: z.string().email(),
    created: z.coerce.date(),
});
export type User = z.infer<typeof User>;

export const Trip = z.object({
    trip_id: z.string().uuid(),
    user_id: z.string().uuid(),
    name: z.string(),
    region: z.string().length(2),
    length: z.number(),
    purpose: z.string(),
    all_inclusive: z.boolean(),
    start_date: z.coerce.date(),
});
export type Trip = z.infer<typeof Trip>;

export const NewTrip = Trip.omit({ trip_id: true, user_id: true });
export type NewTrip = z.infer<typeof NewTrip>;

export const Item = z.object({
    checked: z.boolean().default(false),
    item_id: z.string().uuid(),
    trip_id: z.string().uuid(),
    user_id: z.string().uuid(),
    item_name: z.string(),
    quantity: z.number(),
});
export type Item = z.infer<typeof Item>;

export const NewItem = Item.omit({ item_id: true, user_id: true });
export type NewItem = z.infer<typeof NewItem>;

export const ItemUpdate = NewItem.omit({ trip_id: true }).partial();
export type ItemUpdate = z.infer<typeof ItemUpdate>;

export const Session = z.object({
    user_id: z.string().uuid(),
    expires: z.coerce.date(),
    created: z.coerce.date(),
    token: z.string(),
});
export type Session = z.infer<typeof Session>;
