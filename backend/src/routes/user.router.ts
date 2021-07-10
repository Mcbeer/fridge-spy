import { Router } from "express";

export const userRouter = (): Router => {
  const userRouter = Router();

  userRouter.get("/me");
  userRouter.get("/:id");

  userRouter.post("/");
  userRouter.put("/");
  userRouter.delete("/:id");

  return userRouter;
};
