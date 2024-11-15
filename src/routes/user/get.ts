import { getUser } from "../../database.ts";
import { userRouter } from "../../router.ts";

userRouter.get("/:id", async (req, res) => {
    const user = await getUser(req.params.id);

    res.json(user);
});
