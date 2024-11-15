import { getTrip } from "../../database.ts";
import { tripRouter } from "../../router.ts";

tripRouter.get("/:id", async (req, res) => {
    const trip = await getTrip(req.params.id);

    res.json(trip);
});
