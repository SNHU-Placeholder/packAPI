import { getUserTrips } from "../../database.ts";
import { getUser, tripRouter } from "../../router.ts";

tripRouter.get("/", async (req, res) => {
    const trips = await getUserTrips(getUser(res).user_id);

    res.json(trips);
});
