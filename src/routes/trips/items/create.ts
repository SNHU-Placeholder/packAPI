import { createItem } from "../../../database.ts";
import { NewItem } from "../../../model.ts";
import { getUser, tripRouter } from "../../../router.ts";

tripRouter.post("/:trip/items", async (req, res) => {
    const data = NewItem.safeParse({ ...req.body, trip_id: req.params.trip });
    if (!data.success) {
        res.status(400).json(data.error.issues);
        return;
    }

    const item = await createItem(data.data, getUser(res).user_id);
    res.json(item);
});
