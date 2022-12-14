const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const newsRouter = require("./newsRouter");
const commentsRouter = require("./commentsRouter");

router.use("/news", newsRouter);
router.use("/user", userRouter);
router.use("/comments", commentsRouter);

module.exports = router;
