import { updateItem } from "../../../database.ts";
import { ItemUpdate } from "../../../model.ts";
import { getUser, tripRouter } from "../../../router.ts";

tripRouter.patch("/:trip/items/:item", async (req, res) => {
    const data = ItemUpdate.safeParse(req.body);
    if (!data.success) {
        res.status(400).json(data.error.issues);
        return;
    }

    const item = await updateItem(req.params.item, req.params.trip, getUser(res).user_id, data.data);
    res.json(item);
});
