import { getTrip } from "../../database.ts";
import { tripRouter } from "../../router.ts";

tripRouter.get("/:id", async (req, res) => {
    const trip = await getTrip(req.params.id);

    if (!trip) {
        res.status(404).json({ message: "Trip not found" });
        return;
    }

    res.json(trip);
});
