import { getUserLocals, userRouter } from "../../router.ts";

userRouter.get("/profile", async (req, res) => {
    res.json(getUserLocals(res).user);
});
