import { createItem } from "../../../database.ts";
import { NewItem, User } from "../../../model.ts";
import { itemRouter } from "../../../router.ts";

itemRouter.post("/", async (req, res) => {
    const data = NewItem.safeParse(req.body);
    if (!data.success) {
        res.status(400).json(data.error.message);
        return;
    }

    const user = res.locals.user as User;

    const item = await createItem(data.data, user.user_id);
    res.json(item);
});
