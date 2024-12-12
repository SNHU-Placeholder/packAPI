import { getItemsByTrip } from "../../../database.ts";
import { getUser, tripRouter } from "../../../router.ts";

tripRouter.get("/:id/items", async (req, res) => {
    const items = await getItemsByTrip(req.params.id, getUser(res).user_id);

    res.json(items);
});
