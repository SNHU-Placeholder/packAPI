import { getItemsByTrip } from "../../../database.ts";
import { itemRouter } from "../../../router.ts";

itemRouter.get("/:id", async (req, res) => {
    const user = await getItemsByTrip(req.params.id);

    res.json(user);
});
