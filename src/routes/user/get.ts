import { getUser, userRouter } from "../../router.ts";

userRouter.get("/profile", async (req, res) => {
    res.json(getUser(res));
});
