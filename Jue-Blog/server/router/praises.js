var express = require("express");
var router = express.Router();
var PraisModel = require("../model/praises");

router.all("/", (req, res) => {
  res.send("点赞收藏 API");
});
// 创建点赞和收藏路由
router.post("/toggle", async (req, res, next) => {
  let body = req.body;
  try {
    let { target_user, target_id, created_by, target_type } = body;
    if (!target_id || !target_type || !target_user || !created_by) {
      return res.status(400).send({ message: "参数缺失" });
    }
    let action = "delete";
    let result = await PraisModel.findOneAndDelete(body);
    if (!result) {
      action = "create";
      result = await PraisModel.create(body);
    }
    res.send({
      action,
      message: action == "create" ? "创建成功" : "取消成功",
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
