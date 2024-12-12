import { createTrip } from "../../database.ts";
import { NewTrip } from "../../model.ts";
import { getUser, tripRouter } from "../../router.ts";

tripRouter.post("/", async (req, res) => {
    const data = NewTrip.safeParse(req.body);
    if (!data.success) {
        res.status(400).json(data.error.issues);
        return;
    }

    const trip = await createTrip(data.data, getUser(res).user_id);
    res.json(trip);
});
