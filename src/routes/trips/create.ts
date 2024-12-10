import { createTrip } from "../../database.ts";
import { NewTrip, User } from "../../model.ts";
import { tripRouter } from "../../router.ts";

tripRouter.post("/", async (req, res) => {
    const data = NewTrip.safeParse(req.body);
    if (!data.success) {
        res.status(400).json(data.error.issues);
        return;
    }

    const user = res.locals.user as User;

    const trip = await createTrip(data.data, user.user_id);
    res.json(trip);
});
