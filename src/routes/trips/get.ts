import { getTrip } from "../../database.ts";
import { getUser, tripRouter } from "../../router.ts";

tripRouter.get("/:trip", async (req, res) => {
    const trip = await getTrip(req.params.trip, getUser(res).user_id);

    if (!trip) {
        res.status(404).json({ message: "Trip not found" });
        return;
    }

    res.json(trip);
});
